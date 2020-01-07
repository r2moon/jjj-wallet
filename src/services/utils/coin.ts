import { Coin, CoinInfo, IWallet } from "@/types";
import { Bitcoin, Ethereum } from "@/services/coins";

const importCoins = (isTestnet?: boolean): Array<Coin> => {
  const ethereum: Coin = {
    info: {
      name: "Ethereum",
      ticker: "ETH",
      logo: require("@/assets/coins/ethereum/logo.png")
    },
    wallet: new Ethereum(
      "fe61bdcbaeb8a46f2b4aec50ba6e400efdd0b82cd3e3212259f9c96daa99e65e",
      isTestnet
    )
  };

  const bitcoin: Coin = {
    info: {
      name: "Bitcoin",
      ticker: "BTC",
      logo: require("@/assets/coins/ethereum/logo.png")
    },
    wallet: new Bitcoin(
      // null,
      "cVZi5icYGEUFJTUyEakSb3RLCEAocqeornzH5YzRVJ9mLfkjJtCf",
      isTestnet
    )
  };

  return [ethereum, bitcoin];
};

export { importCoins };
