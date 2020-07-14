import { getCoinInfoById } from "./coins";
import { BlockchainType } from "..";

export type CoinInfo = {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
  derivationPath: string;
  blockchain: BlockchainType;
  info: {
    [key: string]: number | string | object;
  };
};

const isTestnet = process.env.NODE_ENV === "development";

export class CoinType {
  static Bitcoin = new CoinType("bitcoin");
  static coins: [CoinType] = [CoinType.Bitcoin];
  // static Ethereum = new CoinType("ethereum");

  private _coinInfo: CoinInfo;

  constructor(coinId: string) {
    const coinInfo = getCoinInfoById(coinId, isTestnet);
    if (!coinInfo) {
      throw new Error(`Coin ${coinId} does not exists`);
    }
    this._coinInfo = coinInfo;
  }

  isEqualWith(coin: CoinType) {
    return this.id === coin.id;
  }

  get id(): string {
    return this._coinInfo.id;
  }

  get name(): string {
    return this._coinInfo.name;
  }

  get symbol(): string {
    return this._coinInfo.symbol;
  }
  get decimals(): number {
    return this._coinInfo.decimals;
  }

  get derivationPath(): string {
    return this._coinInfo.derivationPath;
  }

  get blockchain(): BlockchainType {
    return this._coinInfo.blockchain;
  }
}
