import Web3 from "web3";
import { lockLoadHandler } from "@/utils/PlusElement";
import detectEthereumProvider from "@metamask/detect-provider";

async function getEth() {
  const provider = await detectEthereumProvider();
  if (provider !== window.ethereum) {
    throw new Error("error 10404:MetaMask not installed");
  } else {
    if (
      process.env.NODE_ENV == "production" &&
      provider.chainId != "0x80"
    ) {
      throw new Error("error 10501:MetaMask currently in an informal network");
    } else {
      return provider;
    }
  }
}
export async function useWeb3(callback) {
  //正在获取授权
  const loadHandler = lockLoadHandler("Getting Authorization...");
  try {
    const web3Provider = await getEth();
    // const userAddress = await web3Provider.enable(); //hte enable function will be removed
    const userAddress = await web3Provider.request({ method: 'eth_requestAccounts' });
    // console.log(userAddress[0])
    const web3 = new Web3(web3Provider);
    loadHandler.close();
    callback && callback(web3, userAddress[0]);
    web3Provider &&
      web3Provider.on("accountsChanged", function (accounts) {
        console.log("用户切换了钱包", accounts[0]); //一旦切换账号这里就会执行
        callback && callback(web3, accounts[0]);
      });
    return web3;
  } catch (error) {
    console.error(error);
    loadHandler.close();
    return;
  }
}
export function getContract(web3, abi, abiAddress) {
  return new web3.eth.Contract(abi, abiAddress);
}
