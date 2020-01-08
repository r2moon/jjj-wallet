import * as bitcoin from "bitcoinjs-lib";
import {
  ECPairInterface,
  Network,
  TransactionBuilder
} from "bitcoinjs-lib/types";
import axios, { AxiosInstance } from "axios";

import { IWallet } from "@/types";

const SATOSHI = 100000000;
const toSatoshi = (value: number) => {
  return Math.round(value * SATOSHI);
};

const fromSatoshi = (value: number) => {
  return value / SATOSHI;
}

/**
 * Response Type of Blockcypher api
 * https://www.blockcypher.com/dev/bitcoin/#address
 */
interface TxRef {
  tx_hash: string;
  block_height: number;
  tx_input_n: number;
  tx_output_n: number;
  value: number;
  ref_balance?: number;
  spent: boolean;
  confirmations: number;
  confirmed?: Date;
  double_spend: boolean;
}

interface AddrInfo {
  address?: string;
  total_received: number;
  total_sent: number;
  balance: number;
  unconfirmed_balance: number;
  final_balance: number;
  txrefs?: Array<TxRef>;
  unconfirmed_txrefs?: Array<TxRef>;
  hasMore: boolean;
}

interface TX {
  block_height: number;
  hash: string;
  addresses: Array<string>;
  total: number;
  fees: number;
  size: number;
  received: Date;
  double_spend: boolean;
  vin_sz: number;
  vout_sz: number;
  confirmations: number;
  confirmed?: Date;
}

export default class Bitcoin extends IWallet {
  private _keyPair: ECPairInterface;
  private _addressInfo?: AddrInfo;
  private _isTestnet: boolean = false;
  private _network: Network = bitcoin.networks.bitcoin;
  private _axiosInstance: AxiosInstance;

  /**
   * Create new key if privateKey is null otherwise import wallet from privateKey
   *
   * @param privateKey {string} optional
   */
  constructor(privateKey?: string | null, isTestnet?: boolean) {
    super();

    if (isTestnet === true) {
      this._isTestnet = true;
      this._network = bitcoin.networks.testnet;

      this._axiosInstance = axios.create({
        baseURL: "https://api.blockcypher.com/v1/btc/test3/",
        timeout: 2000
      });
    } else {
      this._isTestnet = false;
      this._network = bitcoin.networks.bitcoin;

      this._axiosInstance = axios.create({
        baseURL: "https://api.blockcypher.com/v1/btc/main",
        timeout: 2000
      });
    }

    if (privateKey) {
      this._keyPair = bitcoin.ECPair.fromWIF(privateKey, this._network);
    } else {
      this._keyPair = bitcoin.ECPair.makeRandom({
        network: this._network
      });
    }

    this.resync();
  }

  async send(recipientId: string, amount: string | number): Promise<string> {
    const parsedAmount: number = Number(amount);
    if (Number.isNaN(parsedAmount)) {
      throw new Error("Invalid amount: " + amount);
    }
    
    const satoshiToSend = toSatoshi(parsedAmount);

    const fee = toSatoshi(0.000005);

    if (this._addressInfo !== undefined && this._addressInfo.final_balance > satoshiToSend + fee && this._addressInfo.txrefs !== undefined) {
      // enough balance
      var txBuilder: TransactionBuilder = new bitcoin.TransactionBuilder(this._network);
      var addedSatoshi = 0;

      // add tx inputs
      for (let i = 0; addedSatoshi < satoshiToSend && i < this._addressInfo.txrefs.length; i += 1) {
        const txRef = this._addressInfo.txrefs[i];
        txBuilder.addInput(txRef.tx_hash, i);
        addedSatoshi += txRef.value;
      }

      // add tx output
      txBuilder.addOutput(recipientId, satoshiToSend);
      if (addedSatoshi > satoshiToSend) {
        txBuilder.addOutput(this.address, addedSatoshi- satoshiToSend - fee);
      }

      txBuilder.sign(0, this._keyPair);
      const txHex = txBuilder.build().toHex();
      console.log(txHex);

      try {
        const response = await this._axiosInstance.post("/txs/push", {
          tx: txHex
        });
        const tx: TX = response.data;
        return tx.hash;
      } catch (error) {
        console.error("send bitcoin error: ", error);
        throw error;
      }
    } else {
      console.log("No enough balance");
      throw new Error("No enough balance");
    }
  }

  async resync() {
    this._fetchAddressInfo();
  }

  private async _fetchAddressInfo() {
    const response = await this._axiosInstance.get(`/addrs/${this.address}`);
    this._addressInfo = response.data;
  }

  // getters
  public get address(): string {
    const address = bitcoin.payments.p2pkh({
      pubkey: this._keyPair.publicKey,
      network: this._network
    }).address!;

    return address;
  }

  public get balance(): number {
    if (this._addressInfo === undefined) {
      return 0;
    }
    return fromSatoshi(this._addressInfo.final_balance);
  }
}
