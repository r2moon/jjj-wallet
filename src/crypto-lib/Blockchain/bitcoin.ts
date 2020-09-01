// import { CoinType } from "./../Coin/types";
// import { generateAddress, getHumanBalance } from "../Address/bitcoin";
// import { getHistory } from "../Transaction/bitcoin";

// import { TxFilterOptions, TxInfo } from "../types";
// import { BitcoinTrezorTxResponse } from "../types/bitcoin";

// class Bitcoin {
//   private readonly _mnemonic: string;
//   public readonly address: string;

//   constructor(mnemonic: string) {
//     this._mnemonic = mnemonic;
//     this.address = generateAddress(mnemonic, CoinType.Bitcoin.derivationPath);
//   }

//   async getBalance(address?: string): Promise<string> {
//     return "0.0";
//     // return getHumanBalance(address ? address : this.address, this.isTestnet);
//   }

//   // async getTxHistory(
//   //   address?: string,
//   //   options?: TxFilterOptions
//   // ): Promise<TxInfo[]> {
//   //   const addressToGet = address ? address : this.address;

//   //   const txRes: BitcoinTrezorTxResponse[] = await getHistory(
//   //     addressToGet,
//   //     options,
//   //     this.isTestnet
//   //   );

//   //   const normalizedTxs: TxInfo[] = txRes.map((tx) => this._normalizeTx(tx));
//   //   return normalizedTxs;
//   // }

//   // async getOriginalTxHistory(
//   //   address?: string,
//   //   options?: TxFilterOptions
//   // ): Promise<BitcoinTrezorTxResponse[]> {
//   //   const addressToGet = address ? address : this.address;

//   //   return getHistory(addressToGet, options, this.isTestnet);
//   // }

//   // private _normalizeTx(tx: BitcoinTrezorTxResponse): TxInfo {
//   //   //TODO: calculate sender and receiver by current wallet address
//   //   let txInfo: TxInfo = {
//   //     id: tx.txid,
//   //     blockHash: tx.blockhash,
//   //     blockNumber: tx.blockheight,
//   //     confirmations: tx.confirmations,
//   //     timestamp: tx.time,
//   //     fee: tx.fees,
//   //   };
//   //   return txInfo;
//   // }
// }

// export default Bitcoin;
