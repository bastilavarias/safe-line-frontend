<template>
    <v-navigation-drawer
        absolute
        temporary
        :expand-on-hover="false"
        v-model="drawerStateLocal"
    >
        <div>
            <div justify="center" align="center" class="mt-5">
                <v-list-item-group>
                    <v-list>
                        <v-list-item-avatar size="75" class="ml-4">
                            <v-img :src="user.profile.image_url"></v-img>
                        </v-list-item-avatar>
                    </v-list>
                </v-list-item-group>
                <v-list-item-group class="mb-4">
                    <v-list-item-title class="text-h6">
                        {{ user.profile.first_name }}
                        {{ user.profile.last_name }}
                    </v-list-item-title>
                </v-list-item-group>
                <v-btn class="mb-6 text-capitalize" color="primary" plain
                    ><v-icon>mdi-pencil</v-icon>Edit Profile</v-btn
                >
                <v-divider class="mb-7"></v-divider>
            </div>
            <v-row class="fill-height" justify="center" align="center">
                <v-col cols="12" class="ml-10">
                    <template v-for="(navigation, index) in navigations">
                        <v-btn
                            :key="index"
                            depressed
                            :to="navigation.to"
                            color="white"
                            exact
                            :class="`${
                                index !== navigations.length - 1 ? 'mb-5' : ''
                            }`"
                            active-class="white primary--text"
                        >
                            <v-icon>{{ navigation.icon }}</v-icon>
                            <p class="mt-4 ml-3 text-capitalize">
                                {{ navigation.description }}
                            </p>
                        </v-btn>
                    </template>
                </v-col>
            </v-row>
        </div>
    </v-navigation-drawer>
</template>

<script>
import { DRAWER_SHOW } from "@/store/action-types/interfaceModule";
export default {
    name: "dashboard-navigation-drawer",

    props: {
        navigations: Array,
    },

    data() {
        return {
            drawerStateLocal: this.$store.state.interface.drawer,
        };
    },

    computed: {
        drawerState() {
            const drawer = this.$store.state.interface.drawer;
            return drawer;
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

    methods: {},

    watch: {
        drawerState(value) {
            this.drawerStateLocal = value;
        },
        drawerStateLocal(value) {
            if (value === false) {
                this.$store.commit(DRAWER_SHOW, value);
            }
        },
    },
};
</script>
