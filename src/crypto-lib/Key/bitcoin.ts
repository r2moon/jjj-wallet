import * as bitcoin from "bitcoinjs-lib";
import { CoinType } from "../types";
const bip39 = require("bip39");

export const getEcPair = async (
  seedPhrase: string,
  network?: bitcoin.networks.Network
) => {
  try {
    const seedBuffer = await bip39.mnemonicToSeed(seedPhrase);
    const node = bitcoin.bip32.fromSeed(seedBuffer, network);
    const child = node.derivePath(CoinType.Bitcoin.derivationPath);
    const wif = child.toWIF();
    const ecPair = bitcoin.ECPair.fromWIF(wif, network);

    return ecPair;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default {
  getEcPair
};
