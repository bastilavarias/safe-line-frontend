import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/Home"),
    },

    {
        path: "/patient-sign-up",
        name: "patient-sign-up",
        component: () => import("@/views/patient/SignUp"),
    },

    {
        path: "/sign-in",
        name: "sign-in",
        component: () => import("@/views/SignIn"),
    },

    {
        path: "/dashboard/patient",
        name: "patient-dashboard",
        component: () => import("@/layouts/dashboard/Patient"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
