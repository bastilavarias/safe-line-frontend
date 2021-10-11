<template>
    <v-app>
        <dashboard-app-bar></dashboard-app-bar>
        <v-main
            :style="{
                backgroundColor: '#F5F5F5',
            }"
        >
            <v-container>
                <router-view></router-view>
            </v-container>
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
                        name: "patient-dashboard",
                    },
                    icon: "mdi-home",
                },

                {
                    to: {
                        name: "patient-chat",
                    },
                    icon: "mdi-message",
                },

                {
                    to: {
                        name: "patient-map",
                    },
                    icon: "mdi-map",
                },
            ],
        };
    },
};
</script>
