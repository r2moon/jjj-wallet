import * as bitcoinjs from "bitcoinjs-lib";
import { Network } from "bitcoinjs-lib/types";

import WalletNetwork from ".";

export const getNetwork = (): Network => {
  let network: Network = bitcoinjs.networks.bitcoin;
  if (WalletNetwork.isTestnet) {
    network = bitcoinjs.networks.testnet;
  }

  return network;
};
