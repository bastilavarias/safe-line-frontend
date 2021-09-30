import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import { AUTHENTICATE_USER } from "@/store/action-types/authentication";

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
        meta: {
            requiresAuth: true,
        },
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach(async (to, from, next) => {
    await store.dispatch(AUTHENTICATE_USER);
    const { isAuthenticated } = store.state.authentication;
    const redirectTo = isAuthenticated
        ? { name: "patient-dashboard" }
        : { name: "patient-dashboard" }; // change this once user object is fixed.
    const isProtectedRoute = to.matched.some(
        (record) => record.meta.requiresAuth
    );
    const unProtectedRoutes = ["home", "patient-sign-up", "sign-in"];

    if (isProtectedRoute && !isAuthenticated) return next({ name: "sign-in" });
    if (unProtectedRoutes.includes(to.name) && isAuthenticated)
        return next(redirectTo);
    next();
});

export default router;
