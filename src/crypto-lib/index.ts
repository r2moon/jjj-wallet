import Key from "./Key";
import utils from "./utils";
// import Address from "./Address";
import WalletCore from "./Wallet";
/*
import { getHistory } from "./Transaction/bitcoin";
import { CoinType } from "./types";*/
/*
const test = async () => {
  const mnemonic =
    "high clog task open exchange course move wife advance glare near define";

  const address = Address.generate(mnemonic, CoinType.Bitcoin);
  console.log(address);

  const balance = await Address.getBalance(address, CoinType.Bitcoin);

  console.log(balance);

  const tx = await getHistory(address);
  console.log(tx);
};
*/
export * from "./types";

export { utils, Key };
export { WalletCore };
