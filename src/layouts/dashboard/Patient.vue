<template>
    <v-app>
        <dashboard-app-bar v-if="!isMapPage"></dashboard-app-bar>
        <v-main
            :style="{
                backgroundColor: '#F5F5F5',
                position: 'relative',
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

    computed: {
        isMapPage() {
            const mapPagesRouteNames = ["patient-map"];
            const currentRouteName = this.$route.name;
            return mapPagesRouteNames.includes(currentRouteName);
        },
    },
};
</script>
