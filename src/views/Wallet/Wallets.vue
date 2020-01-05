<template>
  <div class="Wallets">
    <v-tabs vertical>
      <v-tab>
        Ethereum
      </v-tab>
      <v-tab-item>
        <Wallet />
      </v-tab-item>
      <v-tab>
        Bitcoin
      </v-tab>
      <v-tab-item>
        <Wallet />
      </v-tab-item>
    </v-tabs>
    
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Wallet from "@/components/Wallet/Wallet.vue";
import { Coin, CoinInfo, IWallet } from "@/types";
import { Ethereum } from "@/services/coins";

@Component({
  components: {
    Wallet
  }
})
export default class Wallets extends Vue {
  coin: Coin = {
    info: {
      name: "Ethereum",
      ticker: "ETH",
      logo: require("@/assets/coins/ethereum/logo.png")
    },
    wallet: new Ethereum(
      "fe61bdcbaeb8a46f2b4aec50ba6e400efdd0b82cd3e3212259f9c96daa99e65e"
    )
  }
}
</script>

<style lang="scss"></style>
