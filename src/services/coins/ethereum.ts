import BN from 'bn.js';
import Web3 from 'web3';

const provider = "https://ropsten.infura.io/v3/3549ffbbb03c4db980fc105360617370";

export default class Ethereum {
  private _address: string = ""
  private _privateKey: string = ""
  private _balance: BN = new BN(-1)
  private _nonce: number = 0
  private web3: Web3

  /**
   * Create new key if privateKey is null otherwise import wallet from privateKey
   * 
   * @param privateKey {string} optional
   */
  constructor(privateKey?: string) {
    this.web3 = new Web3(new Web3.providers.HttpProvider(provider));
    
    if (privateKey) {
      if (!privateKey.startsWith("0x")) {
        privateKey = "0x" + privateKey;
      }
      const account = this.web3.eth.accounts.privateKeyToAccount(privateKey)
      this.privateKey = account.privateKey;
      this.address = account.address;
    } else {
      const account = this.web3.eth.accounts.create();
      this.privateKey = account.privateKey;
      this.address = account.address;
    }

    this.resync();
  }

  async send(recipientId: string, amount: string | number) {
    const amountWei = new BN(this.web3.utils.toWei(amount.toString()));

    if (this._balance.cmp(amountWei) >= 0) {
      // enough balance
      var rawTx = {
        nonce: this._nonce,
        from: this.address,
        to: recipientId,
        value: amountWei.toString(),
        gasPrice: '0x3b9aca00',
        gasLimit: '0x21000',
        data: '',
      }

      // this.web3.eth.estimateGas(rawTx)

      try {
        const signedTx = await this.web3.eth.accounts.signTransaction(rawTx, this.privateKey);
        console.log(signedTx)
        if (signedTx.rawTransaction) {
          const txReceipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
          console.log("==Receipt==");
          console.log(txReceipt);
          this._nonce += 1;
        } else {
          console.error("Invalid Transaction - rawTx is empty");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("No enough balance");
      return null;
    }
  }

  async _fetchTransactionCount() {
    this._nonce = await this.web3.eth.getTransactionCount(this.address, 'pending')
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

  // getter and setters
  get address() : string {
    return this._address;
  }
  set address(value: string) {
    this._address = value;
  }

  get privateKey() : string {
    return this._privateKey;
  }
  set privateKey(value: string) {
    this._privateKey = value;
  }
  get balance(): string {
    if (this._balance.cmp(new BN(0)) === -1) {
      // this._fetchBalance();
    }
    const humanBalance = this.web3.utils.fromWei(this._balance);
    return humanBalance;
  }
}