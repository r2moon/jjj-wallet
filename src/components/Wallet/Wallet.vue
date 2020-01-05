<template>
  <div class="wallet">
    <div class="d-flex flex-column align-center">
      <img :src="coin.info.logo" class="wallet--logo"/>
      <h1>{{ wallet.balance }} {{ coin.info.ticker }}</h1>
      <div class="d-flex flex-row mt-5">
        <div class="float-right">
          <v-btn outlined @click="toggleSendOverlay" class="send--receive-btn mr-2">SEND</v-btn>
        </div>
        <div class="float-left">
          <v-btn outlined @click="toggleReceiveOverlay" class="send--receive-btn ml-2">RECEIVE</v-btn>
        </div>
      </div>
    </div>
    <v-overlay :value="overlaySend" opacity="0.9">
      <WalletSend :coin="coin.info" @send="send" @close="toggleSendOverlay" />
    </v-overlay>
    <v-overlay :value="overlayReceive" opacity="0.9">
      <WalletReceive
        :address="wallet.address"
        :name="coin.info.name"
        @close="toggleReceiveOverlay"
      />
    </v-overlay>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { WalletSend, WalletReceive } from "./overlay";
import { Coin, CoinInfo, SendInfo, IWallet } from "@/types";
import { Ethereum } from "@/services/coins";

@Component({
  components: {
    WalletSend,
    WalletReceive
  }
})
export default class Wallet extends Vue {
  overlayReceive: boolean = false;
  overlaySend: boolean = false;

  coinInfo: CoinInfo = {
    name: "Ethereum",
    ticker: "ETH",
    logo: require("@/assets/coins/ethereum/logo.png")
  };

  wallet: IWallet = new Ethereum(
    "fe61bdcbaeb8a46f2b4aec50ba6e400efdd0b82cd3e3212259f9c96daa99e65e"
  );

  coin: Coin = {
    info: this.coinInfo,
    wallet: this.wallet
  }

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

<style lang="scss">
.wallet {
  padding: 20px;
  .wallet--logo {
    width: 128px;
    height: 128px;
  }

  .send--receive-btn {
    width: 150px;
    height: 40px;
    border-radius: 20px;
  }
}

.v-overlay__content {
  width: 100%;
  height: 100%;
}
</style>
