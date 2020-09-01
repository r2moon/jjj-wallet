import axios from "axios";
import * as bitcoin from 'bitcoinjs-lib';

import { validateAddress } from "../Address/bitcoin";
import { encodeQueryData, toSatoshi } from "../utils";

import { getApi } from "../config";
import { TxFilterOptions, CoinType } from "../types";
import {
  BitcoinTrezorAddressInfo,
  BitcoinTrezorTxResponse,
} from "../types/bitcoin";
import { getEcPair } from '../Key/bitcoin';

export const getTxIds = async (
  address: string,
  options?: TxFilterOptions,
  isTestnet?: boolean
): Promise<string[]> => {
  validateAddress(address);

  const query = options ? "?" + encodeQueryData(options) : "";

  const api = getApi(CoinType.Bitcoin, isTestnet);

  const res = await axios.get(api + "/address/" + address + query);
  const addressInfo = res.data as BitcoinTrezorAddressInfo;

  return addressInfo.transactions;
};

export const getHistory = async (
  address: string,
  options?: TxFilterOptions,
  isTestnet?: boolean
): Promise<BitcoinTrezorTxResponse[]> => {
  validateAddress(address);

  const txIds = await getTxIds(address, options, isTestnet);

  const api = getApi(CoinType.Bitcoin, isTestnet);

  const promiseList = txIds.map((txId) => axios.get(api + "/tx/" + txId));

  const txsRes = await Promise.all(promiseList);
  const txRedableRes = txsRes.map(
    (txRes) => txRes.data as BitcoinTrezorTxResponse
  );
  return txRedableRes;
};

export const send = async (
  seedPhrase: string,
  recipient: string,
  amount: string,
  isTestnet?: boolean
): Promise<string> => {
  validateAddress(recipient);

  try {
    const network = isTestnet
      ? bitcoin.networks.testnet
      : bitcoin.networks.bitcoin;

    const ecpair = await getEcPair(seedPhrase, network);

    console.log(Number(amount))
    const amountSatoshi = toSatoshi(Number(amount));
    console.log(amountSatoshi)
    const fee = toSatoshi(0.0005);
    const satoshiWithoutFee = amountSatoshi - fee;
    const {address} = bitcoin.payments.p2pkh({
      pubkey: ecpair.publicKey,
      network,
    });

    console.log(address)
    const psbt = new bitcoin.Psbt({
      network,
    });
    let addedSatoshi = 0;

    const api = getApi(CoinType.Bitcoin, isTestnet);

    const res = await axios.get(api + '/utxo/' + address);

    const utxoTxs = res.data;
    for (
      let i = 0;
      addedSatoshi < amountSatoshi && i < utxoTxs.length;
      i += 1
    ) {
      const txRef = utxoTxs[i];
      const txRes = await axios.get(api + '/tx/' + txRef.txid);
      psbt.addInput({
        hash: txRef.txid,
        index: txRef.vout,
        nonWitnessUtxo: Buffer.from(txRes.data.hex, 'hex'),
      });
      addedSatoshi += txRef.satoshis;
    }
    // add tx output
    psbt.addOutput({
      address: recipient,
      value: satoshiWithoutFee,
    });
    if (addedSatoshi > amountSatoshi) {
      psbt.addOutput({
        address: address!,
        value: addedSatoshi - amountSatoshi,
      });
    }
    const txHex = psbt
      .signAllInputs(ecpair)
      .finalizeAllInputs()
      .extractTransaction()
      .toHex();

    const response = await axios.get(api + '/sendtx/' + txHex);
    const txRes = response.data;
    return txRes.result;
  } catch (error) {
    console.error('send bitcoin error: ', error);
    throw new Error('Send bitcoin failure');
  }
};

export default {
  getTxIds,
  getHistory,
  send
};
