import { CoinInfo } from "..";
export enum BlockchainType {
  Bitcoin,
  Ethereum,
}

const testnetCoins: CoinInfo[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 8,
    derivationPath: "m/84'/0'/0'/0/0",
    blockchain: BlockchainType.Bitcoin,
    info: {
      api: "https://tbtc1.trezor.io/api",
    },
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    derivationPath: "m/44'/60'/0'/0/0",
    blockchain: BlockchainType.Ethereum,
    info: {
      chainId: 3,
      rpc: "https://ropsten.infura.io/v3/e1c842025e964ba98347121c45861f82",
    },
  },
];

const mainnetCoins: CoinInfo[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    decimals: 8,
    derivationPath: "m/84'/0'/0'/0/0",
    blockchain: BlockchainType.Bitcoin,
    info: {
      api: "https://btc-bitcore1.trezor.io/api",
    },
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    derivationPath: "m/44'/60'/0'/0/0",
    blockchain: BlockchainType.Ethereum,
    info: {
      chainId: 3,
      rpc: "https://mainnet.infura.io/v3/e1c842025e964ba98347121c45861f82",
    },
  },
];

export const getCoinInfo = (isTestnet?: boolean): CoinInfo[] => {
  if (isTestnet === true) {
    return testnetCoins;
  }
  return mainnetCoins;
};

export const getCoinInfoById = (
  id: string,
  isTestnet?: boolean
): CoinInfo | undefined => {
  const coinInfo = getCoinInfo(isTestnet).find((item) => item.id === id);
  return coinInfo;
};
export default mainnetCoins;
