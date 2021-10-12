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

export default {
    components: { DashboardNavigationDrawer },

    data() {
        return {
            navigations: [
                {
                    to: {
                        name: "clinic-member-dashboard",
                    },
                    icon: "mdi-home",
                },

                {
                    to: {
                        name: "clinic-member-chat",
                    },
                    icon: "mdi-message",
                },
            ],
        };
    },
};
</script>
