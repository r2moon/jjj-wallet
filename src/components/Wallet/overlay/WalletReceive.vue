<template>
  <div class="wallet-receive">
    <div class="close">
      <v-btn icon outlined color="white" @click="onClose">
        <v-icon>mdi-window-close</v-icon>
      </v-btn>
    </div>
    <div class="d-flex flex-column align-center justify-center mx-auto my-auto">
      <div>Your {{ name }} Address</div>
      <v-btn class="my-5 text-none" @click="onCopy">{{ address }}</v-btn>
      <Qrcode :value="address" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from "vue-property-decorator";
import Qrcode from "vue-qrcode";

import { clipboard } from "electron";

@Component({
  components: {
    Qrcode
  }
})
export default class WalletReceive extends Vue {
  @Prop() address!: string;
  @Prop() name!: string;

  onCopy() {
    clipboard.writeText(this.address);
  }

  @Emit("close")
  onClose() {}
}
</script>

<style lang="scss">
.wallet-receive {
  height: 100%;
  display: flex;

  .close {
    position: absolute;
    right: 30px;
    top: 30px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }
}
</style>
