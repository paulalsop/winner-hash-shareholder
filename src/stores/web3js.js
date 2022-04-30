import { defineStore } from "pinia";
import {
  AbiAddressHash,
  AbiAddressUSDT,
  AbiHash,
  AbiUSDT,
} from '@/abis/index'
import {
  useWeb3,
  getContract
} from "@/hooks/useWeb3";

export const UseStoreWeb3js = defineStore("Web3js", {
  state: () => ({
    _web3: null,
    _address: "",
    _Contracts: null,
    _init: false,
  }),
  getters: {
    web3: ({ _web3 }) => _web3,
    userAddress: ({ _address }) => _address,
    Contracts: ({ _Contracts }) => _Contracts,
    todoInit: ({_init}) => _init
  },
  actions: {
    async startWeb3(callback) {
      const web3InCode = await useWeb3(async (web3Eth, userAddress) => {
        console.log("用户切换了钱包后的操作");
        this.setUserAddress(userAddress);
        this.setWeb3(web3Eth);
        const contracts = await startContracts(web3Eth);
        // console.log("contracts---",contracts);
        this.setContracts(contracts);
        this._init = true
        callback && callback(web3InCode);
      });
      return !!web3InCode;
    },
    setWeb3(web3) {
      this._web3 = web3;
    },
    setUserAddress(address) {
      this._address = address;
    },
    setContracts(Contracts) {
      this._Contracts = Contracts;
    },
  },
});

export async function startContracts(web3) {
  const HashContract = await getContract(web3, AbiHash, AbiAddressHash);
  const USDTContract = await getContract(web3, AbiUSDT, AbiAddressUSDT);
  return {
    HashContract,
    USDTContract
  };
  // return {}
}
