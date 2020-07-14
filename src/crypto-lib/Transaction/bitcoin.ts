import axios from "axios";

import { validateAddress } from "../Address/bitcoin";
import { encodeQueryData } from "../utils";

import { getApi } from "../config";
import { TxFilterOptions, CoinType } from "../types";
import {
  BitcoinTrezorAddressInfo,
  BitcoinTrezorTxResponse,
} from "../types/bitcoin";

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

export default {
  getTxIds,
  getHistory,
};
