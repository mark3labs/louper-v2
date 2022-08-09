import { N as NETWORKS } from "./config-6d74a4d4.js";
const getExplorerAddressUrl = (address, network = "mainnet") => {
  return `${NETWORKS[network].explorerUrl}/address/${address}`;
};
const getExplorerTxUrl = (hash, network) => {
  return `${NETWORKS[network].explorerUrl}/tx/${hash}`;
};
const getVerifyContractUrl = (address, network = "mainnet") => {
  return `${NETWORKS[network].explorerUrl}/verifyContract?a=${address}`;
};
const getEtherscanApiKey = (network) => {
  const key = process.env[`${network.toUpperCase()}_ETHERSCAN_API_KEY`];
  console.log(key);
  return key ? key : process.env.ETHERSCAN_API_KEY;
};
export {
  getExplorerTxUrl as a,
  getVerifyContractUrl as b,
  getExplorerAddressUrl as c,
  getEtherscanApiKey as g
};
