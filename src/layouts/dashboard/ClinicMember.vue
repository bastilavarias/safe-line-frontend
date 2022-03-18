<template>
    <v-app>
        <v-main>
            <router-view></router-view>
        </v-main>
        <dashboard-navigation-drawer
            :navigations="navigations"
        ></dashboard-navigation-drawer>
    </v-app>
</template>

<script>
import DashboardNavigationDrawer from "@/layouts/parts/dashboard/NavigationDrawer";
import DashboardAppBar from "@/layouts/parts/dashboard/AppBar";
import authorizationMixin from "@/mixins/authorization";

const defaultNavigations = [
    {
        to: {
            name: "clinic-member-dashboard",
        },
        description: "Home",
        icon: "mdi-home",
        value: 1,
    },

    {
        to: {
            name: "clinic-member-chat",
        },
        description: "Chat",
        icon: "mdi-message",
        value: 2,
    },

    {
        to: {
            name: "clinic-member-settings",
        },
        description: "Settings",
        icon: "mdi-cog",
        value: 3,
    },
];

export default {
    components: { DashboardAppBar, DashboardNavigationDrawer },

    mixins: [authorizationMixin],

    data() {
        return {
            navigations: [],
        };
    },

    computed: {
        isChatPage() {
            const chatPagesRouteNames = ["clinic-member-chat"];
            const currentRouteName = this.$route.name;
            return chatPagesRouteNames.includes(currentRouteName);
        },

        user() {
            const details = this.$store.state.authentication.details;
            return details.user || null;
        },
    },

    created() {
        if (this.isAdmin) {
            this.navigations = [...defaultNavigations].filter(
                (navigation) => navigation.value !== 2
            );
        } else if (this.isDoctor) {
            this.navigations = [...defaultNavigations].filter(
                (navigation) => navigation.value === 1
            );
        } else {
            this.navigations = [...defaultNavigations].filter(
                (navigation) => navigation.value !== 3
            );
        }
    },
};
</script>
