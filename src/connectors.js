import {
    InjectedConnector,
  } from '@web3-react/injected-connector';
  import { NetworkConnector } from '@web3-react/network-connector';
  // There are number of available networks which supports web3-react and we using 1337 here which is ganache while 1 is maqinnet ethereum
  const POLLING_INTERVAL = 12000;
  const RPC_URLS = {
    1: 'https://mainnet.infura.io/v3/873648daa3984caa9d6b28bb88d2771a',
    3: 'https://ropsten.infura.io/v3/873648daa3984caa9d6b28bb88d2771a',
    4: 'https://rinkeby.infura.io/v3/873648daa3984caa9d6b28bb88d2771a',
    5: 'https://goerli.infura.io/v3/873648daa3984caa9d6b28bb88d2771a',
    42: 'https://kovan.infura.io/v3/873648daa3984caa9d6b28bb88d2771a',
    56: 'https://bsc-dataseed1.defibit.io/',
    97: 'https://data-seed-prebsc-2-s1.binance.org:8545/',
    137: 'https://rpc-mainnet.maticvigil.com',
    1337:'HTTP://127.0.0.1:7545',
    80001: 'https://rpc-mumbai.maticvigil.com/',    
  };
  
  export const injected = new InjectedConnector({
    supportedChainIds: [1, 1337],
  });
  
  export const network = new NetworkConnector({
    urls: {
      1: RPC_URLS[1],
      3: RPC_URLS[3],
      4: RPC_URLS[4],
      5: RPC_URLS[5],
      42: RPC_URLS[42],
      137: RPC_URLS[137],
      1337: RPC_URLS[1337],
    },
    defaultChainId: 1337,
    pollingInterval: POLLING_INTERVAL,
  });