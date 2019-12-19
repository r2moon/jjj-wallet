<template>
  <div class="w-100 h-100">
    <div class="float-right">
      <v-btn icon outlined color="white" @click="onClose">
        <v-icon>mdi-window-close</v-icon>
      </v-btn>
    </div>
    <div class="d-flex flex-column align-center w-100 h-100">
      <v-text-field :placeholder="placeholder" v-model="recipient" solo />
      <v-text-field placeholder="Amount" v-model="amount" type="number" />
      <v-btn class="my-5" @click="onSend">Send</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from "vue-property-decorator";
import { clipboard } from "electron";
import { Coin, SendInfo } from "@/types";

@Component({})
export default class WalletReceive extends Vue {
  @Prop() coin!: Coin;

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

<style lang="scss"></style>
