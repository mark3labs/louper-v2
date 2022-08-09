import { ethers } from "ethers";
import { N as NETWORKS } from "../../../_app/immutable/chunks/config-6d74a4d4.js";
import dotenv from "dotenv";
dotenv.config();
const abi = ["function facets() external view returns (tuple(address,bytes4[])[])"];
const INFURA_API_KEY = process.env["INFURA_API_KEY"];
const POST = async ({
  request
}) => {
  const body = await request.json();
  console.info(`Fetching data for \u{1F48E} diamond at ${body.address} on ${body.network || "mainnet"}`);
  const address = body.address.toLowerCase();
  let rpcUrl = body.network ? NETWORKS[body.network].rpcUrl : NETWORKS["mainnet"].rpcUrl;
  rpcUrl = rpcUrl.replace("%INFURA_API_KEY%", INFURA_API_KEY);
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const diamondContract = new ethers.Contract(address, abi, provider);
  const data = await diamondContract.facets();
  return { body: data };
};
export {
  POST
};
