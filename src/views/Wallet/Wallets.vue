<template>
  <div>
    <v-tabs vertical background-color="transparent">
      <v-tab
        :key="`wallet-tab-${coin.id}`"
        v-for="coin in wallet.coins"
        class="bg-theme-wallet-menu-background"
      >{{ coin.name }}</v-tab>
      <v-tab-item
        :key="`tab-item-${coin.name}`"
        v-for="coin in wallet.coins"
        active-class="bg-theme-background h-screen"
        transition="fade-transition"
        reverse-transition="fade-transition"
      >
        <Wallet :coin="coin" :walletCore="wallet" />
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Wallet } from "@/components/Wallet";
import { WalletCore } from "@/crypto-lib";

@Component({
  components: {
    Wallet
  }
})
export default class Wallets extends Vue {
  wallet = new WalletCore("much butter trick country please fish window resist brand pledge end fire");
}
</script>
