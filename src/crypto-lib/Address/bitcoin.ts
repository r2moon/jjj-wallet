import * as bitcoinjs from "bitcoinjs-lib";
import axios from "axios";

import { getNetwork } from "../Network/bitcoin";

import Key from "../Key";
import { getApi } from "../config";

import { BitcoinTrezorAddressInfo } from "../types/bitcoin";
import { InvalidAddress } from "../Error";
import { CoinType } from "../types";

import * as bip39 from "bip39";

export const generateAddress = (
  seed: string,
  derivationPath: string
): string => {
  Key.validateMnemonic(seed);

  const network = getNetwork();

  const seedBuffer = bip39.mnemonicToSeedSync(seed);
  const node = bitcoinjs.bip32.fromSeed(seedBuffer, network);
  const child = node.derivePath(derivationPath);
  const wif = child.toWIF();
  const keyPair = bitcoinjs.ECPair.fromWIF(wif, network);

  const address = bitcoinjs.payments.p2pkh({
    pubkey: keyPair.publicKey,
    network: network,
  }).address!;

  return address;
};

export const validateAddress = (address: string) => {
  const network = getNetwork();

  try {
    bitcoinjs.address.toOutputScript(address, network);
  } catch (err) {
    throw new InvalidAddress();
  }
};

export const getHumanBalance = async (
  address: string,
  isTestnet?: boolean
): Promise<string> => {
  validateAddress(address);

  const api = getApi(CoinType.Bitcoin, isTestnet);

  try {
    const res = await axios.get(api + "/address/" + address);
    const addressInfo = res.data as BitcoinTrezorAddressInfo;
    return addressInfo.balance;
  } catch (error) {
    return "0.0";
  }
};

export default {
  generateAddress,
  validateAddress,
  getHumanBalance,
};
