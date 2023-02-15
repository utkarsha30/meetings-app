<template>
  <div>
    <!-- <app-menu /> -->
    <div>
      <router-view></router-view>
      <page-footer></page-footer>
    </div>
  </div>
</template>

<script>
//import MeetingsCalendar from './components/pages/MeetingsCalendar.vue'
//import AppMenu from './components/AppMenu.vue'
//import MeetingsList from './components/pages/meetings/Meetingslist.vue'
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
