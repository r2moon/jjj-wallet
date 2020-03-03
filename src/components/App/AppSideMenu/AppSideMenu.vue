<template>
  <div class="bg-theme-background p-6 w-64">
    <div
      class="flex flex-col items-center border-dashed border-b-2 border-theme-seperator"
    >
      <img src="../../../assets/logo.png" />
      <p class="text-theme-text text-3xl text-bold">200.04</p>
    </div>
    <div
      class="main-menu flex flex-col border-dashed border-b-2 border-theme-seperator py-12"
    >
      <router-link
        :to="{ name: 'Home' }"
        class="menu-router-link flex flex-row items-center px-3 py-2 my-2"
      >
        <span class="router-button-home text-theme-text">Home</span>
      </router-link>
      <router-link
        :to="{ name: 'Wallets' }"
        class="menu-router-link flex flex-row items-center px-3 py-2 my-2"
      >
        <span class="router-button-wallet text-theme-text">Wallet</span>
      </router-link>
      <router-link
        :to="{ name: 'Exchange' }"
        class="menu-router-link flex flex-row items-center px-3 py-2 my-2"
      >
        <span class="router-button-exchange text-theme-text">Exchange</span>
      </router-link>
      <router-link
        :to="{ name: 'Backup' }"
        class="menu-router-link flex flex-row items-center px-3 py-2 my-2"
      >
        <span class="router-button-backup text-theme-text">Backup</span>
      </router-link>
    </div>
    <div class="flex flex-col">
      <router-link :to="{ name: 'Settings' }" class="flex px-3 py-2 my-2">
        <span class="text-theme-text">Settings</span>
      </router-link>
      <router-link :to="{ name: 'Help' }" class="flex px-3 py-2 my-2">
        <span class="text-theme-text">Help</span>
      </router-link>
    </div>
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
