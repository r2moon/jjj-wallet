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
  abstract _publicKey: string;
  abstract _privateKey: string;
  abstract _balance: BN | string | number | null;
  abstract _isTestnet: boolean = false;

  /**
   * send tokens to receiver
   * @param recipientId receiver address
   * @param amount amount
   */
  abstract async send(
    recipientId: string,
    amount: string | number
  ): Promise<string>;

  /**
   * resync network
   */
  abstract async resync(): Promise<void>;

  /**
   * get address
   */
  abstract get address(): string;

  /**
   * get balance in string
   */
  abstract get balance(): string;
}

export interface Coin {
  info: CoinInfo;
  wallet: IWallet;
}
