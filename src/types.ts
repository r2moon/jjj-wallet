export interface Coin {
  name: string;
  ticker: string;
}

export interface SendInfo {
  recipient: string;
  amount: number | string;
}
