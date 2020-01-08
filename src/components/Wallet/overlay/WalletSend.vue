<template>
  <div class="wallet-send">
    <div class="close">
      <v-btn icon outlined color="white" @click="onClose">
        <v-icon>mdi-window-close</v-icon>
      </v-btn>
    </div>
    <div
      class="d-flex flex-column align-center justify-center mx-auto my-auto main"
    >
      <v-text-field
        :placeholder="placeholder"
        v-model="recipient"
        background-color="#212121"
        outlined
        class="input-recipient b-black"
      />
      <v-text-field
        placeholder="Amount"
        v-model="amount"
        type="number"
        class="input-amount"
        :suffix="coin.ticker"
      />
      <v-btn class="my-5 send-btn" @click="onSend">Send</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from "vue-property-decorator";
import { clipboard } from "electron";
import { CoinInfo, SendInfo } from "@/types";

@Component({})
export default class WalletReceive extends Vue {
  @Prop() coin!: CoinInfo;

  recipient: string = "";

  amount: number = 0;

  @Emit("send")
  onSend(): SendInfo {
    return {
      recipient: this.recipient,
      amount: this.amount
    };
  }
  @Emit("close")
  onClose() {}

  get placeholder() {
    return "Your " + this.coin.name + " Address";
  }
}
</script>

<style lang="scss">
.wallet-send {
  height: 100%;
  display: flex;

  .close {
    position: absolute;
    right: 30px;
    top: 30px;
  }

  .main {
    width: 300px;

    .input-recipient {
      width: 100%;
      // background-color: #212121;
      opacity: 0.8;
    }

    .input-amount {
      width: 100%;
    }

    .send-btn {
      width: 150px;
      height: 40px;
      border-radius: 20px;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }
}
</style>
