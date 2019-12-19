<template>
  <div class="Wallets">
    <Wallet />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Wallet from "@/components/Wallet/Wallet.vue";

@Component({
  components: {
    Wallet
  }
})
export default class Wallets extends Vue {}
</script>

<style lang="scss"></style>
