import { N as NETWORKS } from "../../../_app/immutable/chunks/config-6d74a4d4.js";
import axios from "redaxios";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { g as getEtherscanApiKey } from "../../../_app/immutable/chunks/utils-b192fabd.js";
const SOURCIFY_REPO_URL = "https://repo.sourcify.dev";
dotenv.config();
const supabase = createClient(process.env["SUPABASE_URL"], process.env["SUPABASE_KEY"]);
const POST = async ({
  request
}) => {
  const body = await request.json();
  const network = body.network.toLowerCase() || "mainnet";
  const address = body.address.toLowerCase();
  const API_KEY = getEtherscanApiKey(network);
  console.info(`Fetching data for \u{1F4DD} contract at ${address} on ${network}`);
  const res = await fetchCachedAbi(network, address);
  if (res.abi) {
    return {
      body: {
        abi: res.abi,
        name: res.name
      }
    };
  }
  try {
    console.log("Trying Sourcify...");
    const metadata = await axios.get(
      `${SOURCIFY_REPO_URL}/contracts/full_match/${NETWORKS[network].chainId}/${address}/metadata.json`
    );
    if (metadata) {
      console.log(
        `Fetched ABI for ${Object.values(metadata.data.settings.compilationTarget)[0]}. Caching...`
      );
      await cacheAbi(
        network,
        address,
        Object.values(metadata.data.settings.compilationTarget)[0],
        metadata.data.output.abi
      );
      return {
        body: {
          abi: metadata.data.output.abi,
          name: Object.values(metadata.data.settings.compilationTarget)[0]
        }
      };
    }
  } catch (e) {
    console.log("Nothing found on Sourcify.");
  }
  const apiUrl = NETWORKS[network].explorerApiUrl;
  if (apiUrl) {
    try {
      const fullUrl = `${apiUrl}?module=contract&action=getsourcecode&address=${address}&apikey=${API_KEY}`;
      console.log(fullUrl);
      const resp = await axios.get(fullUrl);
      const abi = resp.data.result[0].SourceCode ? JSON.parse(resp.data.result[0].ABI) : [];
      const name = resp.data.result[0].ContractName || "";
      if (abi.length) {
        console.log(`Fetched ABI for ${name}. Caching...`);
        await cacheAbi(network, address, name, abi);
      } else {
        console.log("Contract not verified...");
      }
      return {
        body: {
          name,
          abi
        }
      };
    } catch (e) {
      console.log("Nothing found on block explorer.");
    }
  }
  return {
    body: {
      name: "",
      abi: []
    }
  };
};
const fetchCachedAbi = async (network, address) => {
  const { data, error } = await supabase.from("contracts").select().eq("network", network).eq("address", address);
  if (error) {
    console.error(error);
    return error;
  }
  if (!data.length) {
    console.log("No cached ABI. Fetching from block explorer...");
    return false;
  }
  console.log(`ABI for ${data[0].name} fetched.`);
  return { abi: data[0].abi, name: data[0].name };
};
const cacheAbi = async (network, address, name, abi) => {
  const { error } = await supabase.from("contracts").insert([
    {
      network,
      address,
      name: name || "",
      abi
    }
  ]);
  if (error) {
    console.error(error);
  }
};
export {
  POST
};
