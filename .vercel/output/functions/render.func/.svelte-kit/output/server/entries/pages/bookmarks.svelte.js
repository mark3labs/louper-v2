import { c as create_ssr_component, a as subscribe, b as each, e as escape } from "../../_app/immutable/chunks/index-81ea8d51.js";
import { p as profile } from "../../_app/immutable/chunks/profile-e567c59f.js";
import { N as NETWORKS } from "../../_app/immutable/chunks/config-6d74a4d4.js";
import { Orbis } from "@orbisclub/orbis-sdk";
async function load() {
  let profileValue;
  profile.subscribe((p) => {
    profileValue = p;
  });
  if (!profileValue) {
    return { status: 302, redirect: "/" };
  }
}
const Bookmarks = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_profile;
  $$unsubscribe_profile = subscribe(profile, (value) => value);
  new Orbis();
  let bookmarks = [];
  $$unsubscribe_profile();
  return `<div class="${"flex flex-row py-5 bg-base-300 sm:py-10 lg:py-10 rounded-box"}"><div class="${"px-4 mx-auto sm:px-6 lg:px-8 w-full"}"><div><p class="${"text-base font-bold "}">Bookmarked Diamonds</p></div>

    <div class="${"mt-6"}"><div class="${"overflow-x-auto"}"><table class="${"table table-compact w-full"}">
          <thead><tr><th>Name</th>
              <th>Address</th>
              <th>Network</th></tr></thead>
          <tbody>${each(bookmarks, (diamond) => {
    return `<tr class="${"hover cursor-pointer"}"><td>${escape(diamond.name.substring(0, 25))}</td>
                <td>${escape(diamond.address.substring(0, 20))}...${escape(diamond.address.substring(36))}</td>
                <td class="${"capitalize"}">${escape(NETWORKS[diamond.network].emoji)}\xA0
                  ${escape(NETWORKS[diamond.network].title)}</td>
              </tr>`;
  })}</tbody></table></div></div></div></div>`;
});
export {
  Bookmarks as default,
  load
};
