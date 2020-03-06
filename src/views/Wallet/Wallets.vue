<template>
  <div>
    <v-tabs vertical background-color="transparent">
      <v-tab
        :key="`tab-${coin.info.name}${index}`"
        v-for="(coin, index) in coins"
        class="bg-theme-wallet-menu-background"
      >
        {{ coin.info.name }}
      </v-tab>
      <v-tab-item
        :key="`tab-item-${coin.info.name}${index}`"
        v-for="(coin, index) in coins"
        active-class="bg-theme-background h-screen"
        transition="fade-transition"
        reverse-transition="fade-transition"
      >
        <Wallet :coin="coin" />
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Wallet } from "@/components/Wallet";
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
