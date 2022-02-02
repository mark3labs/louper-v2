type Network = {
  title: string,
  rpcUrl: string
  explorerUrl: string
  explorerApiUrl: string
  emoji: string
  chainId: string
}

export const NETWORKS: Record<string, Network> = {
  mainnet: {
    title: 'Ethereum',
    rpcUrl: 'https://mainnet.infura.io/v3/%INFURA_API_KEY%',
    explorerUrl: 'https://etherscan.io',
    explorerApiUrl: 'https://api.etherscan.io/api',
    emoji: '🟢',
    chainId: '1'
  },
  ropsten: {
    title: 'Ropsten Testnet',
    rpcUrl: 'https://ropsten.infura.io/v3/%INFURA_API_KEY%',
    explorerUrl: 'https://ropsten.etherscan.io',
    explorerApiUrl: 'https://api-ropsten.etherscan.io/api',
    emoji: '🧪',
    chainId: '3'
  },
  kovan: {
    title: 'Kovan Testnet',
    rpcUrl: 'https://kovan.infura.io/v3/%INFURA_API_KEY%',
    explorerUrl: 'https://kovan.etherscan.io',
    explorerApiUrl: 'https://api-kovan.etherscan.io/api',
    emoji: '🧪',
    chainId: '42'
  },
  rinkeby: {
    title: 'Rinkeby Testnet',
    rpcUrl: 'https://rinkeby.infura.io/v3/%INFURA_API_KEY%',
    explorerUrl: 'https://rinkeby.etherscan.io',
    explorerApiUrl: 'https://api-rinkeby.etherscan.io/api',
    emoji: '🧪',
    chainId: '4'
  },
  goerli: {
    title: 'Goerli Testnet',
    rpcUrl: 'https://goerli.infura.io/v3/%INFURA_API_KEY%',
    explorerUrl: 'https://goerli.etherscan.io',
    explorerApiUrl: 'https://api-goerli.etherscan.io/api',
    emoji: '🧪',
    chainId: '420'
  },
  xdai: {
    title: 'Gnosis (XDai)',
    rpcUrl: 'https://rpc.xdaichain.com/',
    explorerUrl: 'https://blockscout.com/xdai/mainnet',
    explorerApiUrl: 'https://blockscout.com/poa/xdai/api',
    emoji: '🟡',
    chainId: '100'
  },
  polygon: {
    title: 'Polygon',
    rpcUrl:
      'https://polished-restless-wind.matic.quiknode.pro/7d84ed2f3469de6a923c646c40778ab1022ab999/',
    explorerUrl: 'https://polygonscan.com',
    explorerApiUrl: 'https://api.polygonscan.com/api',
    emoji: '🔵',
    chainId: '137'
  },
  mumbai: {
    title: 'Polygon Mumbai Testnet',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/',
    explorerUrl: 'https://mumbai.polygonscan.com/',
    explorerApiUrl: 'https://api-testnet.polygonscan.com/api',
    emoji: '🧪',
    chainId: '80001'
  },
  binance: {
    title: 'Binance Smart Chain',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    explorerUrl: 'https://bscscan.com',
    explorerApiUrl: 'https://api.bscscan.com/api',
    emoji: '🟠',
    chainId: '56'
  },
  avalanche: {
    title: 'Avalanche',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    explorerUrl: 'https://snowtrace.io',
    explorerApiUrl: 'https://snowtrace.io/api',
    emoji: '⛰️',
    chainId: '43114'
  },
  fuji: {
    title: 'Avalanche Fuji Testnet',
    rpcUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
    explorerUrl: 'https://testnet.snowtrace.io',
    explorerApiUrl: 'https://testnet.snowtrace.io',
    emoji: '🧪',
    chainId: '43113'
  },
}
