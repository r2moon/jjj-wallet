<template>
  <div class="Wallets">
    <v-tabs vertical>
      <v-tab
        :key="`tab-${coin.info.name}${index}`"
        v-for="(coin, index) in coins"
      >
        {{ coin.info.name }}
      </v-tab>
      <v-tab-item
        :key="`tab-item-${coin.info.name}${index}`"
        v-for="(coin, index) in coins"
      >
        <Wallet :coin="coin" />
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Wallet from "@/components/Wallet/Wallet.vue";
import { Coin, CoinInfo, IWallet } from "@/types";
import { Ethereum } from "@/services/coins";
import { importCoins } from "@/services/utils/coin";

@Component({
  components: {
    Wallet
  }
})
export default class Wallets extends Vue {
  coins: Array<Coin> = importCoins(true);
}
</script>

<style lang="scss"></style>
