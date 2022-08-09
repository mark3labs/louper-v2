import { ethers } from "ethers";
import { N as NETWORKS } from "../../../_app/immutable/chunks/config-6d74a4d4.js";
import dotenv from "dotenv";
dotenv.config();
const INFURA_API_KEY = process.env["INFURA_API_KEY"];
const POST = async ({ request }) => {
  const body = await request.json();
  console.info(
    `Reading contract data for \u{1F48E} diamond at ${body.address} on ${body.network || "mainnet"}`
  );
  const address = body.address.toLowerCase();
  const abi = [];
  const fragment = JSON.parse(body.fragment);
  abi.push(fragment);
  const args = body.args;
  let rpcUrl = body.network ? NETWORKS[body.network].rpcUrl : NETWORKS["mainnet"].rpcUrl;
  rpcUrl = rpcUrl.replace("%INFURA_API_KEY%", INFURA_API_KEY);
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const diamondContract = new ethers.Contract(address, abi, provider);
  try {
    const funcFragment = ethers.utils.FunctionFragment.from(fragment);
    const method = funcFragment.format(ethers.utils.FormatTypes.minimal).split(" ")[1];
    console.log(method);
    const data = await diamondContract[method](...args);
    return { body: data };
  } catch (e) {
    return {
      body: {
        reason: e.reason,
        code: e.code,
        value: e.value
      }
    };
  }
};
export {
  POST
};
