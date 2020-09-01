import { CoinType } from "..";
import { generateMnemonic } from "../Key";
import { UnsupportedCoinType } from "../Error";
import BitcoinAddress from "../Address/bitcoin";

const isTestnet = process.env.NODE_ENV === "development";

export default class WalletCore {
  private _seedPhrase: string;

  constructor(mnemonic?: string) {
    if (mnemonic) {
      this._seedPhrase = mnemonic;
    } else {
      this._seedPhrase = generateMnemonic();
    }
  }

  address(coinType: CoinType): string {
    if (coinType.isEqualWith(CoinType.Bitcoin)) {
      return BitcoinAddress.generateAddress(
        this._seedPhrase,
        coinType.derivationPath
      );
    }
    throw new UnsupportedCoinType();
  }

  async humanBalance(coinType: CoinType): Promise<string> {
    const address = this.address(coinType);
    if (coinType.isEqualWith(CoinType.Bitcoin)) {
      return BitcoinAddress.getHumanBalance(address, isTestnet);
    }
    throw new UnsupportedCoinType();
  }
  get coins(): CoinType[] {
    return CoinType.coins;
  }
}
