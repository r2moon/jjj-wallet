import BN from "bn.js";
import Web3 from "web3";

import { IWallet } from "@/types";

const provider = {
  testnet: "https://ropsten.infura.io/v3/3549ffbbb03c4db980fc105360617370",
  mainnet: "https://mainnet.infura.io/v3/3549ffbbb03c4db980fc105360617370"
};

export default class Ethereum extends IWallet {
  _address: string = "";
  _publicKey: string = "";
  _privateKey: string = "";
  _balance: BN | null= null;
  _isTestnet: boolean = false;
  private _nonce: number = 0;
  private web3: Web3;

  /**
   * Create new key if privateKey is null otherwise import wallet from privateKey
   *
   * @param privateKey {string} optional
   */
  constructor(privateKey?: string, isTestnet?: boolean) {
    super();

    if (isTestnet === true) {
      this._isTestnet = true;
    } else {
      this._isTestnet = false;
    }

    if (this._isTestnet) {
      this.web3 = new Web3(new Web3.providers.HttpProvider(provider.testnet));
    } else {
      this.web3 = new Web3(new Web3.providers.HttpProvider(provider.mainnet));
    }

    if (privateKey) {
      if (!privateKey.startsWith("0x")) {
        privateKey = "0x" + privateKey;
      }
      const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
      this._privateKey = account.privateKey;
      this._address = account.address;
    } else {
      const account = this.web3.eth.accounts.create();
      this._privateKey = account.privateKey;
      this._address = account.address;
    }

    this.resync();
  }

  async send(recipientId: string, amount: string | number): Promise<string> {
    const amountWei = new BN(this.web3.utils.toWei(amount.toString()));

    if (this._balance !== null && this._balance.cmp(amountWei) >= 0) {
      // enough balance
      var rawTx = {
        nonce: this._nonce,
        from: this.address,
        to: recipientId,
        value: amountWei.toString(),
        gasPrice: "0x3b9aca00",
        gasLimit: "0x21000",
        data: ""
      };

      // this.web3.eth.estimateGas(rawTx)
      try {
        const signedTx = await this.web3.eth.accounts.signTransaction(
          rawTx,
          this._privateKey
        );
        console.log(signedTx);
        if (signedTx.rawTransaction) {
          const txReceipt = await this.web3.eth.sendSignedTransaction(
            signedTx.rawTransaction
          );
          console.log("==Receipt==");
          console.log(txReceipt);
          this._nonce += 1;
          return txReceipt.transactionHash;
        } else {
          console.error("Invalid Transaction - rawTx is empty");
          throw new Error("Invalid Transaction - rawTx is empty");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("No enough balance");
      throw new Error("No enough balance");
    }
    return "";
  }

  async _fetchTransactionCount() {
    this._nonce = await this.web3.eth.getTransactionCount(
      this.address,
      "pending"
    );
  }

  async resync() {
    await this._fetchTransactionCount();
    this._fetchBalance();
  }

  private async _fetchBalance() {
    try {
      const balance = await this.web3.eth.getBalance(this.address);
      this._balance = new BN(balance);
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
    const humanBalance = this.web3.utils.fromWei(this._balance);
    return humanBalance;
  }
}
