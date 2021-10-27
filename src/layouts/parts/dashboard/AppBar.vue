<template>
    <v-app-bar flat color="transparent" app>
        <v-card flat color="transparent">
            <v-btn icon @click="drawer" class="ml-5">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
        </v-card>
        <v-container>
            <v-row>
                <v-card flat color="transparent" class="ml-n7">
                    <img
                        class="mr-2"
                        height="32px"
                        width="35px"
                        src="@/assets/home/logoViolet.png"
                    />
                </v-card>
                <v-card flat color="transparent">
                    <v-toolbar-title class="black--text"
                        >Safe Line</v-toolbar-title
                    >
                </v-card>
                <v-spacer></v-spacer>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn text v-bind="attrs" v-on="on">
                            <v-avatar :size="25" class="mr-2">
                                <v-img :src="user.profile.image_url"></v-img>
                            </v-avatar>
                            <span class="text-capitalize"
                                >{{ user.profile.first_name }}
                                {{ user.profile.last_name[0] }}.</span
                            >
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item two-line>
                            <v-list-item-avatar>
                                <v-img :src="user.profile.image_url"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title class="text-capitalize"
                                    >{{ user.profile.first_name }}
                                    {{
                                        user.profile.last_name
                                    }}</v-list-item-title
                                >
                                <v-list-item-subtitle>{{
                                    userType
                                }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item @click="signOut">
                            <v-list-item-icon>
                                <v-icon>mdi-logout</v-icon>
                            </v-list-item-icon>
                            <v-list-item>Sign Out</v-list-item>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
import DashboardNavigationDrawer from "@/layouts/parts/dashboard/NavigationDrawer";
import { PURGE_AUTHENTICATION } from "@/store/action-types/authentication";
import { DRAWER_SHOW } from "@/store/action-types/interfaceModule";

export default {
    components: { DashboardNavigationDrawer },

    name: "dashboard-app-bar",

    computed: {
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

    methods: {
        async signOut() {
            this.$store.commit(PURGE_AUTHENTICATION);
            await this.$router.push({ name: "sign-in" });
        },
        drawer() {
            this.$store.commit(DRAWER_SHOW, true);
        },
    },
};
</script>
