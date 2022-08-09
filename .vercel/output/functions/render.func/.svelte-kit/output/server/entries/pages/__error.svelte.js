import { c as create_ssr_component } from "../../_app/immutable/chunks/index-81ea8d51.js";
const _error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"flex items-center justify-center"}"><div class="${"px-40 py-20 bg-base-300 rounded-md shadow-xl"}"><div class="${"flex flex-col items-center"}"><h1 class="${"font-bold text-base-content text-4xl"}"><img src="${"/louper-logo-transparent.png"}" alt="${"Louper"}" class="${"h-24 mask mask-circle m-2"}"></h1>

      <h6 class="${"mb-2 text-2xl font-bold text-center text-base-content md:text-3xl"}"><span class="${"text-error"}">Oops!</span> Could not load diamond
      </h6>

      <p class="${"mb-2 text-center text-gray-500 md:text-lg"}">Are you sure this is a diamond contract?
      </p>
      <p class="${"mb-8 text-center text-gray-500 md:text-lg"}">Please make sure that the contract has a &quot;DiamondLoupeFacet&quot; that implements the &quot;facets()&quot;
        method.
      </p>

      <a href="${"/"}" class="${"btn btn-primary font-semibold"}">Go home</a></div></div></div>`;
});
export {
  _error as default
};
