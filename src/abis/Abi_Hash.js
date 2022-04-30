export default [
    {
        "inputs": [
            {
                "internalType": "uint256[3]",
                "name": "fee",
                "type": "uint256[3]"
            },
            {
                "internalType": "address[]",
                "name": "_roots_address",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "_rootRate",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256",
                "name": "platform_rate",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "contract IERC20",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_type",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_pay_type",
                "type": "uint256"
            }
        ],
        "name": "NBHashJoined",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "PaymentReceived",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_type_index",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_pay_type",
                "type": "uint256"
            }
        ],
        "name": "NBHashJoin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            },
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "Shareholder_withdrawal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "new_admin",
                "type": "address"
            }
        ],
        "name": "add_admin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "re_address",
                "type": "address"
            }
        ],
        "name": "add_re",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "re_address",
                "type": "address"
            }
        ],
        "name": "add_re_admin",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "re_address",
                "type": "address"
            }
        ],
        "name": "add_user",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "re_address",
                "type": "address[]"
            }
        ],
        "name": "add_users",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "getRes",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "getRes1",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "getRes2",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "getResChildS1",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "getResChildS2",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "getResChildS3",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "getUser",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bool",
                        "name": "f",
                        "type": "bool"
                    },
                    {
                        "internalType": "address",
                        "name": "re",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "re1",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "re2",
                        "type": "address"
                    }
                ],
                "internalType": "struct ReferralRelationshipLibrary.Re",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getUsers",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getUsersCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_Hash_handler_address",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            },
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "get_Shareholder_record_info",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint8",
                        "name": "_type",
                        "type": "uint8"
                    }
                ],
                "internalType": "struct NBHash._Shareholder_record_info[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_VerificationMethod_address",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_agency_address",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_agency_allAddress",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_agency_fee",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_game_id",
                "type": "uint256"
            },
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "get_conditional_game",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "_amount_min",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_amount_max",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct NBHash.game_info",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            }
        ],
        "name": "get_erc20ReWords",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            }
        ],
        "name": "get_erc20Released",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_is_agency_mode",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_join_time",
        "outputs": [
            {
                "internalType": "uint8[2]",
                "name": "",
                "type": "uint8[2]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "nb",
                "type": "uint256"
            }
        ],
        "name": "get_lock_block_record",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "get_payees",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "get_platform_balance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_platform_rate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_re_fee",
        "outputs": [
            {
                "internalType": "uint256[3]",
                "name": "",
                "type": "uint256[3]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "nb",
                "type": "uint256"
            }
        ],
        "name": "get_record_block_number",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            },
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "get_save_balances",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            },
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "get_save_balances_rewards",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            },
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "get_save_balances_rewards_reciver",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "get_save_eth_amount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            },
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "get_save_referral_balances",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "res",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "res1",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "res2",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct NBHash.referral_balance",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            },
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "get_save_referral_rewards",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "res",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "res1",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "res2",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct NBHash.referral_balance",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "get_save_total_supply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            }
        ],
        "name": "get_shares",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "get_totalSharesPerToken",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "get_totalSharesPerUser",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "get_totalbalancePerToken",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            },
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "get_user_balance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            },
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "get_user_bonus",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_user_rate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_type",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            }
        ],
        "name": "get_user_record_info",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "_blockHash",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_winner_amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint8",
                        "name": "_type",
                        "type": "uint8"
                    }
                ],
                "internalType": "struct NBHash.record_info[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            },
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "get_user_voucher",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_withdrawable_address",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "isPayees",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "isRe",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "is_agency",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_hash",
                "type": "string"
            }
        ],
        "name": "is_record_hash",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            },
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "join_shareholder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "platform_withdrawal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "a",
                "type": "address"
            },
            {
                "internalType": "contract IERC20",
                "name": "b",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "c",
                "type": "address"
            }
        ],
        "name": "q",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            },
            {
                "internalType": "address[]",
                "name": "_user_address",
                "type": "address[]"
            }
        ],
        "name": "q_all_array",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "release",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "setFirstReferralAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "set_Hash_handler_address",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "set_VerificationMethod_address",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "agency_address",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "f",
                "type": "bool"
            }
        ],
        "name": "set_agency",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "agency_address",
                "type": "address"
            }
        ],
        "name": "set_agency_address",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "agency_fee",
                "type": "uint256"
            }
        ],
        "name": "set_agency_fee",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_game_id",
                "type": "uint256"
            },
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount_mix",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount_max",
                "type": "uint256"
            }
        ],
        "name": "set_conditional_game",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bool",
                "name": "_is_agency_mode",
                "type": "bool"
            }
        ],
        "name": "set_is_agency_mode",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "_b_time",
                "type": "uint8"
            },
            {
                "internalType": "uint8",
                "name": "_e_time",
                "type": "uint8"
            }
        ],
        "name": "set_join_time",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "nb",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "f",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "_block_number",
                "type": "uint256"
            }
        ],
        "name": "set_lock_block_record",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "nb",
                "type": "uint256"
            }
        ],
        "name": "set_record_block_number",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_rate",
                "type": "uint256"
            }
        ],
        "name": "set_user_rate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "set_withdrawable_address",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "settlement_everday_reword",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            },
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "shareholder_interest",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            },
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_type_index",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_blockHash",
                "type": "string"
            }
        ],
        "name": "submit_hash",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "new_admin",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            }
        ],
        "name": "update_admin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_re_address",
                "type": "address"
            }
        ],
        "name": "update_re",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            },
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            },
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdraw_s",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user_address",
                "type": "address"
            },
            {
                "internalType": "contract IERC20",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "withdraw_user",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]