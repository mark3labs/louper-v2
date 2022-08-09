export const manifest = {
	appDir: "_app",
	assets: new Set(["favicon.ico","img/aavegotchi-mainnet-logo.png","img/aavegotchi-polygon-logo.jpg","img/barnbridge-logo.jpg","img/beanstalk-logo.png","img/escabro-logo.png","img/gelato-logo.png","img/lifi.png","img/lifi.png:Zone.Identifier","img/mark3labslogo.png","img/piedao-logo.png","img/quicknode-logo.svg","louper-logo-transparent.png","louper-logo.png","thumbnail.png"]),
	mimeTypes: {".ico":"image/vnd.microsoft.icon",".png":"image/png",".jpg":"image/jpeg",".svg":"image/svg+xml"},
	_: {
		entry: {"file":"_app/immutable/start-78a4acb4.js","imports":["_app/immutable/start-78a4acb4.js","_app/immutable/chunks/index-60e91ee9.js","_app/immutable/chunks/preload-helper-7005f741.js","_app/immutable/chunks/singletons-eca981c1.js"],"stylesheets":[]},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js'),
			() => import('../output/server/nodes/4.js'),
			() => import('../output/server/nodes/2.js'),
			() => import('../output/server/nodes/5.js'),
			() => import('../output/server/nodes/3.js')
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'page',
				id: "bookmarks",
				pattern: /^\/bookmarks\/?$/,
				names: [],
				types: [],
				path: "/bookmarks",
				shadow: null,
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				id: "sponsor",
				pattern: /^\/sponsor\/?$/,
				names: [],
				types: [],
				path: "/sponsor",
				shadow: null,
				a: [0,4],
				b: [1]
			},
			{
				type: 'endpoint',
				id: "api/stats",
				pattern: /^\/api\/stats\/?$/,
				names: [],
				types: [],
				load: () => import('../output/server/entries/endpoints/api/stats.ts.js')
			},
			{
				type: 'endpoint',
				id: "api/readContract",
				pattern: /^\/api\/readContract\/?$/,
				names: [],
				types: [],
				load: () => import('../output/server/entries/endpoints/api/readContract.ts.js')
			},
			{
				type: 'endpoint',
				id: "api/leaderboard",
				pattern: /^\/api\/leaderboard\/?$/,
				names: [],
				types: [],
				load: () => import('../output/server/entries/endpoints/api/leaderboard.ts.js')
			},
			{
				type: 'endpoint',
				id: "api/facets",
				pattern: /^\/api\/facets\/?$/,
				names: [],
				types: [],
				load: () => import('../output/server/entries/endpoints/api/facets.ts.js')
			},
			{
				type: 'endpoint',
				id: "api/events",
				pattern: /^\/api\/events\/?$/,
				names: [],
				types: [],
				load: () => import('../output/server/entries/endpoints/api/events.ts.js')
			},
			{
				type: 'endpoint',
				id: "api/contract",
				pattern: /^\/api\/contract\/?$/,
				names: [],
				types: [],
				load: () => import('../output/server/entries/endpoints/api/contract.ts.js')
			},
			{
				type: 'page',
				id: "diamond/[address]",
				pattern: /^\/diamond\/([^/]+?)\/?$/,
				names: ["address"],
				types: [null],
				path: null,
				shadow: null,
				a: [0,5],
				b: [1]
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
