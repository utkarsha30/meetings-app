<template>
  <div>
    <router-view></router-view>
    <page-footer></page-footer>
  </div>
</template>

<script>
import PageFooter from "@/components/pages/PageFooter.vue";
export default {
  name: "App",
  components: {
    PageFooter,
  },
};
</script>

<style>
</style>
