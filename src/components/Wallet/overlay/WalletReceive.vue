<template>
  <div class="w-100 h-100">
    <div class="float-right">
      <v-btn icon outlined color="white" @click="onClose">
        <v-icon>mdi-window-close</v-icon>
      </v-btn>
    </div>
    <div class="d-flex flex-column align-center w-100 h-100">
      <div>Your {{ name }} Address</div>
      <v-btn class="my-5" @click="onCopy">{{ address }}</v-btn>
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

<style lang="scss"></style>
