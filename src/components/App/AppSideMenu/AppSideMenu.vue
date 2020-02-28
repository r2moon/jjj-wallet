<template>
  <div class="bg-theme-background">
    <v-app-bar app color="primary" dark>
      <router-link :to="{ name: 'Wallets' }" class="white--text mx-3">
        Wallets
      </router-link>
      <router-link :to="{ name: 'Exchange' }" class="white--text mx-3">
        Exchange
      </router-link>
    </v-app-bar>
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
