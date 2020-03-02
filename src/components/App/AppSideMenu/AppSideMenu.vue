<template>
  <div class="bg-theme-background p-3">
    <div
      class="flex flex-col items-center border-dashed border-b-2 border-theme-seperator"
    >
      <img src="../../../assets/logo.png" />
      <p class="text-theme-text text-3xl text-bold">200.04</p>
    </div>
    <div class="flex flex-col border-dashed border-b-2 border-theme-seperator">
      <router-link
        :to="{ name: 'Home' }"
        class="flex flex-row items-center h-8"
      >
        <span class="router-button-home text-theme-text">Home</span>
      </router-link>
      <router-link
        :to="{ name: 'Wallets' }"
        class="flex flex-row items-center h-8"
      >
        <span class="router-button-wallet text-theme-text">Wallet</span>
      </router-link>
      <router-link
        :to="{ name: 'Exchange' }"
        class="flex flex-row items-center h-8"
      >
        <span class="router-button-exchange text-theme-text">Exchange</span>
      </router-link>
    </div>
    <!-- <v-app-bar app color="primary" dark>
      <router-link :to="{ name: 'Wallets' }" class="white--text mx-3">
        Wallets
      </router-link>
      <router-link :to="{ name: 'Exchange' }" class="white--text mx-3">
        Exchange
      </router-link>
    </v-app-bar> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "AppSideMenu",

  components: {},

  data: () => ({
    //
  })
});
</script>
