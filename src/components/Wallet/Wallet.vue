<template>
  <div class="Wallet">
    <div>{{ coin.name }}</div>
    <button>Send</button>
    <button>Receive</button>
    <div>{{ wallet.address }}</div>
    <div>{{ wallet.balance }} {{ coin.ticker }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import { Coin } from "@/types";

import Ethereum from "@/services/coins/ethereum";

@Component({})
export default class Wallet extends Vue {
  coin: Coin = {
    name: "Ethereum",
    ticker: "ETH"
  };

  wallet: Ethereum = new Ethereum(
    "fe61bdcbaeb8a46f2b4aec50ba6e400efdd0b82cd3e3212259f9c96daa99e65e"
  );
}
</script>

<style lang="scss"></style>
