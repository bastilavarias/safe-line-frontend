<template>
    <v-app>
        <v-main>
            <v-container>
                <h1>Clinic Member Dashboard</h1>
            </v-container>
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
                        name: "clinic-member-dashboard",
                    },
                    icon: "mdi-messages",
                },
            ],
        };
    },
};
</script>
