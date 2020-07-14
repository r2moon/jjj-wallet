<template>
  <div class="p-5">
    <div class="flex flex-col items-center">
      <!-- <img :src="coinInfo.logo" class="w-30 h-30" /> -->
      <div class="text-theme-wallet-primary-text">
        <span class="text-5xl font-bold">{{ 0.0 }}&nbsp;</span>
        <span class="text-2xl">{{ coin.symbol }}</span>
      </div>
      <div>
        <span class="text-xl text-theme-info-text font-bold">$</span>
        <span class="text-2xl text-theme-text font-bold"
          >&nbsp;{{ 200.04 }}&nbsp;</span
        >
        <span class="text-xl text-theme-info-text">USD</span>
      </div>
      <div class="flex flex-row mt-5">
        <div class="float-right">
          <button
            @click="toggleSendOverlay"
            class="w-48 h-12 rounded-lg mr-2 gradient-button text-theme-text text-lg"
          >
            SEND
          </button>
        </div>
        <div class="float-left">
          <button
            @click="toggleReceiveOverlay"
            class="w-48 h-12 rounded-lg mr-2 gradient-button text-theme-text text-lg"
          >
            RECEIVE
          </button>
        </div>
      </div>
      <div class="mt-5 flex w-full max-w-full">
        <v-expansion-panels flat multiple>
          <v-expansion-panel>
            <v-expansion-panel-header
              class="bg-theme-wallet-info-background border-dashed border-b border-theme-seperator text-theme-info-header"
              >PRICE</v-expansion-panel-header
            >
            <v-expansion-panel-content
              class="bg-theme-wallet-info-background text-theme-info-text pt-3"
              >Binance Coint (BNB) is the native token of Binance Chain and the
              key base asset on the Binance decentralalized exchange (DEX). It
              is used to pay the transaction fees of assets that live on Binance
              Chain.</v-expansion-panel-content
            >
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
    <!-- <v-overlay :value="overlaySend" opacity="0.9">
      <WalletSend :coin="coinInfo" @send="send" @close="toggleSendOverlay" />
    </v-overlay> -->
    <v-overlay :value="overlayReceive" opacity="0.9">
      <!-- <WalletReceive
        :address="walletCore.address(coin)"
        :name="coin.name"
        @close="toggleReceiveOverlay"
      /> -->
    </v-overlay>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { WalletSend, WalletReceive } from "./overlay";
import { Coin, CoinInfo, SendInfo, IWallet } from "@/types";
import { CoinType } from "@/crypto-lib/types";
import { WalletCore } from "@/crypto-lib";

@Component({
  components: {
    WalletSend,
    WalletReceive,
  },
})
export default class Wallet extends Vue {
  overlayReceive: boolean = false;
  overlaySend: boolean = false;
  @Prop() coin!: CoinType;
  @Prop() walletCore!: WalletCore;

  send(sendInfo: SendInfo) {
    // this.wallet.send(sendInfo.recipient, sendInfo.amount);
  }

  toggleReceiveOverlay() {
    this.overlayReceive = !this.overlayReceive;
  }

  toggleSendOverlay() {
    this.overlaySend = !this.overlaySend;
  }

  // get wallet(): IWallet {
  //   return this.coin.wallet;
  // }

  // get coinInfo(): CoinInfo {
  //   return this.coin.info;
  // }
}
</script>

<style lang="scss">
.v-overlay__content {
  width: 100%;
  height: 100%;
}
</style>
