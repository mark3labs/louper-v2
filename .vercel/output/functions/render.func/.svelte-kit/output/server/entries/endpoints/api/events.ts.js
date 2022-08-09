import { ethers } from "ethers";
import { N as NETWORKS } from "../../../_app/immutable/chunks/config-6d74a4d4.js";
import dotenv from "dotenv";
import axios from "redaxios";
import { g as getEtherscanApiKey } from "../../../_app/immutable/chunks/utils-b192fabd.js";
dotenv.config();
const abi = ["event DiamondCut(tuple(address,uint8,bytes4[])[],address,bytes)"];
const topic = "0x8faa70878671ccd212d20771b795c50af8fd3ff6cf27f4bde57e5d4de0aeb673";
const POST = async ({
  request
}) => {
  const body = await request.json();
  console.info(`Fetching events for \u{1F48E} diamond at ${body.address} on ${body.network || "mainnet"}`);
  const address = body.address.toLowerCase();
  const network = body.network.toLowerCase();
  const API_KEY = getEtherscanApiKey(network);
  const apiUrl = NETWORKS[network].explorerApiUrl;
  if (apiUrl) {
    const fullUrl = `${apiUrl}?module=logs&action=getLogs&fromBlock=0&address=${address}&topic0=${topic}&apikey=${API_KEY}`;
    console.log(fullUrl);
    const resp = await axios.get(fullUrl);
    const louperEvents = [];
    if (resp.data) {
      const iface = new ethers.utils.Interface(abi);
      for (let i = 0; i < resp.data.result.length; i++) {
        const louperEvent = {
          ...iface.decodeEventLog("DiamondCut", resp.data.result[i].data),
          timestamp: parseInt(resp.data.result[i].timeStamp, 16),
          txHash: resp.data.result[i].transactionHash
        };
        louperEvents.push(louperEvent);
      }
    }
    return { body: louperEvents };
  }
};
export {
  POST
};
