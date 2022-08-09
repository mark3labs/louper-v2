import { c as create_ssr_component, o as onDestroy, v as validate_component, m as missing_component, e as escape, n as null_to_empty, a as subscribe, s as setContext, b as each, d as add_attribute } from "../../_app/immutable/chunks/index-81ea8d51.js";
import { g as getNotificationsContext, s as store, c as context, p as positions, L as Loading } from "../../_app/immutable/chunks/Loading-9871f8c0.js";
import { w as writable, p as profile } from "../../_app/immutable/chunks/profile-e567c59f.js";
import { a as getExplorerTxUrl } from "../../_app/immutable/chunks/utils-b192fabd.js";
import { Orbis } from "@orbisclub/orbis-sdk";
import "../../_app/immutable/chunks/config-6d74a4d4.js";
const Notification = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { item } = $$props;
  let { notification = {} } = $$props;
  let { withoutStyles = false } = $$props;
  const { removeNotification } = getNotificationsContext();
  const { id, removeAfter } = notification;
  const removeNotificationHandler = () => removeNotification(id);
  let timeout = null;
  if (removeAfter) {
    timeout = setTimeout(removeNotificationHandler, removeAfter);
  }
  onDestroy(() => {
    if (removeAfter && timeout)
      clearTimeout(timeout);
  });
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  if ($$props.notification === void 0 && $$bindings.notification && notification !== void 0)
    $$bindings.notification(notification);
  if ($$props.withoutStyles === void 0 && $$bindings.withoutStyles && withoutStyles !== void 0)
    $$bindings.withoutStyles(withoutStyles);
  return `${validate_component(item || missing_component, "svelte:component").$$render(
    $$result,
    {
      notification,
      withoutStyles,
      onRemove: removeNotificationHandler
    },
    {},
    {}
  )}`;
});
const css$1 = {
  code: ".default-notification-style.svelte-ni1dc5.svelte-ni1dc5{align-items:stretch;background:#fff;border-radius:6px;box-shadow:0 4px 10px rgba(0,0,0,.08);color:#000;display:flex;justify-content:space-between;margin:12px;min-height:0;min-width:200px;overflow:hidden;position:relative}.default-notification-style-content.svelte-ni1dc5.svelte-ni1dc5{word-wrap:break-word;box-sizing:border-box;padding:12px 6px 12px 12px;width:210px}.default-notification-style-button.svelte-ni1dc5.svelte-ni1dc5{background:none;border:none;border-left:1px solid #eee;box-sizing:border-box;color:#000;cursor:pointer;display:block;font-size:20px;margin:0;outline:none;padding:0;width:40px}.default-notification-style-button.svelte-ni1dc5.svelte-ni1dc5:hover{background:rgba(0,0,0,.01)}.default-notification-danger.svelte-ni1dc5.svelte-ni1dc5{background:#f3555a;color:#fff}.default-notification-danger.svelte-ni1dc5 .default-notification-style-button.svelte-ni1dc5{border-left:1px solid hsla(0,0%,100%,.4);color:#fff}.default-notification-warning.svelte-ni1dc5.svelte-ni1dc5{background:#ffb900;color:#000}.default-notification-warning.svelte-ni1dc5 .default-notification-style-button.svelte-ni1dc5{border-left:1px solid rgba(0,0,0,.2);color:#000}.default-notification-success.svelte-ni1dc5.svelte-ni1dc5{background:#22ce6c;color:#fff}.default-notification-success.svelte-ni1dc5 .default-notification-style-button.svelte-ni1dc5{border-left:1px solid hsla(0,0%,100%,.4);color:#fff}",
  map: null
};
const DefaultNotification = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { notification = {} } = $$props;
  let { withoutStyles = false } = $$props;
  let { onRemove = null } = $$props;
  const { text, type } = notification;
  const getClass = (suffix) => {
    const defaultSuffix = suffix ? `-${suffix}` : "";
    const defaultNotificationClass = ` default-notification-style${defaultSuffix}`;
    const defaultNotificationType = type && !suffix ? ` default-notification-${type}` : "";
    return `notification${defaultSuffix}${withoutStyles ? "" : defaultNotificationClass}${defaultNotificationType}`;
  };
  if ($$props.notification === void 0 && $$bindings.notification && notification !== void 0)
    $$bindings.notification(notification);
  if ($$props.withoutStyles === void 0 && $$bindings.withoutStyles && withoutStyles !== void 0)
    $$bindings.withoutStyles(withoutStyles);
  if ($$props.onRemove === void 0 && $$bindings.onRemove && onRemove !== void 0)
    $$bindings.onRemove(onRemove);
  $$result.css.add(css$1);
  return `<div class="${escape(null_to_empty(getClass())) + " svelte-ni1dc5"}" role="${"status"}" aria-live="${"polite"}"><div class="${escape(null_to_empty(getClass("content"))) + " svelte-ni1dc5"}">${slots.default ? slots.default({}) : `${escape(text)}`}</div>
  <button class="${escape(null_to_empty(getClass("button"))) + " svelte-ni1dc5"}" aria-label="${"delete notification"}">\xD7
  </button></div>`;
});
const css = {
  code: ".default-position-style-bottom-center.svelte-1nyq31c,.default-position-style-bottom-left.svelte-1nyq31c,.default-position-style-bottom-right.svelte-1nyq31c,.default-position-style-top-center.svelte-1nyq31c,.default-position-style-top-left.svelte-1nyq31c,.default-position-style-top-right.svelte-1nyq31c{max-width:400px;position:fixed}.default-position-style-top-left.svelte-1nyq31c{left:0;top:0}.default-position-style-top-center.svelte-1nyq31c{left:50%;top:0;transform:translateX(-50%)}.default-position-style-top-right.svelte-1nyq31c{right:0;top:0}.default-position-style-bottom-left.svelte-1nyq31c{bottom:0;left:0}.default-position-style-bottom-center.svelte-1nyq31c{bottom:0;left:50%;transform:translateX(-50%)}.default-position-style-bottom-right.svelte-1nyq31c{bottom:0;right:0}",
  map: null
};
const Notifications = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $store, $$unsubscribe_store;
  $$unsubscribe_store = subscribe(store, (value) => $store = value);
  let { item = null } = $$props;
  let { withoutStyles = false } = $$props;
  const getClass = (position = "") => {
    const defaultPositionClass = ` default-position-style-${position}`;
    return `position-${position}${withoutStyles ? "" : defaultPositionClass}`;
  };
  setContext(context, store);
  if ($$props.item === void 0 && $$bindings.item && item !== void 0)
    $$bindings.item(item);
  if ($$props.withoutStyles === void 0 && $$bindings.withoutStyles && withoutStyles !== void 0)
    $$bindings.withoutStyles(withoutStyles);
  $$result.css.add(css);
  $$unsubscribe_store();
  return `${slots.default ? slots.default({}) : ``}
<div class="${"notifications"}">${each(positions, (position) => {
    return `<div class="${escape(null_to_empty(getClass(position))) + " svelte-1nyq31c"}">${each($store, (notification) => {
      return `${notification.position === position ? `${validate_component(Notification, "Notification").$$render(
        $$result,
        {
          notification,
          withoutStyles,
          item: item || DefaultNotification
        },
        {},
        {}
      )}` : ``}`;
    })}
    </div>`;
  })}</div>`;
});
const app = "";
const navigationState = writable(null);
const TransactionNotification = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { notification = { status: null, network: null, text: null } } = $$props;
  let { onRemove = null } = $$props;
  if ($$props.notification === void 0 && $$bindings.notification && notification !== void 0)
    $$bindings.notification(notification);
  if ($$props.onRemove === void 0 && $$bindings.onRemove && onRemove !== void 0)
    $$bindings.onRemove(onRemove);
  return `<div class="${"relative"}"><div class="${"card bg-base-100 my-5 text-base-content bottom-0 right-5 shadow-xl z-50 border border-secondary"}"><div class="${"card-body"}"><div class="${"card-actions justify-between"}"><h2 class="${[
    "card-title capitalize bg-neutral rounded-box p-2",
    (notification.status === "success" ? "text-success" : "") + " " + (notification.status === "pending" ? "text-info" : "") + " " + (notification.status === "failure" ? "text-error" : "")
  ].join(" ").trim()}">${notification.status === "pending" ? `<svg class="${"w-6 h-6 inline-block"}" fill="${"none"}" stroke="${"currentColor"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"}"></path></svg>` : ``}
          ${notification.status === "success" ? `<svg class="${"w-6 h-6 inline-block"}" fill="${"none"}" stroke="${"currentColor"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"}"></path></svg>` : ``}
          ${notification.status === "failure" ? `<svg class="${"w-6 h-6 inline-block"}" fill="${"none"}" stroke="${"currentColor"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"}"></path></svg>` : ``}
          ${escape(notification.status)}</h2>
        <button class="${"btn btn-circle btn-xs btn-secondary"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"h-3 w-3"}" fill="${"none"}" viewBox="${"0 0 24 24"}" stroke="${"currentColor"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M6 18L18 6M6 6l12 12"}"></path></svg></button></div>
      <a${add_attribute("href", getExplorerTxUrl(notification.text, notification.network), 0)} target="${"_blank"}" class="${"badge badge-secondary text-white p-3 cursor-pointer text-xs lg:text-base"}">${escape(notification.text.substring(0, 15))}...${escape(notification.text.substring(notification.text.length - 15))}
        <svg class="${"w-3 h-3 md:w-4 md:h-4 inline ml-2"}" fill="${"currentColor"}" viewBox="${"0 0 20 20"}" xmlns="${"http://www.w3.org/2000/svg"}"><path d="${"M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"}"></path><path d="${"M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"}"></path></svg></a></div></div></div>`;
});
const ConnectToOrbis = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_profile;
  $$unsubscribe_profile = subscribe(profile, (value) => value);
  new Orbis();
  $$unsubscribe_profile();
  return `<button class="${"btn btn-sm btn-primary"}">Sign In </button>`;
});
const ProfileDropdown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $profile, $$unsubscribe_profile;
  $$unsubscribe_profile = subscribe(profile, (value) => $profile = value);
  console.log($profile);
  $$unsubscribe_profile();
  return `${$profile ? `<div class="${"dropdown dropdown-end"}"><label tabindex="${"0"}" class="${"btn m-1"}" for>${$profile.profile ? `<img${add_attribute("src", $profile.profile.pfp, 0)} alt="${""}" class="${"rounded-full bg-base-300 h-8 w-8 mr-3"}">` : `<div class="${"rounded-full h-8 w-8 bg-gray-500 mr-3"}"></div>`}
      ${escape($profile.profile ? $profile.profile.username : `${$profile.metadata.address.substring(0, 5)}-${$profile.metadata.address.substring($profile.metadata.address.length - 5)}`)}</label>
    <ul tabindex="${"0"}" class="${"dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"}"><li><a href="${"/bookmarks"}"><svg class="${"w-6 h-6 mr-2"}" fill="${"none"}" stroke="${"currentColor"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"}"></path></svg>
          Bookmarks
        </a></li>
      <li><a href><svg class="${"w-6 h-6 mr-2"}" fill="${"none"}" stroke="${"currentColor"}" viewBox="${"0 0 24 24"}" xmlns="${"http://www.w3.org/2000/svg"}"><path stroke-linecap="${"round"}" stroke-linejoin="${"round"}" stroke-width="${"2"}" d="${"M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"}"></path></svg>
          Logout
        </a></li></ul></div>` : ``}`;
});
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigationState, $$unsubscribe_navigationState;
  let $profile, $$unsubscribe_profile;
  $$unsubscribe_navigationState = subscribe(navigationState, (value) => $navigationState = value);
  $$unsubscribe_profile = subscribe(profile, (value) => $profile = value);
  $$unsubscribe_navigationState();
  $$unsubscribe_profile();
  return `${validate_component(Notifications, "Notifications").$$render($$result, { item: TransactionNotification }, {}, {
    default: () => {
      return `<div class="${"flex flex-col h-screen justify-between bg-base-100 text-base-content"}"><div class="${"navbar shadow-lg bg-base text-base-content fixed w-full z-20 bg-base-100"}"><div class="${"px-2 mx-2 navbar-start"}"><span class="${"text-lg font-bold hidden lg:inline-block"}"><img src="${"/louper-logo.png"}" alt="${"Louper"}" class="${"h-12 inline"}">
          Louper - The Ethereum Diamond Inspector
        </span>
        <span class="${"text-lg font-bold lg:hidden"}"><img src="${"/louper-logo.png"}" alt="${"Louper"}" class="${"h-10 inline"}">
          Louper
        </span></div>
      <div class="${"hidden px-2 mx-2 navbar-center lg:flex"}"><div class="${"flex items-stretch"}"><a class="${"btn btn-ghost btn-sm rounded-btn"}" href="${"/"}">Home </a>
          <a class="${"btn btn-ghost btn-sm rounded-btn"}" href="${"https://eips.ethereum.org/EIPS/eip-2535"}" target="${"_blank"}">Diamond Standard (EIP-2535)
          </a>
          <a class="${"btn btn-ghost btn-sm rounded-btn"}" href="${"https://github.com/mark3labs/louper-v2"}" target="${"_blank"}">Github
          </a>
          <a class="${"btn btn-ghost btn-sm rounded-btn"}" href="${"https://gitcoin.co/grants/1988/louper-tool-for-inspecting-diamond-eip-2535-smart"}" target="${"_blank"}">Support Us On Gitcoin
          </a>
          <a class="${"btn btn-ghost btn-sm rounded-btn"}" href="${"https://discord.com/channels/730508054143172710/951483625092816976"}" target="${"_blank"}">Discord
          </a></div></div>
      <div class="${"navbar-end"}">${$profile !== null ? `${validate_component(ProfileDropdown, "ProfileDropdown").$$render($$result, {}, {}, {})}` : `${validate_component(ConnectToOrbis, "ConnectToOrbis").$$render($$result, {}, {}, {})}`}</div></div>
    <div class="${"container md:mx-auto mt-24 p-2"}"><main>${$navigationState === "loading" ? `${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}` : `${slots.default ? slots.default({}) : ``}`}</main></div>
    <footer class="${"items-center p-4 footer bg-base-300 text-base-content text-xs lg:text-base"}"><div class="${"items-center grid-flow-col"}"><p>Copyright \xA9 2022</p>
        <a href="${"https://mark3labs.com"}" target="${"_blank"}"><img src="${"/img/mark3labslogo.png"}" alt="${"Mark III Labs, LLC"}" class="${"h-6 invert"}"></a>
        <p>All right reserved</p></div>
      <div class="${"grid-flow-col gap-4 md:place-self-center md:justify-self-end"}"><a href="${"https://twitter.com/louper_dev"}" target="${"_blank"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"icon icon-tabler icon-tabler-brand-twitter"}" width="${"24"}" height="${"24"}" viewBox="${"0 0 24 24"}" stroke-width="${"2"}" stroke="${"currentColor"}" fill="${"none"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"><path stroke="${"none"}" d="${"M0 0h24v24H0z"}" fill="${"none"}"></path><path d="${"M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"}"></path></svg></a>

        <a href="${"https://github.com/mark3labs/louper"}" target="${"_blank"}"><svg xmlns="${"http://www.w3.org/2000/svg"}" class="${"icon icon-tabler icon-tabler-brand-github"}" width="${"24"}" height="${"24"}" viewBox="${"0 0 24 24"}" stroke-width="${"2"}" stroke="${"currentColor"}" fill="${"none"}" stroke-linecap="${"round"}" stroke-linejoin="${"round"}"><path stroke="${"none"}" d="${"M0 0h24v24H0z"}" fill="${"none"}"></path><path d="${"M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"}"></path></svg></a></div></footer></div>`;
    }
  })}`;
});
export {
  _layout as default
};
