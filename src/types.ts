import BN from "bn.js";

export interface CoinInfo {
  name: string;
  ticker: string;
  logo: string;
}

export interface SendInfo {
  recipient: string;
  amount: string;
}

export abstract class IWallet {
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
  abstract get balance(): string | number;
}

export interface Coin {
  info: CoinInfo;
  wallet: IWallet;
}
