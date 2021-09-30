import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import { AUTHENTICATE_USER } from "@/store/action-types/authentication";
import routingMixin from "@/mixins/routing";

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

    {
        path: "/dashboard/clinic-member",
        name: "clinic-member-dashboard",
        component: () => import("@/layouts/dashboard/ClinicMember"),
        meta: {
            requiresAuth: true,
        },
    },

    {
        path: "/dashboard/super-admin",
        name: "super-admin-dashboard",
        component: () => import("@/layouts/dashboard/SuperAdmin"),
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
    const { isAuthenticated, details } = store.state.authentication;
    const isProtectedRoute = to.matched.some(
        (record) => record.meta.requiresAuth
    );
    const unProtectedRoutes = ["patient-sign-up", "sign-in"];

    if (isProtectedRoute && !isAuthenticated) return next({ name: "sign-in" });
    if (unProtectedRoutes.includes(to.name) && isAuthenticated) {
        const redirectTo = routingMixin.methods.redirectTo(
            details.user.user_type
        );
        return next({ name: redirectTo });
    }
    next();
});

export default router;
