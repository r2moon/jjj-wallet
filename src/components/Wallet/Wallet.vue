<template>
  <div class="wallet">
    <div class="flex flex-col items-center">
      <img :src="coinInfo.logo" class="w-30 h-30" />
      <h1>{{ wallet.balance }} {{ coinInfo.ticker }}</h1>
      <div class="flex flex-row mt-5">
        <div class="float-right">
          <v-btn
            outlined
            @click="toggleSendOverlay"
            class="w-32 h-5 rounded-full mr-2"
          >
            SEND
          </v-btn>
        </div>
        <div class="float-left">
          <v-btn
            outlined
            @click="toggleReceiveOverlay"
            class="w-32 h-5 rounded-full ml-2"
          >
            RECEIVE
          </v-btn>
        </div>
      </div>
    </div>
    <v-overlay :value="overlaySend" opacity="0.9">
      <WalletSend :coin="coinInfo" @send="send" @close="toggleSendOverlay" />
    </v-overlay>
    <v-overlay :value="overlayReceive" opacity="0.9">
      <WalletReceive
        :address="wallet.address"
        :name="coinInfo.name"
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
  @Prop() coin!: Coin;

  send(sendInfo: SendInfo) {
    this.wallet.send(sendInfo.recipient, sendInfo.amount);
  }

  toggleReceiveOverlay() {
    this.overlayReceive = !this.overlayReceive;
  }

  toggleSendOverlay() {
    this.overlaySend = !this.overlaySend;
  }

  get wallet(): IWallet {
    return this.coin.wallet;
  }

  get coinInfo(): CoinInfo {
    return this.coin.info;
  }
}
</script>

<style lang="scss">
.wallet {
  padding: 20px;
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
