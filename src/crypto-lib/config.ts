import { CoinType } from "./types";

import { UnsupportedCoinType } from "./Error";

const networks = {
  bitcoin: {
    api: {
      mainnet: "https://btc-bitcore1.trezor.io/api",
      testnet: "https://tbtc1.trezor.io/api",
    },
  },
};

export const getApi = (coin: CoinType, isTestnet?: boolean): string => {
  if (coin === CoinType.Bitcoin) {
    return isTestnet
      ? networks.bitcoin.api.testnet
      : networks.bitcoin.api.mainnet;
  } else {
    throw new UnsupportedCoinType();
  }
};
