<template>
    <v-app>
        <v-main
            :style="{
                backgroundColor: '#F5F5F5',
                position: 'relative',
            }"
        >
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
    components: {
        DashboardAppBar,
        DashboardNavigationDrawer,
    },

    data() {
        return {
            navigations: [
                {
                    to: {
                        name: "patient-dashboard",
                    },
                    description: "Home",
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

                {
                    to: {
                        name: "profile",
                    },
                    description: "Profile",
                    icon: "mdi-account-edit",
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
        user() {
            const details = this.$store.state.authentication.details;
            return details.user || null;
        },

        userType() {
            if (!this.user) return null;
            const types = {
                super_admin: "Super Admin",
                clinic_member: "Clinic Member",
                patient: "Patient",
            };
            return types[this.user.user_type];
        },
    },
};
</script>
