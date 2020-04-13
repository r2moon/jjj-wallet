import { Coin, CoinInfo, IWallet } from "@/types";
import { Bitcoin, Ethereum } from "@/services/coins";

import { Key } from "crypto-lib";

const importCoins = (isTestnet?: boolean): Array<Coin> => {
  const mnemonic =
    "high clog task open exchange course move wife advance glare near define"; //Key.generateMnemonic();
  console.log(mnemonic);

  // const ethereum: Coin = {
  //   info: {
  //     name: "Ethereum",
  //     ticker: "ETH",
  //     logo: require("@/assets/coins/ethereum/logo.png")
  //   },
  //   wallet: new Ethereum(
  //     "fe61bdcbaeb8a46f2b4aec50ba6e400efdd0b82cd3e3212259f9c96daa99e65e",
  //     isTestnet
  //   )
  // };

  const bitcoin: Coin = {
    info: {
      name: "Bitcoin",
      ticker: "BTC",
      logo: require("@/assets/coins/bitcoin/logo.png")
    },
    wallet: new Bitcoin(
      mnemonic
      // "cVZi5icYGEUFJTUyEakSb3RLCEAocqeornzH5YzRVJ9mLfkjJtCf",
      // isTestnet
    )
  };

  return [bitcoin];
};

export { importCoins };
