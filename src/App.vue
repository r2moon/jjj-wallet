<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <router-link :to="{ name: 'Wallets' }" class="white--text mx-3">Wallets</router-link>
      <router-link :to="{ name: 'Exchange' }" class="white--text mx-3">Exchange</router-link>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  components: {},

  data: () => ({
    //
  })
});
</script>
