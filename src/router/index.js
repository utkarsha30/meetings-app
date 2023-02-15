import Router from "vue-router";
import MeetingsCalendar from "@/components/pages/calendar/MeetingsCalendar.vue";
import MeetingsMain from "@/components/pages/meetings/MeetingsMain.vue";
import TeamsList from "@/components/pages/teams/TeamsList";
import TeamsCard from "@/components/pages/teams/TeamsCard";
import TeamsAdd from "@/components/pages/teams/TeamsAdd";
import UserLogin from "@/components/pages/user/UserLogin";
import UserRegister from "@/components/pages/user/UserRegister";
import PageNotFound from "@/components/pages/user/PageNotFound";
const router = new Router({
  mode: "history",
  routes: [
    {
      name: "user-login",
      path: "/",
      component: UserLogin,
      meta: {
        auth: false,
      },
    },
    {
      name: "user-register",
      path: "/register",
      component: UserRegister,
      meta: {
        auth: false,
      },
    },
    {
      name: "calendar",
      path: "/calendar",
      component: MeetingsCalendar,
      meta: {
        auth: true,
      },
    },
    {
      name: "meetings-main",
      path: "/meetings",
      component: MeetingsMain,
      meta: {
        auth: true,
      },
    },
    {
      name: "teams-list",
      path: "/teams",
      redirect: "teams-card",
      component: TeamsList,
      meta: {
        auth: true,
      },
      children: [
        {
          name: "teams-card",
          path: "",
          component: TeamsCard,
          meta: {
            auth: true,
          },
        },
        {
          name: "teams-add",
          path: "/teams/add",
          component: TeamsAdd,
          meta: {
            auth: true,
          },
        },
      ],
    },
    {
      name: "page-not-found",
      path: "/*",
      component: PageNotFound,
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.meta.auth && !localStorage.getItem("token")) {
    next("*");
  } else if (!to.meta.auth && localStorage.getItem("token")) {
    next("/calendar");
  } else {
    next();
  }
});

export default router;
