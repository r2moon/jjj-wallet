<template>
  <v-app class="theme-dark">
    <div class="flex flex-row bg-theme-background">
      <AppSideMenu />

      <v-content>
        <router-view />
      </v-content>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { AppSideMenu } from "@/components/App";
import "@/styles/style.scss";

export default Vue.extend({
  name: "App",

  components: {
    AppSideMenu
  },

  data: () => ({
    //
  })
});
</script>
