import { Coin, CoinInfo, IWallet } from "@/types";
import { Ethereum } from "@/services/coins";

const importCoins = (isTestnet?: boolean): [Coin] => {
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

  return [ethereum];
};

export { importCoins };
