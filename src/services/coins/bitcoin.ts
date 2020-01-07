import * as bitcoin from "bitcoinjs-lib";
import { ECPairInterface, Network } from "bitcoinjs-lib/types";
import axios, { AxiosInstance } from "axios";

import { IWallet } from "@/types";

export default class Bitcoin extends IWallet {
  _address: string = "";
  _publicKey: string = "";
  _privateKey: string = "";
  _balance: number = 0;
  _isTestnet: boolean = false;
  _network: Network = bitcoin.networks.bitcoin;
  _axiosInstance: AxiosInstance;

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
        baseURL: "https://testnet.blockexplorer.com/api/",
        timeout: 2000
      })
    } else {
      this._isTestnet = false;
      this._network = bitcoin.networks.bitcoin;

      this._axiosInstance = axios.create({
        baseURL: "https://blockexplorer.com/api/",
        timeout: 2000
      })
    }

    var keyPair: ECPairInterface;

    if (privateKey) {
      keyPair = bitcoin.ECPair.fromWIF(privateKey, this._network);
    } else {
      keyPair = bitcoin.ECPair.makeRandom({
        network: this._network
      });
    }

    this._privateKey = keyPair.toWIF();
    this._publicKey = keyPair.publicKey.toString("hex");
    this._address = bitcoin.payments.p2pkh({
      pubkey: keyPair.publicKey,
      network: this._network
    }).address!;

    console.log(this._address);
    this.resync();
  }

  async send(recipientId: string, amount: string | number): Promise<string> {
    // const amountWei = new BN(this.web3.utils.toWei(amount.toString()));

    // if (this._balance.cmp(amountWei) >= 0) {
    //   // enough balance
    //   var rawTx = {
    //     nonce: this._nonce,
    //     from: this.address,
    //     to: recipientId,
    //     value: amountWei.toString(),
    //     gasPrice: "0x3b9aca00",
    //     gasLimit: "0x21000",
    //     data: ""
    //   };

    //   // this.web3.eth.estimateGas(rawTx)
    //   try {
    //     const signedTx = await this.web3.eth.accounts.signTransaction(
    //       rawTx,
    //       this._privateKey
    //     );
    //     console.log(signedTx);
    //     if (signedTx.rawTransaction) {
    //       const txReceipt = await this.web3.eth.sendSignedTransaction(
    //         signedTx.rawTransaction
    //       );
    //       console.log("==Receipt==");
    //       console.log(txReceipt);
    //       this._nonce += 1;
    //       return txReceipt.transactionHash;
    //     } else {
    //       console.error("Invalid Transaction - rawTx is empty");
    //       throw new Error("Invalid Transaction - rawTx is empty");
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // } else {
    //   console.log("No enough balance");
    //   throw new Error("No enough balance");
    // }
    // return "";
  }

  async resync() {
    this._fetchBalance();
  }

  private async _fetchBalance() {
    try {
      const response = await this._axiosInstance.get(`/addr/${this._address}`);
      this._balance = response.data["balance"];
    } catch (error) {
      console.error(error);
    }
  }

  // getters
  public get address(): string {
    return this._address;
  }

  public get balance(): string {
    if (this._balance === null) {
      return "0";
    }
    return String(this._balance);
  }
}
