import { c as create_ssr_component, e as escape, d as add_attribute, b as each, a as subscribe, o as onDestroy, v as validate_component } from "../../../_app/immutable/chunks/index-81ea8d51.js";
import { b as getVerifyContractUrl, a as getExplorerTxUrl, c as getExplorerAddressUrl } from "../../../_app/immutable/chunks/utils-b192fabd.js";
import { H as Header } from "../../../_app/immutable/chunks/Header-8cb12420.js";
import "redaxios";
import { initWeb3W } from "web3w";
import { N as NETWORKS } from "../../../_app/immutable/chunks/config-6d74a4d4.js";
import { ethers, utils, constants } from "ethers";
import { L as Loading, g as getNotificationsContext } from "../../../_app/immutable/chunks/Loading-9871f8c0.js";
import { Orbis } from "@orbisclub/orbis-sdk";
import { p as profile } from "../../../_app/immutable/chunks/profile-e567c59f.js";
const FacetCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { diamond } = $$props;
  let { facet } = $$props;
  let { showReadContract } = $$props;
  let { showWriteContract } = $$props;
  let { showRemoveFacet } = $$props;
  let { activeFacet } = $$props;
  if ($$props.diamond === void 0 && $$bindings.diamond && diamond !== void 0)
    $$bindings.diamond(diamond);
  if ($$props.facet === void 0 && $$bindings.facet && facet !== void 0)
    $$bindings.facet(facet);
  if ($$props.showReadContract === void 0 && $$bindings.showReadContract && showReadContract !== void 0)
    $$bindings.showReadContract(showReadContract);
  if ($$props.showWriteContract === void 0 && $$bindings.showWriteContract && showWriteContract !== void 0)
    $$bindings.showWriteContract(showWriteContract);
  if ($$props.showRemoveFacet === void 0 && $$bindings.showRemoveFacet && showRemoveFacet !== void 0)
    $$bindings.showRemoveFacet(showRemoveFacet);
  if ($$props.activeFacet === void 0 && $$bindings.activeFacet && activeFacet !== void 0)
    $$bindings.activeFacet(activeFacet);
  return `<div class="${"card shadow mockup-code bg-base-300 text-base-content"}"><div class="${"card-body"}"><div class="${"flex justify-between"}"><h2 class="${"card-title text-primary-focus font-bold"}">${escape(facet.name || "UNVERIFIED")}</h2>
      ${!facet.name ? `<a class="${"inline-block text-primary uppercase font-bold"}"${add_attribute("href", getVerifyContractUrl(facet.address, diamond.network), 0)} target="${"_blank"}">Verify
          <svg class="${"w-3 h-3 md:w-4 md:h-4 inline mb-1"}" fill="${"currentColor"}" viewBox="${"0 0 20 20"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"}"></path><path d="${"M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"}"></path></svg></a>` : ``}</div>
    <div class="${"badge badge-info p-3 cursor-pointer text-xs lg:text-base"}">${escape(facet.address)}
      <svg class="${"w-3 h-3 md:w-4 md:h-4 inline ml-2"}" fill="${"currentColor"}" viewBox="${"0 0 20 20"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"}"></path><path d="${"M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"}"></path></svg></div>
    <div class="${"overflow-x-auto mt-5 h-full"}"><table class="${"table w-full table-compact"}"><thead><tr><th>Method</th>
            <th class="${"text-right"}"><span class="${"mr-3"}">Selector</span></th></tr></thead>
        ${each(facet.methods, (method) => {
    return `<tr><td>${escape(method.signature)}</td>
            <td class="${"text-right"}"><span class="${"badge badge-info badge-outline font-bold"}">${escape(method.selector)}</span></td>
          </tr>`;
  })}</table></div>
    <div class="${"card-actions bg-secondary rounded-md p-1 text-secondary-content"}">${facet.name ? `<button class="${"btn glass btn-xs"}"><svg class="${"w-4 h-4 mr-1"}" stroke="${"currentColor"}" stroke-width="${"2"}" fill="${"none"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}" viewBox="${"0 0 24 24"}"><path d="${"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}"></path><circle cx="${"12"}" cy="${"12"}" r="${"3"}"></circle></svg>
          Read
        </button>
        <button class="${"btn glass btn-xs"}"><svg class="${"w-4 h-4 mr-1"}" fill="${"currentColor"}" viewBox="${"0 0 20 20"}" xmlns="${"http://www.w3.org/2000/svg"}"><path fill-rule="${"evenodd"}" d="${"M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"}" clip-rule="${"evenodd"}"></path></svg>
          Write
        </button>` : ``}
      <button class="${"btn glass btn-xs bg-error"}"><svg class="${"w-4 h-4 mr-1"}" fill="${"none"}" stroke="${"currentColor"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"}"></path></svg>
        Remove
      </button></div></div></div>`;
});
const Tags_svelte_svelte_type_style_lang = "";
const ReadContract = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { address } = $$props;
  let { network } = $$props;
  let { showModal = false } = $$props;
  let { facet = void 0 } = $$props;
  if ($$props.address === void 0 && $$bindings.address && address !== void 0)
    $$bindings.address(address);
  if ($$props.network === void 0 && $$bindings.network && network !== void 0)
    $$bindings.network(network);
  if ($$props.showModal === void 0 && $$bindings.showModal && showModal !== void 0)
    $$bindings.showModal(showModal);
  if ($$props.facet === void 0 && $$bindings.facet && facet !== void 0)
    $$bindings.facet(facet);
  return `${showModal && facet ? `<div class="${"mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left bg-base-200 p-10 rounded-box"}"><h3 class="${"text-2xl font-medium leading-6 mb-5"}">Read ${escape(facet.name)}</h3>

    
    <div class="${"form-control w-full max-w-xs"}"><label for="${"selectMethod"}" class="${"label"}">Choose a Method to Interact With </label>
      <select name="${"selectMethod"}" class="${"select select-bordered"}"><option${add_attribute("value", null, 0)}>Select a method </option>${each(facet.methods.filter((m) => m.fragment.constant), (method) => {
    return `<option${add_attribute("value", method, 0)} class="${"font-semibold"}">${escape(method.fragment.name)}
          </option>`;
  })}</select></div>
    ${``}</div>

  
  <div class="${"mt-5 sm:mt-6"}"><div class="${"flex rounded-md w-full justify-center"}"><button class="${"btn btn-sm glass bg-primary"}">Close
      </button></div></div>` : ``}`;
});
const WriteContract = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $wallet, $$unsubscribe_wallet;
  let $flow, $$unsubscribe_flow;
  let $$unsubscribe_transactions;
  let $builtin, $$unsubscribe_builtin;
  let { address } = $$props;
  let { network } = $$props;
  let { showModal = false } = $$props;
  let { facet = void 0 } = $$props;
  const { wallet, builtin, flow, transactions, chain } = initWeb3W({});
  $$unsubscribe_wallet = subscribe(wallet, (value) => $wallet = value);
  $$unsubscribe_builtin = subscribe(builtin, (value) => $builtin = value);
  $$unsubscribe_flow = subscribe(flow, (value) => $flow = value);
  $$unsubscribe_transactions = subscribe(transactions, (value) => value);
  let chainUnsub = chain.subscribe(async (c) => {
    if (!$wallet.disconnecting && c.chainId && NETWORKS[network].chainId !== c.chainId) {
      await wallet.disconnect();
      alert(`Invalid network. Pleae connect to ${network}.`);
    }
  });
  onDestroy(async () => {
    chainUnsub();
  });
  if ($$props.address === void 0 && $$bindings.address && address !== void 0)
    $$bindings.address(address);
  if ($$props.network === void 0 && $$bindings.network && network !== void 0)
    $$bindings.network(network);
  if ($$props.showModal === void 0 && $$bindings.showModal && showModal !== void 0)
    $$bindings.showModal(showModal);
  if ($$props.facet === void 0 && $$bindings.facet && facet !== void 0)
    $$bindings.facet(facet);
  {
    if ($flow.executionError) {
      $flow.executionError;
      flow.cancel();
      wallet.acknowledgeError();
    }
  }
  $$unsubscribe_wallet();
  $$unsubscribe_flow();
  $$unsubscribe_transactions();
  $$unsubscribe_builtin();
  return `${showModal && facet ? `<div class="${"mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left p-10 bg-base-200 rounded-box"}"><h3 class="${"text-2xl font-medium leading-6 mb-5"}">Write ${escape(facet.name)}</h3>
    ${$wallet.state !== "Ready" ? `${$builtin.available ? `<button class="${"btn btn-sm glass bg-primary"}">Connect </button>` : ``}` : ``}

    ${$wallet.state === "Ready" ? `<div class="${"form-control w-full max-w-xs"}"><label for="${"selectMethod"}" class="${"label"}">Choose a Method to Interact With </label>
        
        <select name="${"selectMethod"}" class="${"select select-bordered"}"><option${add_attribute("value", null, 0)}>Select a method </option>${each(facet.methods.filter((m) => !m.fragment.constant), (method) => {
    return `<option${add_attribute("value", method, 0)} class="${"font-semibold"}">${escape(method.fragment.name)}
            </option>`;
  })}</select></div>` : ``}
    ${``}</div>

  
  <div class="${"mt-5 sm:mt-6"}"><div class="${"flex rounded-md w-full justify-center"}"><button class="${"btn btn-sm glass bg-primary"}">Close</button></div></div>` : ``}`;
});
const History = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { events = [] } = $$props;
  let { facetsToName } = $$props;
  let { network } = $$props;
  const ACTIONS = ["Add", "Replace", "Remove"];
  if ($$props.events === void 0 && $$bindings.events && events !== void 0)
    $$bindings.events(events);
  if ($$props.facetsToName === void 0 && $$bindings.facetsToName && facetsToName !== void 0)
    $$bindings.facetsToName(facetsToName);
  if ($$props.network === void 0 && $$bindings.network && network !== void 0)
    $$bindings.network(network);
  return `<div class="${"rounded-box bg-base-300 text-base-content collapse collapse-arrow"}"><input type="${"checkbox"}">
  <div class="${"collapse-title text-xl font-medium"}"><svg class="${"w-8 h-8 mr-2 inline"}" fill="${"none"}" stroke="${"currentColor"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"}"></path></svg>
    Upgrade History
  </div>
  <div class="${"collapse-content overflow-y-auto"}"><ol class="${"relative border-l border-gray-200 m-10"}">${each(events.sort((a, b) => a.timestamp > b.timestamp ? -1 : 1), (event) => {
    return `<li class="${"mb-10 ml-6"}"><span class="${"flex absolute -left-3 justify-center items-center w-6 h-6 bg-primary-focus rounded-full ring-8 ring-primary"}">\u{1F48E}
          </span>
          <div class="${"ml-3"}"><h3 class="${"flex items-center mb-1 text-lg font-semibold"}">Diamond Cut</h3>
            <time class="${"block mb-2 text-sm font-normal leading-none text-gray-400"}">${escape(new Date(event.timestamp * 1e3).toUTCString())}</time>
            <a${add_attribute("href", getExplorerTxUrl(event.txHash, network), 0)} class="${"badge badge-info p-3 cursor-pointer text-xs lg:text-base"}" target="${"_blank"}">${escape(event.txHash)}
              <svg class="${"w-3 h-3 md:w-4 md:h-4 inline ml-2"}" fill="${"currentColor"}" viewBox="${"0 0 20 20"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"}"></path><path d="${"M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"}"></path></svg></a>
            ${each(event[0], (cut) => {
      return `<div class="${"flex my-2 space-x-2 border-t border-gray-600 pt-3"}"><div class="${[
        "badge badge-lg text-white uppercase font-semibold",
        (cut[1] == 0 ? "badge-primary" : "") + " " + (cut[1] == 1 ? "badge-secondary" : "") + " " + (cut[1] == 2 ? "badge-accent" : "")
      ].join(" ").trim()}">${escape(ACTIONS[cut[1]])}</div>
                <a${add_attribute("href", getExplorerAddressUrl(cut[0], network), 0)} class="${"badge badge-info p-3 cursor-pointer text-xs lg:text-base"}" target="${"_blank"}">${escape(cut[0])}
                  <svg class="${"w-3 h-3 md:w-4 md:h-4 inline ml-2"}" fill="${"currentColor"}" viewBox="${"0 0 20 20"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"}"></path><path d="${"M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"}"></path></svg></a>
                <div class="${"font-semibold"}">${escape(facetsToName[cut[0]] || "")}</div></div>
              <div class="${"flex flex-wrap space-x-1 ml-16"}">${each(cut[2], (selector) => {
        return `<span class="${"badge badge-info badge-outline font-bold my-2"}">${escape(selector)}</span>`;
      })}
              </div>`;
    })}</div>
        </li>`;
  })}</ol></div></div>`;
});
class DiamondContract {
  constructor(address, network, fetch) {
    this.address = "";
    this.network = "";
    this.name = "";
    this.facets = [];
    this.selectors = [];
    this.events = [];
    this.isFinal = true;
    this.isVerified = true;
    this.facetsToName = {};
    this.facetsToSelectors = /* @__PURE__ */ new Map();
    this.abi = [];
    this.fetchContractDetails = async () => {
      let res = await this.fetch("/api/contract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: this.address, network: this.network })
      });
      const diamond = await res.json();
      this.name = diamond.name;
      res = await this.fetch("/api/facets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: this.address, network: this.network })
      });
      const facets = await res.json();
      for (let i = 0; i < facets.length; i++) {
        this.facetsToSelectors[facets[i][0]] = facets[i][1];
        this.selectors = this.selectors.concat(facets[i][1]);
        res = await this.fetch("/api/contract", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: facets[i][0], network: this.network })
        });
        const facetData = await res.json();
        let methods = [];
        if (!facetData.abi.length) {
          this.isVerified = false;
          for (let j = 0; j < facets[i][1].length; j++) {
            const selector = String(facets[i][1][j]);
            if (!this.selectors.includes(selector))
              continue;
            let signature = "UNKNOWN";
            try {
              console.log("Fetching selector info from sig.eth.samczsun.com...");
              res = await this.fetch(
                `https://sig.eth.samczsun.com/api/v1/signatures?function=${selector}`,
                {
                  method: "GET",
                  headers: { "Content-Type": "application/json" }
                }
              );
              console.log("Fetched info from sig.eth.samczsun.com.");
              let data;
              if (res.ok) {
                try {
                  data = await res.json();
                } catch (e) {
                  console.log("Could not parse data");
                }
              }
              if (data && data.result && data.result.function[selector] && data.result.function[selector].length) {
                signature = data.result.function[selector][0].name;
              }
              if (signature === "diamondCut((address,uint8,bytes4[])[],address,bytes)") {
                this.isFinal = false;
              }
            } catch (e) {
              console.log(e);
            }
            methods.push({
              selector,
              signature,
              fragment: void 0
            });
          }
        } else {
          facetData.abi.forEach((a) => {
            this.abi.push(a);
          });
          methods = await this.getMethods(facets[i][0], facetData.abi);
        }
        const name = facetData.name;
        const facet = {
          address: facets[i][0].toLowerCase(),
          name,
          methods
        };
        this.facets.push(facet);
        this.facetsToName[facet.address] = facet.name;
      }
      try {
        res = await this.fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: this.address, network: this.network })
        });
        this.events = await res.json();
        await this.fetch("/api/leaderboard", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            address: this.address,
            network: this.network,
            name: this.name || "Unknown"
          })
        });
      } catch (e) {
        console.error(e);
        this.events = [];
      }
      return this;
    };
    this.getMethods = async (address2, abi) => {
      const contract = new ethers.Contract(address2, abi);
      const methods = [];
      const functions = contract.interface.functions;
      for (const [f, val] of Object.entries(functions)) {
        if (f === "diamondCut((address,uint8,bytes4[])[],address,bytes)") {
          this.isFinal = false;
        }
        const selector = utils.keccak256(utils.toUtf8Bytes(f)).substring(0, 10);
        if (!this.facetsToSelectors[address2].includes(selector))
          continue;
        const method = {
          signature: f,
          selector,
          fragment: val
        };
        methods.push(method);
      }
      return methods;
    };
    this.address = address;
    this.network = network;
    this.fetch = fetch;
  }
}
const RemoveFacet = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $wallet, $$unsubscribe_wallet;
  let $flow, $$unsubscribe_flow;
  let $$unsubscribe_transactions;
  let $builtin, $$unsubscribe_builtin;
  let { facet = void 0 } = $$props;
  let { address } = $$props;
  let { network } = $$props;
  let { showModal = false } = $$props;
  let error = null;
  const FacetCutAction = { Add: 0, Replace: 1, Remove: 2 };
  const { wallet, builtin, flow, transactions, chain } = initWeb3W({});
  $$unsubscribe_wallet = subscribe(wallet, (value) => $wallet = value);
  $$unsubscribe_builtin = subscribe(builtin, (value) => $builtin = value);
  $$unsubscribe_flow = subscribe(flow, (value) => $flow = value);
  $$unsubscribe_transactions = subscribe(transactions, (value) => value);
  new utils.Interface([
    "function diamondCut(tuple(address facetAddress, uint8 action, bytes4[] functionSelectors)[],address initAddress, bytes callData) external"
  ]);
  let chainUnsub = chain.subscribe(async (c) => {
    if (!$wallet.disconnecting && c.chainId && NETWORKS[network].chainId !== c.chainId) {
      await wallet.disconnect();
      alert(`Invalid network. Pleae connect to ${network}.`);
    }
  });
  onDestroy(() => {
    error = null;
    chainUnsub();
  });
  if ($$props.facet === void 0 && $$bindings.facet && facet !== void 0)
    $$bindings.facet(facet);
  if ($$props.address === void 0 && $$bindings.address && address !== void 0)
    $$bindings.address(address);
  if ($$props.network === void 0 && $$bindings.network && network !== void 0)
    $$bindings.network(network);
  if ($$props.showModal === void 0 && $$bindings.showModal && showModal !== void 0)
    $$bindings.showModal(showModal);
  {
    if (facet) {
      [
        [
          {
            facetAddress: constants.AddressZero,
            action: FacetCutAction.Remove,
            functionSelectors: facet.methods.map((m) => m.selector)
          }
        ],
        constants.AddressZero,
        "0x"
      ];
    }
  }
  {
    if ($flow.executionError) {
      error = $flow.executionError;
      flow.cancel();
      wallet.acknowledgeError();
    }
  }
  $$unsubscribe_wallet();
  $$unsubscribe_flow();
  $$unsubscribe_transactions();
  $$unsubscribe_builtin();
  return `${showModal && facet ? `<div class="${"mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"}"><h3 class="${"text-2xl font-medium leading-6 mb-5"}">Remove ${escape(facet.name)}</h3>

    <div class="${"alert alert-error"}"><div class="${"flex-1"}"><span class="${"text-2xl mr-2"}">\u{1F480}</span>
        <label for="${""}">This is a BETA feature and may break your diamond contract. This will remove this facet
          and all selectors from this contract!
        </label></div></div></div>

  <div class="${"container flex justify-center mt-5 gap-2"}">${$wallet.state !== "Ready" ? `${$builtin.available ? `<button class="${"btn btn-sm glass bg-primary"}">Connect </button>` : ``}` : ``}</div>

  ${$wallet.state === "Ready" ? `<div class="${"mt-2 flex justify-center h-72"}"><p class="${"leading-5 bg-neutral-focus text-neutral-content w-full p-5 rounded-box overflow-auto"}">${$wallet.pendingUserConfirmation ? `Please check and approve the transaction in your wallet.` : ``}

        ${$flow.inProgress ? `<div class="${"self-center"}">${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}</div>` : ``}

        ${error ? `<div class="${"self-center"}"><p class="${"text-red-500 font-semibold"}">${escape(error.message)}</p></div>` : ``}</p></div>` : ``}

  ${$wallet.state === "Ready" ? `<div class="${"flex justify-center"}"><button class="${"btn btn-xl glass bg-error"}"><svg class="${"w-6 h-6 mr-1"}" fill="${"none"}" stroke="${"currentColor"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"}"></path></svg>
        REMOVE
      </button></div>` : ``}

  
  <div class="${"mt-5 sm:mt-6"}"><div class="${"flex rounded-md w-full justify-center"}"><button class="${"btn btn-sm glass bg-primary"}">Close</button></div></div>` : ``}`;
});
const AddFacet = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $wallet, $$unsubscribe_wallet;
  let $flow, $$unsubscribe_flow;
  let $$unsubscribe_transactions;
  let $builtin, $$unsubscribe_builtin;
  let facetAddress = "";
  let { allFacets = [] } = $$props;
  let { address } = $$props;
  let { network } = $$props;
  let { showModal = false } = $$props;
  const { wallet, builtin, flow, transactions, chain } = initWeb3W({});
  $$unsubscribe_wallet = subscribe(wallet, (value) => $wallet = value);
  $$unsubscribe_builtin = subscribe(builtin, (value) => $builtin = value);
  $$unsubscribe_flow = subscribe(flow, (value) => $flow = value);
  $$unsubscribe_transactions = subscribe(transactions, (value) => value);
  new utils.Interface([
    "function diamondCut(tuple(address facetAddress, uint8 action, bytes4[] functionSelectors)[],address initAddress, bytes callData) external"
  ]);
  let chainUnsub = chain.subscribe(async (c) => {
    if (!$wallet.disconnecting && c.chainId && NETWORKS[network].chainId !== c.chainId) {
      await wallet.disconnect();
      alert(`Invalid network. Pleae connect to ${network}.`);
    }
  });
  onDestroy(() => {
    chainUnsub();
  });
  if ($$props.allFacets === void 0 && $$bindings.allFacets && allFacets !== void 0)
    $$bindings.allFacets(allFacets);
  if ($$props.address === void 0 && $$bindings.address && address !== void 0)
    $$bindings.address(address);
  if ($$props.network === void 0 && $$bindings.network && network !== void 0)
    $$bindings.network(network);
  if ($$props.showModal === void 0 && $$bindings.showModal && showModal !== void 0)
    $$bindings.showModal(showModal);
  {
    if ($flow.executionError) {
      $flow.executionError;
      flow.cancel();
      wallet.acknowledgeError();
    }
  }
  {
    if ($flow.error) {
      $flow.error;
      flow.cancel();
      wallet.acknowledgeError();
    }
  }
  $$unsubscribe_wallet();
  $$unsubscribe_flow();
  $$unsubscribe_transactions();
  $$unsubscribe_builtin();
  return `${showModal ? `<div class="${"flex justify-center"}"><div class="${"rounded-box bg-base-300 p-10 w-2/3"}"><div class="${"mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"}"><h3 class="${"text-2xl font-medium leading-6 mb-5"}">Add New Facet</h3>

        ${``}</div>
      ${$wallet.state !== "Ready" ? `<div class="${"container flex justify-center mt-5 gap-2"}">${$builtin.available ? `<button class="${"btn btn-sm glass bg-primary"}">Connect
            </button>` : ``}</div>` : `${`<div class="${"flex items-end"}"><div class="${"form-control w-2/3"}"><label class="${"label"}" for="${""}"><span class="${"label-text"}">Facet Address</span></label>
              <input type="${"text"}" class="${"rounded-xl m-2 input input-primary input-bordered bg-base-200"}"${add_attribute("value", facetAddress, 0)}></div>
            <button class="${"btn bg-primary btn-sm glass mb-4"}">Fetch Facet Info
            </button></div>`}

        ${``}`}

      
      <div class="${"mt-5 sm:mt-6"}"><div class="${"flex rounded-md w-full justify-center"}"><button class="${"btn btn-sm glass bg-primary"}">Close</button></div></div></div></div>` : ``}`;
});
const Bookmark = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_profile;
  $$unsubscribe_profile = subscribe(profile, (value) => value);
  let { diamond } = $$props;
  new Orbis();
  if ($$props.diamond === void 0 && $$bindings.diamond && diamond !== void 0)
    $$bindings.diamond(diamond);
  $$unsubscribe_profile();
  return `<button class="${"btn btn-sm glass bg-accent"}" ${""}><svg class="${"w-6 h-6"}" fill="${"none"}" stroke="${"currentColor"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"}"></path></svg></button>`;
});
const load = async ({ params, url, fetch }) => {
  console.log("Fetching diamond details...");
  const diamond = await new DiamondContract(params.address, url.searchParams.get("network") || "mainnet", fetch).fetchContractDetails();
  console.log("Diamond details fetched...");
  return { props: { diamond } };
};
const U5Baddressu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $transactions, $$unsubscribe_transactions;
  let $profile, $$unsubscribe_profile;
  $$unsubscribe_profile = subscribe(profile, (value) => $profile = value);
  const { addNotification } = getNotificationsContext();
  let { diamond } = $$props;
  let showReadContract = false;
  let showWriteContract = false;
  let showRemoveFacet = false;
  let showAddFacet = false;
  let activeFacet = null;
  let { transactions } = initWeb3W({});
  $$unsubscribe_transactions = subscribe(transactions, (value) => $transactions = value);
  if ($$props.diamond === void 0 && $$bindings.diamond && diamond !== void 0)
    $$bindings.diamond(diamond);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    {
      if (diamond) {
        initWeb3W({
          builtin: { autoProbe: true },
          options: ["builtin"]
        });
      }
    }
    {
      if ($transactions.length) {
        for (let t of $transactions) {
          if (t.acknowledged)
            continue;
          transactions.acknowledge(t.hash, t.status);
          addNotification({
            text: t.hash,
            position: "bottom-right",
            status: t.status,
            network: diamond.network
          });
        }
      }
    }
    $$rendered = `${$$result.head += `${$$result.title = `<title>Louper - ${escape(diamond.name || "UNKNOWN")}</title>`, ""}`, ""}

<div class="${"flex flex-col w-full space-y-10 my-5 mx-auto"}">${validate_component(Header, "Header").$$render(
      $$result,
      {
        address: diamond.address,
        network: diamond.network
      },
      {},
      {}
    )}

  <h1 class="${"text-4xl text-center"}">${escape(diamond.name || "UNKNOWN")}</h1>
  <div class="${"flex justify-center"}"><div class="${"badge badge-info p-3 cursor-pointer text-xs lg:text-base"}">${escape(diamond.address)}
      <svg class="${"w-3 h-3 md:w-4 md:h-4 inline ml-2"}" fill="${"currentColor"}" viewBox="${"0 0 20 20"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"}"></path><path d="${"M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"}"></path></svg></div></div>
  ${!showReadContract && !showWriteContract && !showAddFacet && !showRemoveFacet ? `<div class="${"flex justify-between"}">${diamond.isFinal ? `<div class="${"badge badge-success badge-lg"}">Final</div>` : `<div class="${"badge badge-warning badge-lg"}">Upgradable</div>`}
      <div class="${"flex justify-between gap-2"}"><a class="${"btn btn-sm glass bg-secondary"}" download="${"abi.json"}"${add_attribute("href", `data:application/octet-stream,${encodeURI(JSON.stringify(diamond.abi))}`, 0)}><svg class="${"w-4 h-4 mr-2"}" fill="${"none"}" stroke="${"currentColor"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"}"></path></svg>
          Download ABI
        </a>
        <button class="${"btn btn-sm glass bg-primary"}"><svg class="${"w-4 h-4 mr-1"}" fill="${"none"}" stroke="${"currentColor"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"}"></path></svg>
          Upgrade Facet
        </button>
        ${$profile ? `${validate_component(Bookmark, "Bookmark").$$render($$result, { diamond }, {}, {})}` : ``}</div></div>
    ${validate_component(History, "History").$$render(
      $$result,
      {
        events: diamond.events,
        network: diamond.network,
        facetsToName: diamond.facetsToName
      },
      {},
      {}
    )}
    <div class="${"grid lg:grid-cols-2 gap-3"}">${each(diamond.facets, (facet) => {
      return `${validate_component(FacetCard, "FacetCard").$$render(
        $$result,
        {
          facet,
          diamond,
          activeFacet,
          showReadContract,
          showWriteContract,
          showRemoveFacet
        },
        {
          activeFacet: ($$value) => {
            activeFacet = $$value;
            $$settled = false;
          },
          showReadContract: ($$value) => {
            showReadContract = $$value;
            $$settled = false;
          },
          showWriteContract: ($$value) => {
            showWriteContract = $$value;
            $$settled = false;
          },
          showRemoveFacet: ($$value) => {
            showRemoveFacet = $$value;
            $$settled = false;
          }
        },
        {}
      )}`;
    })}</div>` : ``}
  ${validate_component(ReadContract, "ReadContract").$$render(
      $$result,
      {
        address: diamond.address,
        network: diamond.network,
        showModal: showReadContract,
        facet: activeFacet
      },
      {
        showModal: ($$value) => {
          showReadContract = $$value;
          $$settled = false;
        },
        facet: ($$value) => {
          activeFacet = $$value;
          $$settled = false;
        }
      },
      {}
    )}
  ${validate_component(WriteContract, "WriteContract").$$render(
      $$result,
      {
        address: diamond.address,
        network: diamond.network,
        showModal: showWriteContract,
        facet: activeFacet
      },
      {
        showModal: ($$value) => {
          showWriteContract = $$value;
          $$settled = false;
        },
        facet: ($$value) => {
          activeFacet = $$value;
          $$settled = false;
        }
      },
      {}
    )}
  ${validate_component(RemoveFacet, "RemoveFacet").$$render(
      $$result,
      {
        address: diamond.address,
        network: diamond.network,
        showModal: showRemoveFacet,
        facet: activeFacet
      },
      {
        showModal: ($$value) => {
          showRemoveFacet = $$value;
          $$settled = false;
        },
        facet: ($$value) => {
          activeFacet = $$value;
          $$settled = false;
        }
      },
      {}
    )}
  ${validate_component(AddFacet, "AddFacet").$$render(
      $$result,
      {
        allFacets: diamond.facets,
        address: diamond.address,
        network: diamond.network,
        showModal: showAddFacet
      },
      {
        showModal: ($$value) => {
          showAddFacet = $$value;
          $$settled = false;
        }
      },
      {}
    )}</div>`;
  } while (!$$settled);
  $$unsubscribe_transactions();
  $$unsubscribe_profile();
  return $$rendered;
});
export {
  U5Baddressu5D as default,
  load
};
