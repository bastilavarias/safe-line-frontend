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
        component: () => import("@/layouts/dashboard/Patient"),
        meta: {
            requiresAuth: true,
        },

        children: [
            {
                path: "",
                name: "patient-dashboard",
                component: () => import("@/views/patient/Dashboard"),
            },

            {
                path: "chat",
                name: "patient-chat",
                component: () => import("@/views/patient/Chat"),
            },

            {
                path: "map",
                name: "patient-map",
                component: () => import("@/views/patient/Map"),
            },
        ],
    },

    {
        path: "/dashboard/clinic-member",
        meta: {
            requiresAuth: true,
        },
        component: () => import("@/layouts/dashboard/ClinicMember"),

        children: [
            {
                path: "",
                name: "clinic-member-dashboard",
                component: () => import("@/views/clinic-member/Dashboard"),
            },

            {
                path: "chat",
                name: "clinic-member-chat",
                component: () => import("@/views/clinic-member/Chat"),
            },
        ],
    },

    {
        path: "/dashboard/super-admin",
        meta: {
            requiresAuth: true,
        },
        component: () => import("@/layouts/dashboard/SuperAdmin"),

        children: [
            {
                path: "",
                name: "super-admin-dashboard",
                component: () => import("@/views/super-admin/Dashboard"),
            },

            {
                path: "clinic-services",
                name: "super-admin-clinic-services",
                component: () => import("@/views/super-admin/ClinicServices"),
            },
            {
                path: "accounts",
                name: "super-admin-accounts",
                component: () => import("@/views/super-admin/Accounts"),
            },
        ],
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
