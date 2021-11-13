type Network = {
  rpcUrl: string
  explorerUrl: string
  explorerApiUrl: string
}

export const NETWORKS: Record<string, Network> = {
  mainnet: {
    rpcUrl: 'https://mainnet.infura.io/v3/%INFURA_API_KEY%',
    explorerUrl: 'https://etherscan.io',
    explorerApiUrl: 'https://api.etherscan.io/api'
  },
  ropsten: {
    rpcUrl: 'https://ropsten.infura.io/v3/%INFURA_API_KEY%',
    explorerUrl: 'https://ropsten.etherscan.io',
    explorerApiUrl: 'https://api-ropsten.etherscan.io/api'
  },
  kovan: {
    rpcUrl: 'https://kovan.infura.io/v3/%INFURA_API_KEY%',
    explorerUrl: 'https://kovan.etherscan.io',
    explorerApiUrl: 'https://api-kovan.etherscan.io/api'
  },
  rinkeby: {
    rpcUrl: 'https://rinkeby.infura.io/v3/%INFURA_API_KEY%',
    explorerUrl: 'https://rinkeby.etherscan.io',
    explorerApiUrl: 'https://api-rinkeby.etherscan.io/api'
  },
  goerli: {
    rpcUrl: 'https://goerli.infura.io/v3/%INFURA_API_KEY%',
    explorerUrl: 'https://goerli.etherscan.io',
    explorerApiUrl: 'https://api-goerli.etherscan.io/api'
  },
  xdai: {
    rpcUrl: 'https://rpc.xdaichain.com/',
    explorerUrl: 'https://blockscout.com/xdai/mainnet',
    explorerApiUrl: 'https://blockscout.com/poa/xdai/api'
  },
  polygon: {
    rpcUrl:
      'https://polished-restless-wind.matic.quiknode.pro/7d84ed2f3469de6a923c646c40778ab1022ab999/',
    explorerUrl: 'https://polygonscan.com',
    explorerApiUrl: 'https://api.polygonscan.com/api'
  },
  binance: {
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    explorerUrl: 'https://bscscan.com',
    explorerApiUrl: 'https://api.bscscan.com/api'
  }
}
