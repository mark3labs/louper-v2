import { c as create_ssr_component, b as each, d as add_attribute, e as escape, v as validate_component } from "../../_app/immutable/chunks/index-81ea8d51.js";
import { H as Header } from "../../_app/immutable/chunks/Header-8cb12420.js";
import { N as NETWORKS } from "../../_app/immutable/chunks/config-6d74a4d4.js";
const Featured = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const diamonds = [
    {
      name: "Aavegotchi",
      description: "DeFi-enabled crypto collectibles game on Polygon.",
      icon: "/img/aavegotchi-polygon-logo.jpg",
      url: "/diamond/0x86935f11c86623dec8a25696e1c19a8659cbf95d?network=polygon",
      projectUrl: "https://www.aavegotchi.com/"
    },
    {
      name: "EscaBro",
      description: "Multi-chain smart contract escrow payments service.",
      icon: "/img/escabro-logo.png",
      url: "/diamond/0xa06fdba8774806654bc8b09f81ea74d8c98c1560",
      projectUrl: "https://escabro.com"
    },
    {
      name: "BarnBridge",
      description: "A fluctuations derivatives protocol for hedging yield sensitivity and market price.",
      icon: "/img/barnbridge-logo.jpg",
      url: "/diamond/0x10e138877df69ca44fdc68655f86c88cde142d7f",
      projectUrl: "https://barnbridge.com/"
    },
    {
      name: "Beanstalk",
      description: "A decentralized credit-based stablecoin protocol.",
      icon: "/img/beanstalk-logo.png",
      url: "/diamond/0xc1e088fc1323b20bcbee9bd1b9fc9546db5624c5",
      projectUrl: "https://bean.money/"
    },
    {
      name: "PieDAO",
      description: "PieDAO, the asset allocation DAO for decentralized market-weighted portfolio allocations.",
      icon: "/img/piedao-logo.png",
      url: "/diamond/0x17525e4f4af59fbc29551bc4ece6ab60ed49ce31",
      projectUrl: "https://www.piedao.org/"
    },
    {
      name: "Gelato V2",
      description: "Automated smart contract executions on Avalanche, Arbitrum, BSC, Fantom, Ethereum, Optimism, Polygon, and more.",
      icon: "/img/gelato-logo.png",
      url: "/diamond/0x3caca7b48d0573d793d3b0279b5f0029180e83b6",
      projectUrl: "https://gelato.network"
    },
    {
      name: "LIFI",
      description: "Developer Solution Providing Advanced Bridge Aggregation with DEX Connectivity",
      icon: "/img/lifi.png",
      url: "/diamond/0x362fa9d0bca5d19f743db50738345ce2b40ec99f",
      projectUrl: "https://li.fi"
    }
  ];
  return `<div class="${"text-center text-4xl"}">Featured Diamonds</div>
<section class="${"bg-base-300 rounded-box"}"><div class="${"relative"}"><div class="${"relative px-6 py-8 ml-auto mr-auto bg-top bg-cover sm:py-16 max-w-7xl md:px-24 lg:px-16 lg:py-20"}"><div class="${"relative grid gap-6 bg-top bg-cover sm:grid-cols-2 lg:grid-cols-4"}">${each(diamonds, (diamond) => {
    return `<div class="${"flex flex-col items-start justify-between p-6 space-y-4 overflow-hidden transition-shadow duration-200 bg-base-200 text-base-content bg-top bg-cover border border-base-100 shadow-xl rounded-2xl group hover:shadow-2xl cursor-pointer"}"><div class="${"flex items-center justify-center w-10 h-10 text-center bg-top rounded-full"}"><p class="${"relative"}"><img${add_attribute("src", diamond.icon, 0)} class="${"rounded-full shadow-xl"}"${add_attribute("alt", diamond.name, 0)}>
              </p></div>
            <p class="${"font-bold text-base-content"}">${escape(diamond.name)}</p>
            <p class="${"text-sm leading-5 text-gray-500"}">${escape(diamond.description)}</p>
            <div><a${add_attribute("href", diamond.projectUrl, 0)} target="${"_blank"}" class="${"text-secondary"}"><svg class="${"w-4 h-4"}" fill="${"none"}" stroke="${"currentColor"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"}"></path></svg>
              </a></div>
          </div>`;
  })}</div></div></div></section>`;
});
const Stats = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"stats"}"><div class="${"stat"}"><div class="${"stat-figure text-4xl"}">\u{1F48E}</div>
    <div class="${"stat-title"}">Diamonds Inspected</div>
    ${`<div class="${"stat-value rounded-full bg-base-300 animate-pulse h-10 w-20"}"></div>`}</div>

  <div class="${"stat"}"><div class="${"stat-figure text-4xl"}">\u{1F4C4}</div>
    <div class="${"stat-title"}">Contracts Inspected</div>
    ${`<div class="${"stat-value rounded-full bg-base-300 animate-pulse h-10 w-20"}"></div>`}</div>

  <div class="${"stat"}"><div class="${"stat-figure text-3xl"}">\u{1F440}</div>
    <div class="${"stat-title mb-2"}">Pages Views</div>
    ${`<div class="${"stat-value rounded-full bg-base-300 animate-pulse h-10 w-20"}"></div>`}
    <div class="${"stat-desc mt-2"}">Last 30 Days</div></div></div>`;
});
const LatestDiamonds = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let diamonds = [];
  return `<div class="${"px-4 mx-auto sm:px-6 lg:px-8 w-full"}"><div><p class="${"text-base font-bold "}">Recent Diamonds Inspected</p></div>

  <div class="${"mt-6"}"><div class="${"overflow-x-auto"}"><table class="${"table table-compact w-full"}">
        <thead><tr><th>Name</th>
            <th>Address</th>
            <th>Network</th></tr></thead>
        <tbody>${each(diamonds, (diamond) => {
    return `<tr class="${"hover cursor-pointer"}"><td>${escape(diamond.name.substring(0, 25))}</td>
              <td>${escape(diamond.address.substring(0, 20))}...${escape(diamond.address.substring(36))}</td>
              <td class="${"capitalize"}">${escape(NETWORKS[diamond.network].emoji)}\xA0
                ${escape(NETWORKS[diamond.network].title)}</td>
            </tr>`;
  })}</tbody></table></div></div></div>`;
});
const TopDiamonds = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let diamonds = [];
  return `<div class="${"px-4 mx-auto sm:px-6 lg:px-8 w-full"}"><div><p class="${"text-base font-bold "}">Top Diamonds Inspected</p></div>

  <div class="${"mt-6"}"><div class="${"overflow-x-auto"}"><table class="${"table table-compact w-full"}">
        <thead><tr><th>Name</th>
            <th>Address</th>
            <th>Views</th>
            <th>Network</th></tr></thead>
        <tbody>${each(diamonds, (diamond) => {
    return `<tr class="${"hover cursor-pointer"}"><td>${escape(diamond.name.substring(0, 25))}</td>
              <td>${escape(diamond.address.substring(0, 20))}...${escape(diamond.address.substring(36))}</td>
              <td>${escape(diamond.hits)}</td>
              <td class="${"capitalize"}">${escape(NETWORKS[diamond.network].emoji)}\xA0
                ${escape(NETWORKS[diamond.network].title)}</td>
            </tr>`;
  })}</tbody></table></div></div></div>`;
});
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"flex flex-col w-full space-y-10 my-5"}">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
  
  ${validate_component(Stats, "Stats").$$render($$result, {}, {}, {})}
  
  <div class="${"flex flex-row py-5 bg-base-300 sm:py-10 lg:py-10 rounded-box"}">${validate_component(LatestDiamonds, "LatestDiamonds").$$render($$result, {}, {}, {})}
    ${validate_component(TopDiamonds, "TopDiamonds").$$render($$result, {}, {}, {})}</div>
  
  ${validate_component(Featured, "Featured").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Routes as default
};
