import BN from "bn.js";

export interface CoinInfo {
  name: string;
  ticker: string;
  logo: string;
}

export interface SendInfo {
  recipient: string;
  amount: number | string;
}

export abstract class IWallet {
  abstract _address: string;
  abstract _privateKey: string;
  abstract _balance: BN = new BN(0);
  abstract _isTestnet: boolean = false;

  abstract async send(
    recipientId: string,
    amount: string | number
  ): Promise<string>;

  abstract async resync(): Promise<void>;

  abstract get address(): string;

  abstract get balance(): string;
}

export interface Coin {
  info: CoinInfo;
  wallet: IWallet;
}
