const NETWORKS = {
  mainnet: {
    title: "Ethereum",
    rpcUrl: "https://mainnet.infura.io/v3/%INFURA_API_KEY%",
    explorerUrl: "https://etherscan.io",
    explorerApiUrl: "https://api.etherscan.io/api",
    emoji: "\u{1F7E2}",
    chainId: "1"
  },
  ropsten: {
    title: "Ropsten Testnet",
    rpcUrl: "https://ropsten.infura.io/v3/%INFURA_API_KEY%",
    explorerUrl: "https://ropsten.etherscan.io",
    explorerApiUrl: "https://api-ropsten.etherscan.io/api",
    emoji: "\u{1F9EA}",
    chainId: "3"
  },
  kovan: {
    title: "Kovan Testnet",
    rpcUrl: "https://kovan.infura.io/v3/%INFURA_API_KEY%",
    explorerUrl: "https://kovan.etherscan.io",
    explorerApiUrl: "https://api-kovan.etherscan.io/api",
    emoji: "\u{1F9EA}",
    chainId: "42"
  },
  rinkeby: {
    title: "Rinkeby Testnet",
    rpcUrl: "https://rinkeby.infura.io/v3/%INFURA_API_KEY%",
    explorerUrl: "https://rinkeby.etherscan.io",
    explorerApiUrl: "https://api-rinkeby.etherscan.io/api",
    emoji: "\u{1F9EA}",
    chainId: "4"
  },
  goerli: {
    title: "Goerli Testnet",
    rpcUrl: "https://goerli.infura.io/v3/%INFURA_API_KEY%",
    explorerUrl: "https://goerli.etherscan.io",
    explorerApiUrl: "https://api-goerli.etherscan.io/api",
    emoji: "\u{1F9EA}",
    chainId: "5"
  },
  xdai: {
    title: "Gnosis (XDai)",
    rpcUrl: "https://rpc.gnosischain.com/",
    explorerUrl: "https://blockscout.com/xdai/mainnet",
    explorerApiUrl: "https://blockscout.com/poa/xdai/api",
    emoji: "\u{1F7E1}",
    chainId: "100"
  },
  polygon: {
    title: "Polygon",
    rpcUrl: "https://polygon-rpc.com/",
    explorerUrl: "https://polygonscan.com",
    explorerApiUrl: "https://api.polygonscan.com/api",
    emoji: "\u{1F7E3}",
    chainId: "137"
  },
  mumbai: {
    title: "Polygon Mumbai Testnet",
    rpcUrl: "https://matic-mumbai.chainstacklabs.com/",
    explorerUrl: "https://mumbai.polygonscan.com/",
    explorerApiUrl: "https://api-testnet.polygonscan.com/api",
    emoji: "\u{1F9EA}",
    chainId: "80001"
  },
  binance: {
    title: "Binance Smart Chain",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    explorerUrl: "https://bscscan.com",
    explorerApiUrl: "https://api.bscscan.com/api",
    emoji: "\u{1F7E0}",
    chainId: "56"
  },
  binance_testnet: {
    title: "Binance Smart Chain Testnet",
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    explorerUrl: "https://testnet.bscscan.com/",
    explorerApiUrl: "https://api.bscscan.com/api",
    emoji: "\u{1F7E0}",
    chainId: "97"
  },
  avalanche: {
    title: "Avalanche",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    explorerUrl: "https://snowtrace.io",
    explorerApiUrl: "https://api.snowtrace.io/api",
    emoji: "\u26F0\uFE0F",
    chainId: "43114"
  },
  fuji: {
    title: "Avalanche Fuji Testnet",
    rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
    explorerUrl: "https://testnet.snowtrace.io",
    explorerApiUrl: "https://api-testnet.snowtrace.io/api",
    emoji: "\u{1F9EA}",
    chainId: "43113"
  },
  optimism: {
    title: "Optimism",
    rpcUrl: "https://mainnet.optimism.io",
    explorerUrl: "https://optimistic.etherscan.io/",
    explorerApiUrl: "https://api-optimistic.etherscan.io/api",
    emoji: "\u{1F534}",
    chainId: "10"
  },
  optimism_kovan: {
    title: "Optimism Kovan Testnet",
    rpcUrl: "https://kovan.optimism.io",
    explorerUrl: "https://kovan-optimistic.etherscan.io/",
    explorerApiUrl: "https://api-kovan-optimistic.etherscan.io/api",
    emoji: "\u{1F9EA}",
    chainId: "69"
  },
  abritrum: {
    title: "Arbitrum",
    rpcUrl: "https://arb1.arbitrum.io/rpc",
    explorerUrl: "https://arbiscan.io/",
    explorerApiUrl: "https://api.arbiscan.io/api",
    emoji: "\u{1F535}",
    chainId: "42161"
  },
  arbutrum_testnet: {
    title: "Arbitrum Testnet",
    rpcUrl: "https://rinkeby.arbitrum.io/rpc",
    explorerUrl: "https://testnet.arbiscan.io/",
    explorerApiUrl: "https://api-testnet.arbiscan.io/api",
    emoji: "\u{1F9EA}",
    chainId: "421611"
  },
  moonriver: {
    title: "Moonriver",
    rpcUrl: "https://rpc.moonriver.moonbeam.network",
    explorerUrl: "https://moonriver.moonscan.io/",
    explorerApiUrl: "https://api-moonriver.moonscan.io/api",
    emoji: "\u{1F315}",
    chainId: "1285"
  },
  moonbeam: {
    title: "Moonbeam",
    rpcUrl: "https://rpc.api.moonbeam.network",
    explorerUrl: "https://moonbeam.moonscan.io/",
    explorerApiUrl: "https://api-moonbeam.moonscan.io/api",
    emoji: "\u{1F315}",
    chainId: "1284"
  },
  celo: {
    title: "Celo",
    rpcUrl: "https://forno.celo.org",
    explorerUrl: "https://explorer.celo.org/",
    explorerApiUrl: "https://explorer.celo.org/api",
    emoji: "\u{1F7E9}",
    chainId: "42220"
  },
  fantom: {
    title: "Fantom",
    rpcUrl: "https://rpc.ftm.tools/",
    explorerUrl: "https://ftmscan.com/",
    explorerApiUrl: "https://api.ftmscan.com/api",
    emoji: "\u{1F47B}",
    chainId: "250"
  },
  fantom_testnet: {
    title: "Fantom Testnet",
    rpcUrl: "https://rpc.testnet.fantom.network/",
    explorerUrl: "https://testnet.ftmscan.com/",
    explorerApiUrl: "https://api-testnet.ftmscan.com/api",
    emoji: "\u{1F9EA}",
    chainId: "4002"
  },
  boba: {
    title: "Boba",
    rpcUrl: "https://mainnet.boba.network",
    explorerUrl: "https://blockexplorer.boba.network",
    explorerApiUrl: "https://blockexplorer.boba.network/api",
    emoji: "\u{1F9CB}",
    chainId: "288"
  },
  okex: {
    title: "OKEx",
    rpcUrl: "https://exchainrpc.okex.org",
    explorerUrl: "https://www.oklink.com/en/okc",
    explorerApiUrl: "",
    emoji: "\u{1F535}",
    chainId: "66"
  },
  fuse: {
    title: "Fuse",
    rpcUrl: "https://rpc.fuse.io",
    explorerUrl: "https://explorer.fuse.io/",
    explorerApiUrl: "https://explorer.fuse.io/api",
    emoji: "\u{1F9E8}",
    chainId: "122"
  },
  harmony: {
    title: "Harmony",
    rpcUrl: "https://rpc.hermesdefi.io",
    explorerUrl: "https://explorer.harmony.one",
    explorerApiUrl: "",
    emoji: "1\uFE0F\u20E3",
    chainId: "1666600000"
  },
  aurora: {
    title: "Aurora",
    rpcUrl: "https://mainnet.aurora.dev",
    explorerUrl: "https://aurorascan.dev",
    explorerApiUrl: "https://api.aurorascan.dev/api",
    emoji: "\u{1F170}\uFE0F",
    chainId: "1313161554"
  },
  aurora_testnet: {
    title: "Aurora Testnet",
    rpcUrl: "https://betanet.aurora.dev",
    explorerUrl: "https://testnet.aurorascan.dev",
    explorerApiUrl: "https://api-testnet.aurorascan.dev/api",
    emoji: "\u{1F9EA}",
    chainId: "1313161556"
  },
  metis: {
    title: "METIS",
    rpcUrl: "https://andromeda.metis.io/?owner=1088",
    explorerUrl: "https://andromeda-explorer.metis.io",
    explorerApiUrl: "https://andromeda-explorer.metis.io/api",
    emoji: "\u{1F7E9}",
    chainId: "1088"
  }
};
export {
  NETWORKS as N
};
