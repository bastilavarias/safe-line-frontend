<template>
    <v-app>
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
                        name: "super-admin-dashboard",
                    },
                    description: "Dashboard",
                    icon: "mdi-home",
                },

                {
                    to: {
                        name: "super-admin-clinic-services",
                    },
                    description: "Services",
                    icon: "mdi-application-cog",
                },

                {
                    to: {
                        name: "super-admin-accounts",
                    },
                    description: "Accounts",
                    icon: "mdi-account",
                },
            ],
        };
    },
};
</script>
