import { c as create_ssr_component, d as add_attribute, b as each, e as escape, v as validate_component } from "./index-81ea8d51.js";
import { N as NETWORKS } from "./config-6d74a4d4.js";
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { address = "" } = $$props;
  let { network = "mainnet" } = $$props;
  if ($$props.address === void 0 && $$bindings.address && address !== void 0)
    $$bindings.address(address);
  if ($$props.network === void 0 && $$bindings.network && network !== void 0)
    $$bindings.network(network);
  return `<div class="${"card flex flex-col justify-around h-full bg-base-200 shadow-xl"}"><div class="${"card-body"}"><div class="${"card-title"}">Search by Address</div>
    <div class="${"grid grid-flow-col card bg-base-300 rounded-box p-1 lg:p-2"}"><div class="${"form-control"}"><div class="${"relative"}"><input type="${"text"}" placeholder="${"0x..."}" class="${"w-full pr-16 input text-2xl bg-base-300 text-base-content"}"${add_attribute("value", address, 0)}>
          <select class="${"select select-sm absolute top-2 right-14 mr-3 bg-base-300 w-1/5 lg:w-auto"}">${each(Object.keys(NETWORKS), (network2) => {
    return `<option${add_attribute("value", network2, 0)} class="${"font-semibold"}">${escape(NETWORKS[network2].emoji)} ${escape(NETWORKS[network2].title)}</option>`;
  })}</select>
          <button class="${"absolute top-0 right-0 btn border-0 bg-gradient-to-r from-primary to-secondary"}">\u{1F50E}
          </button></div></div></div></div></div>`;
});
const Sponsor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"card bg-base-300 shadow-xl"}"><div class="${"card-body"}"><h2 class="${"card-title"}">Sponsor Louper</h2>
    <p>Reach thousands of Blockchain Enthusiasts &amp; Developers Worldwide</p>
    <div class="${"card-actions justify-end"}"><button class="${"btn btn-primary"}">Contact Us</button></div></div></div>`;
});
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { address = "" } = $$props;
  let { network = "mainnet" } = $$props;
  if ($$props.address === void 0 && $$bindings.address && address !== void 0)
    $$bindings.address(address);
  if ($$props.network === void 0 && $$bindings.network && network !== void 0)
    $$bindings.network(network);
  return `<div class="${"lg:flex lg: flex-row lg:space-x-3 space-y-2"}">
  <div class="${"w-full lg:w-3/4"}">${validate_component(Search, "Search").$$render($$result, { address, network }, {}, {})}</div>
  <div class="${"w-full lg:w-1/4"}">${validate_component(Sponsor, "Sponsor").$$render($$result, {}, {}, {})}</div></div>`;
});
export {
  Header as H
};
