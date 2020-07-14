export type TxFilterOptions = {
  page?: number; // default = 1
  pageSize?: number; // default = 1000
};

export type TxInfo = {
  id: string;
  blockHash?: string;
  blockNumber?: number;
  confirmations: number;
  from?: string;
  to?: string;
  amount?: string;
  fee?: string;
  timestamp?: number;
  [key: string]: any;
};

export * from "../Coin/types";
export * from "../Blockchain/types";
