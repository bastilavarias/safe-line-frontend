<template>
    <v-app>
        <dashboard-app-bar v-if="!isMapPage"></dashboard-app-bar>
        <v-main
            :style="{
                backgroundColor: '#F5F5F5',
                position: 'relative',
            }"
        >
            <v-container> </v-container>
        </v-main>
        <dashboard-navigation-drawer
            :navigations="navigations"
        ></dashboard-navigation-drawer>
    </v-app>
</template>

<script>
import Calendar from "@/layouts/parts/dashboard/Calendar";
import Reminders from "@/layouts/parts/dashboard/Reminders";
import DashboardNavigationDrawer from "@/layouts/parts/dashboard/NavigationDrawer";
import DashboardAppBar from "@/layouts/parts/dashboard/AppBar";
export default {
    components: {
        DashboardAppBar,
        DashboardNavigationDrawer,
        Reminders,
        Calendar,
    },

    data() {
        return {
            navigations: [
                {
                    to: {
                        name: "patient-dashboard",
                    },
                    description: "Dashboard",
                    icon: "mdi-home",
                },

                {
                    to: {
                        name: "patient-chat",
                    },
                    description: "Messages",
                    icon: "mdi-message",
                },

                {
                    to: {
                        name: "patient-map",
                    },
                    description: "Find Clinics",
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
