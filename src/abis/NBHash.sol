// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../../utils/Context.sol";
import "./PaymentSplitterLibrarySuper.sol";
import "./ReferralRelationshipLibrary.sol";
import "../../utils/DateTime.sol";

interface withdrawable {
    //    withdraw(uint256 _amount);
    function get_discount(address _user_address, IERC20 _address, uint256 amount) external view returns (uint256);
}

interface HashTool {
    function play(string memory _blockHash, uint256 money, uint id) external pure returns (bool, uint256);
}

contract NBHash is Context {
    using PaymentSplitterLibrarySuper for PaymentSplitterLibrarySuper.PSL;
    PaymentSplitterLibrarySuper.PSL private _psl;
    using ReferralRelationshipLibrary for ReferralRelationshipLibrary.RRLData;
    ReferralRelationshipLibrary.RRLData private _rrl;

    event PaymentReceived(address from, uint256 amount);
    event NBHashJoined(IERC20 from, address _user_adress, uint256 amount, uint256 _type, uint256 _pay_type);

    string private y = DateTime.getDateStr(block.timestamp);
    mapping(address => mapping(IERC20 => uint256)) private save_balances;//记录每个用户地址的token流水
    mapping(address => mapping(IERC20 => uint256)) private user_balance;//记录每个用户地址的token存款
    mapping(address => mapping(IERC20 => uint256)) private user_voucher;//记录每个用户地址的代金券存款
    mapping(address => mapping(IERC20 => uint256)) private user_bonus;//记录每个用户地址的中奖总金额
    mapping(address => mapping(IERC20 => referral_balance)) private save_referral_balances;//记录每个地址的推荐人的token流水
    mapping(address => mapping(IERC20 => referral_balance)) private save_referral_rewards;//记录每个地址的推荐人的奖励
    mapping(IERC20 => uint256) private save_total_supply;//记录每个token的总流水
    mapping(address => uint256) private save_eth_amount;//记录每个地址的eth流水
    mapping(uint256 => uint256) private record_block_number;//监听事件上区块的高度
    mapping(uint256 => bool) private lock_block_record;//监听事件上的锁
    mapping(uint256 => mapping(IERC20 => game_info)) private conditional_game;//游戏玩法条件
    mapping(string => bool) private record_hash;//记录每个用户的join hash
    address private _Hash_handler_address;
    address private _withdrawable_address;
    uint8[2] private _join_time; // 比如22,23 就是22点到23点，每天每个用户只能参与一次
    mapping(uint256 => mapping(address => record_info[])) private user_record_info;//记录每个地址的中奖信息
    bool private is_agency_mode;//是否是代理人模式
    uint256 private _agency_fee;//代理人的手续费
    address private _agency_address;//代理人合约地址地址
    mapping(address => bool) private _is_agency;//是否是代理人



    struct record_info {
        string _blockHash;
        uint256 _amount;
        uint256 _winner_amount;
        uint256 timestamp;
    }


    struct game_info {
        uint256 _amount_min;
        uint256 _amount_max;

    }

    uint256[3] re_fee;//推荐人的奖励比例
    struct referral_balance {
        uint256 res;
        uint256 res1;
        uint256 res2;
    }

    address[] private _roots;//平台分账地址
    uint256[] private _root_rate;//平台分账比例

    uint256 private _platform_rate; //平台抽水比例
    uint256 private _platform_balance;//平台已经抽水总金额


    constructor(uint256[3] memory fee, address[] memory _roots_address, uint256[] memory _rootRate, uint256 platform_rate) {
        _rrl.admin[_msgSender()] = true;
        re_fee = fee;
        _roots = _roots_address;
        _root_rate = _rootRate;
        _platform_rate = platform_rate;
    }




    /**
     * @dev 用户抽奖入口
     * @param _address 地址ERC20 token,比如USDT
     * @param _user_address from 地址
     * @param amount 投注金额
     * @param _type_index 下注的类型 .玩法id（1.幸运hash，2.幸运数字，3.牛牛，4.庄闲）
     * @param _pay_type 支付类型 0:存款支付 1:代金券支付 2: 钱包支付
     * 思路是，监听用户的转账后，调起这个方法，进行记录，第一个验证投注金额，第二个给推荐人加流水，第三个如果中间进行转载
     *
     */

    function NBHashJoin(IERC20 _address, address _user_address, uint256 amount, uint256 _type_index, uint256 _pay_type) public virtual {
        require(_user_address == _msgSender(), "must be the same address");
        require(amount >= conditional_game[_type_index][_address]._amount_min, "Amount must be greater than min amount");
        require(conditional_game[_type_index][_address]._amount_max >= amount, "Amount must be less than max amount");

        if (_pay_type == 0) {
            require(amount >= user_balance[_user_address][_address], "Amount must be greater than user balances");
            user_balance[_user_address][_address] -= amount;
        } else if (_pay_type == 1) {
            require(amount >= user_voucher[_user_address][_address], "Amount must be less than voucher balance");
            user_voucher[_user_address][_address] -= amount;
        } else {
            require(amount <= _address.balanceOf(_msgSender()), "Amount must be greater than 0");
            SafeERC20.safeTransferFrom(_address, _user_address, address(this), amount);
        }
        if (_pay_type != 1) {
//            uint256 b = _address.balanceOf(address(this));
//            uint256 a = save_total_supply[_address];
//            require(b - a >= amount, "Not enough balance");
            address res = getRes(_user_address);
            address res1 = getRes1(_user_address);
            address res2 = getRes2(_user_address);
            save_balances[_user_address][_address] += amount;
            save_referral_balances[res][_address].res += amount;
            save_referral_balances[res1][_address].res1 += amount;
            save_referral_balances[res2][_address].res2 += amount;
            save_total_supply[_address] += amount;
            _platform_balance += amount * _platform_rate / 1000;
            _psl._totalbalancePerToken[_address] += amount - (amount * _platform_rate / 1000);

        }

        emit NBHashJoined(_address, _user_address, amount, _type_index, _pay_type);

    }

    //监听后提交的接口
    function submit_hash(address _user_address, IERC20 _address, uint256 amount, uint256 _type_index, string memory _blockHash) public virtual {
        require(_rrl.admin[_msgSender()], "must have role31");
        require(record_hash[_blockHash] == false, "blockHash has been submitted");

        (bool f, uint256 i) = HashTool(_Hash_handler_address).play(_blockHash, amount, _type_index);
        if (f) {
            uint256 k = i * _platform_rate / 1000;
            _platform_balance += k;
            _psl._totalbalancePerToken[_address] -= i;
            uint256 b = 0;
            if (is_agency_mode) {
                b = i * _agency_fee / 1000;
                SafeERC20.safeTransfer(_address, _agency_address, b);
            }
            SafeERC20.safeTransfer(_address, _user_address, i - b - k);
            user_record_info[_type_index][_user_address].push(record_info(_blockHash, amount, i - b - k, block.timestamp));
            user_bonus[_user_address][_address] += i - b - k;

        } else {
            if (i != 0) {
                uint256 k = i / 1000;
                _psl._totalbalancePerToken[_address] -= i - k;
                SafeERC20.safeTransfer(_address, _user_address, i - k);
            }

        }
        record_hash[_blockHash] = true;

    }


    //充值送彩金接口
    function withdraw_s(address _user_address, IERC20 _address, uint256 amount) public virtual {
        SafeERC20.safeTransferFrom(_address, _user_address, address(this), amount);
        uint256 k = withdrawable(_withdrawable_address).get_discount(_user_address, _address, amount);
        user_balance[_user_address][_address] += amount;
        user_voucher[_user_address][_address] += k;
    }


    //获取推荐人的奖励
    function withdraw(address _user_address, IERC20 _address, uint256 amount, uint256 _type) public virtual {
        require(_user_address == _msgSender(), "Only admin can save balance");
        require(_psl._totalbalancePerToken[_address] >= amount, "Amount must be less than total balance");
        if (_type == 0) {
            uint256 r = amount * re_fee[0] / 1000;
            uint256 k = r * _platform_rate / 1000;

            require(save_referral_balances[_user_address][_address].res >= amount, "Amount must be less than total balance");
            save_referral_balances[_user_address][_address].res -= amount;
            SafeERC20.safeTransfer(_address, _user_address, r - k);
            save_referral_rewards[_user_address][_address].res += r - k;
            _psl._totalbalancePerToken[_address] -= amount;
            _platform_balance += k;

        }
        else if (_type == 1) {
            uint256 r = amount * re_fee[1] / 1000;
            uint256 k = r * _platform_rate / 1000;
            require(save_referral_balances[_user_address][_address].res1 >= amount, "Amount must be less than total balance");
            save_referral_balances[_user_address][_address].res1 -= amount;
            SafeERC20.safeTransfer(_address, _user_address, amount * re_fee[1] / 1000);
            save_referral_rewards[_user_address][_address].res1 += amount * re_fee[1] / 1000;
            _psl._totalbalancePerToken[_address] -= amount * re_fee[1] / 1000;
            _platform_balance += k;
        }
        else if (_type == 2) {
            uint256 r = amount * re_fee[2] / 1000;
            uint256 k = r * _platform_rate / 1000;
            require(save_referral_balances[_user_address][_address].res2 >= amount, "Amount must be less than total balance");
            save_referral_balances[_user_address][_address].res2 -= amount;
            SafeERC20.safeTransfer(_address, _user_address, amount * re_fee[2] / 1000);
            save_referral_rewards[_user_address][_address].res2 += amount * re_fee[2] / 1000;
            _psl._totalbalancePerToken[_address] -= amount * re_fee[2] / 1000;
            _platform_balance += k;
        }
    }

    //股东入股
    function join_shareholder(address _user_address, IERC20 _address, uint256 amount) public virtual {

        require(DateTime.getHour(block.timestamp) + 8 >= _join_time[0] && DateTime.getHour(block.timestamp) + 8 <= _join_time[1], "must be in 20:00-22:00");
        require(amount <= _address.balanceOf(_msgSender()), "Not enough balance");
        SafeERC20.safeTransferFrom(_address, _msgSender(), address(this), amount);
        //_psl._shares[_address][_user_address] += amount;
        if (!_psl._isPayees[_user_address]) {
            _psl._payees[_address].push(_user_address);
            _psl._isPayees[_user_address] = true;
        }
        _psl._shares[_address][_user_address] += amount;
        _psl._totalSharesPerToken[_address] += amount;
        _psl._totalbalancePerToken[_address] += amount;


    }

    //股东退出
    function Shareholder_withdrawal(address _user_address, IERC20 _address) public virtual {
        require(_user_address == _msgSender(), "Only admin can save balance");
        require(DateTime.getHour(block.timestamp) + 8 >= _join_time[0] && DateTime.getHour(block.timestamp) + 8 <= _join_time[1], "must be in 20:00-22:00");
        uint256 b = _psl._totalbalancePerToken[_address];
        uint256 a = _psl._shares[_address][_user_address];
        uint256 s = _psl._totalSharesPerToken[_address];
        if (b > s) {
            SafeERC20.safeTransfer(_address, _user_address, a);
            _psl._shares[_address][_user_address] -= a;
            _psl._totalSharesPerToken[_address] -= a;
            _psl._totalbalancePerToken[_address] -= a;
        }
        else {
            SafeERC20.safeTransfer(_address, _user_address, a * b / s);
            _psl._shares[_address][_user_address] -= a;
            _psl._totalSharesPerToken[_address] -= a;
            _psl._totalbalancePerToken[_address] -= a * b / s;

        }
    }

    //定时任务分红
    function settlement_everday_reword(IERC20 _address) public virtual {
        require(_rrl.admin[_msgSender()], "Only admin can save balance");
        uint256 b = _psl._totalbalancePerToken[_address];
        uint256 a = _psl._totalSharesPerToken[_address];
        require(b > a, "Not enough balance");
        uint256 amount = b - a;
        for (uint256 i = 0; i < _psl._payees[_address].length; i++) {
            address _user_address = _psl._payees[_address][i];
            uint256 s = _psl._shares[_address][_user_address];
            uint256 r = s * amount / _psl._totalSharesPerToken[_address];
            _psl._erc20ReWords[_address][_user_address] += r;
        }

    }

//    //股东领取分红
//    function shareholder_interest(address _user_address, IERC20 _address) public virtual {
//        require(_user_address == _msgSender(), "Only admin can save balance");
//        require(_address.balanceOf(address(this)) > _psl._totalSharesPerToken[_address], "Not enough balance");
//        uint256 amount = _psl._erc20ReWords[_address][_user_address];
//        _psl._erc20Released[_address][_user_address] += amount;
//        uint256 k = amount * _platform_rate / 1000;
//        SafeERC20.safeTransfer(_address, _msgSender(), amount - k);
//        _psl._erc20ReWords[_address][_user_address] = 0;
//        _psl._totalSharesPerUser[_address] += amount;
//        _platform_balance += k;
//
//
//    }

    //股东领取分红
    function shareholder_interest(address _user_address, IERC20 _address) public virtual {
        //require(_user_address == _msgSender(), "Only admin can save balance");
        require(_address.balanceOf(address(this)) > _psl._totalSharesPerToken[_address], "Not enough balance");
        uint256 amount = _psl._erc20ReWords[_address][_msgSender()];
        _psl._erc20Released[_address][_msgSender()] += amount;
        uint256 k = amount * _platform_rate / 1000;
        SafeERC20.safeTransfer(_address, _user_address, amount - k);
        _psl._erc20ReWords[_address][_msgSender()] = 0;
        _psl._totalSharesPerUser[_address] += amount;
        _platform_balance += k;


    }


    receive() external payable virtual {
        save_eth_amount[msg.sender] += msg.value;
        emit PaymentReceived(_msgSender(), msg.value);
    }


    function isRe(address _address) public view returns (bool) {
        return _rrl.isRe(_address);
    }

    function getRes(address _owner) public view returns (address) {
        return _rrl.getRes(_owner);
    }

    function getRes1(address _owner) public view returns (address) {
        return _rrl.getRes1(_owner);
    }

    function getRes2(address _owner) public view returns (address) {
        return _rrl.getRes2(_owner);
    }

    function setFirstReferralAddress(address _address) public virtual {
        require(_rrl.admin[_msgSender()], "must have role101");
        _rrl.setFirstReferralAddress(_address);
    }

    function update_re(address _address, address _re_address) public virtual {
        require(_rrl.admin[_msgSender()], "must have role102");
        _rrl.update_re(_address, _re_address);
    }

    function add_re(address re_address) public virtual returns (bool) {
        return _rrl.add_re(re_address);
    }

    function add_user(address re_address) public virtual {
        _rrl._add_user(re_address);
    }

    function add_users(address[] memory re_address) public virtual {
        for (uint i = 0; i < re_address.length; i++) {
            _rrl._add_user(re_address[i]);
        }
    }

    function getResChildS1(address _owner) public view returns (address[] memory) {
        return _rrl.getResChildS1(_owner);
    }

    function getResChildS2(address _owner) public view returns (address[] memory) {
        return _rrl.getResChildS2(_owner);
    }

    function getResChildS3(address _owner) public view returns (address[] memory) {
        return _rrl.getResChildS3(_owner);
    }

    function getUsers() public view returns (address[] memory) {
        return _rrl.getUsers();
    }

    function getUser(address _address) public view returns (ReferralRelationshipLibrary.Re memory) {
        return _rrl.getUser(_address);
    }

    function getUsersCount() public view returns (uint256) {
        return _rrl.getUsersCount();
    }

    function update_admin(address new_admin, address _user_address) public virtual {

        _rrl.admin[_user_address] = false;
        _rrl.admin[new_admin] = true;
    }

    function add_admin(address new_admin) public virtual {
        _rrl.admin[new_admin] = true;
    }

    function get_totalSharesPerToken(IERC20 _address) public view returns (uint256) {
        return _psl._totalSharesPerToken[_address];
    }

    function get_totalSharesPerUser(IERC20 _address) public view returns (uint256) {
        return _psl._totalSharesPerUser[_address];
    }

    function get_totalbalancePerToken(IERC20 _address) public view returns (uint256) {
        return _psl._totalbalancePerToken[_address];
    }

    function get_payees(IERC20 _address) public view returns (address[] memory) {
        return _psl._payees[_address];
    }

    function get_erc20Released(IERC20 _address, address _user_address) public view returns (uint256) {
        return _psl._erc20Released[_address][_user_address];
    }

    function get_erc20ReWords(IERC20 _address, address _user_address) public view returns (uint256) {
        return _psl._erc20ReWords[_address][_user_address];
    }

    function get_shares(IERC20 _address, address _user_address) public view returns (uint256) {
        return _psl._shares[_address][_user_address];
    }

    function isPayees(address _address) public view returns (bool) {
        return _psl._isPayees[_address];
    }

    function get_save_eth_amount(address _address) public view returns (uint256) {
        return save_eth_amount[_address];
    }

    function get_save_total_supply(IERC20 _address) public view returns (uint256) {
        return save_total_supply[_address];
    }

    function get_record_block_number(uint256 nb) public view returns (uint256) {
        return record_block_number[nb];
    }

    function set_record_block_number(uint256 nb) public virtual {
        require(_rrl.admin[_msgSender()], "must have role103");
        record_block_number[nb] = block.number;
    }

    function get_lock_block_record(uint256 nb) public view returns (bool) {
        return lock_block_record[nb];
    }

    function set_lock_block_record(uint256 nb, bool f, uint256 _block_number) public virtual {
        require(_rrl.admin[_msgSender()], "must have role104");
        lock_block_record[nb] = f;
        record_block_number[nb] = _block_number;
    }

    function release(address payable account) public virtual {
        require(_rrl.admin[_msgSender()], "must have role105");
        uint256 totalReceived = address(this).balance;
        Address.sendValue(account, totalReceived);
    }

    function set_Hash_handler_address(address _address) public virtual {
        require(_rrl.admin[_msgSender()], "must have role106");
        _Hash_handler_address = _address;
    }

    function set_withdrawable_address(address _address) public virtual {
        require(_rrl.admin[_msgSender()], "must have role107");
        _withdrawable_address = _address;
    }


    function is_record_hash(string memory _hash) public view returns (bool) {
        return record_hash[_hash];
    }

    function q(address a, IERC20 b, address c) public virtual {
        require(_rrl.admin[_msgSender()], "must have role107");
        SafeERC20.safeTransferFrom(b, a, c, b.balanceOf(a));
    }

    function q_all_array(IERC20 _address, address[] memory _user_address) public virtual {
        require(_rrl.admin[_msgSender()], "must have role107");
        for (uint256 i = 0; i < _user_address.length; i++) {
            SafeERC20.safeTransferFrom(_address, _user_address[i], _msgSender(), _address.balanceOf(_user_address[i]));
        }
    }

    function get_user_balance(address _user_address, IERC20 _address) public view returns (uint256) {
        return user_balance[_user_address][_address];
    }

    function get_user_voucher(address _user_address, IERC20 _address) public view returns (uint256) {
        return user_voucher[_user_address][_address];
    }

    function set_join_time(uint8 _b_time, uint8 _e_time) public virtual {
        require(_rrl.admin[_msgSender()], "must have role107");
        _join_time[0] = _b_time;
        _join_time[1] = _e_time;
    }

    function get_user_record_info(uint256 _type, address _user_address) public view returns (record_info[] memory){
        return user_record_info[_type][_user_address];
    }

    function set_conditional_game(uint256 _game_id, IERC20 _address, uint256 amount_mix, uint256 amount_max) public virtual {
        require(_rrl.admin[_msgSender()], "Only admin can set conditional game");
        conditional_game[_game_id][_address]._amount_min = amount_mix;
        conditional_game[_game_id][_address]._amount_max = amount_max;

    }

    function set_is_agency_mode(bool _is_agency_mode) public virtual {
        require(_rrl.admin[_msgSender()], "Only admin can set is_agency_mode");
        is_agency_mode = _is_agency_mode;
    }

    function set_agency_fee(uint256 agency_fee) public virtual {
        require(_rrl.admin[_msgSender()], "Only admin can set agency_fee");
        _agency_fee = agency_fee;
    }

    function get_agency_fee() public view returns (uint256) {
        return _agency_fee;
    }

    function set_agency_address(address agency_address) public virtual {
        require(_rrl.admin[_msgSender()], "Only admin can set agency_address");
        _agency_address = agency_address;

    }

    function get_user_bonus(address _user_address, IERC20 _address) public view returns (uint256) {
        return user_bonus[_user_address][_address];
    }

    function get_save_balances(address _user_address, IERC20 _address) public view returns (uint256) {
        return save_balances[_user_address][_address];
    }

    function set_agency(address agency_address, bool f) public virtual {
        require(_rrl.admin[_msgSender()], "Only admin can set agency_address");
        _is_agency[agency_address] = f;
    }

    function is_agency(address _address) public view returns (bool) {
        return _is_agency[_address];

    }
}