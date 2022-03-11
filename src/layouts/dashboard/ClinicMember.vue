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

export default {
    components: { DashboardAppBar, DashboardNavigationDrawer },

    data() {
        return {
            navigations: [
                {
                    to: {
                        name: "clinic-member-dashboard",
                    },
                    description: "Dashboard",
                    icon: "mdi-home",
                },

                {
                    to: {
                        name: "clinic-member-chat",
                    },
                    description: "Chat",
                    icon: "mdi-message",
                },

                {
                    to: {
                        name: "clinic-member-settings",
                    },
                    description: "Settings",
                    icon: "mdi-cog",
                },
            ],
        };
    },

    computed: {
        isChatPage() {
            const chatPagesRouteNames = ["clinic-member-chat"];
            const currentRouteName = this.$route.name;
            return chatPagesRouteNames.includes(currentRouteName);
        },
    },
};
</script>
