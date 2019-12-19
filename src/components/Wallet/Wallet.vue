<template>
  <div class="Wallet">
    <div class="d-flex flex-column align-center">
      <div>{{ wallet.balance }} {{ coin.ticker }}</div>
      <div class="d-flex flex-row">
        <div class="float-right">
          <v-btn outlined @click="toggleSendOverlay">SEND</v-btn>
        </div>
        <div class="float-left">
          <v-btn outlined @click="toggleReceiveOverlay">RECEIVE</v-btn>
        </div>
      </div>
    </div>
    <v-overlay :value="overlaySend">
      <WalletSend :coin="coin" @send="send" @close="toggleSendOverlay" />
    </v-overlay>
    <v-overlay :value="overlayReceive">
      <WalletReceive
        :address="wallet.address"
        :name="coin.name"
        @close="toggleReceiveOverlay"
      />
    </v-overlay>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { WalletSend, WalletReceive } from "./overlay";
import { Coin, SendInfo } from "@/types";
import Ethereum from "@/services/coins/ethereum";

@Component({
  components: {
    WalletSend,
    WalletReceive
  }
})
export default class Wallet extends Vue {
  overlayReceive: boolean = false;
  overlaySend: boolean = false;

  coin: Coin = {
    name: "Ethereum",
    ticker: "ETH"
  };

  wallet: Ethereum = new Ethereum(
    "fe61bdcbaeb8a46f2b4aec50ba6e400efdd0b82cd3e3212259f9c96daa99e65e"
  );

  send(sendInfo: SendInfo) {
    this.wallet.send(sendInfo.recipient, sendInfo.amount);
  }

  toggleReceiveOverlay() {
    this.overlayReceive = !this.overlayReceive;
  }

  toggleSendOverlay() {
    this.overlaySend = !this.overlaySend;
  }
}
</script>

<style lang="scss"></style>
