<template>
    <v-navigation-drawer
        absolute
        permanent
        :mini-variant="mini"
        mini-variant-width="250"
        :expand-on-hover="false"
        v-model="drawerStateLocal"
        app
    >
        <div>
            <v-row class="fill-height" justify="center" align="center">
                <v-col cols="12" class="mt-5">
                    <div align="center">
                        <img
                            src="@/assets/sidenavlogo-alt.png"
                            alt=""
                            height="34px"
                            width="36px"
                        />
                        <h4 class="mb-5">Safe Line</h4>
                        <v-divider width="150px"></v-divider>
                    </div>
                </v-col>
                <v-col cols="12" class="mb-3 ml-3">
                    <v-row>
                        <v-card flat class="d-flex flex-row">
                            <v-col cols="4" class="ml-5">
                                <v-list-item-avatar>
                                    <v-img
                                        :src="user.profile.image_url"
                                    ></v-img>
                                </v-list-item-avatar>
                            </v-col>
                            <v-col cols="8" class="mt-1 ml-n3">
                                <h4>
                                    <span
                                        :title="`${user.profile.first_name} ${user.profile.last_name}`"
                                    >
                                        {{ user.profile.first_name }}
                                        {{ user.profile.last_name }}
                                    </span>
                                </h4>
                                <v-list-item-subtitle
                                    class="font-weight-bold"
                                    v-if="isAdmin || isDoctor || isCsr"
                                >
                                    <span :title="clinic.name">{{
                                        clinic.name
                                    }}</span>
                                </v-list-item-subtitle>
                                <v-list-item-subtitle>
                                    {{ userType }}
                                </v-list-item-subtitle>
                            </v-col>
                        </v-card>
                    </v-row>
                </v-col>
                <v-col cols="12" class="ml-5 mb-2">
                    <template v-for="(navigation, index) in navigations">
                        <v-btn
                            :key="index"
                            depressed
                            :to="navigation.to"
                            color="white"
                            exact
                            :class="`${
                                index !== navigations.length - 1 ? 'mb-5' : ''
                            } text-left`"
                            active-class="white primary--text"
                            block
                        >
                            <v-icon class="mr-1">{{ navigation.icon }}</v-icon>
                            <span class="text-capitalize">
                                {{ navigation.description }}
                            </span>
                        </v-btn>
                    </template>
                </v-col>
                <div align="center">
                    <v-divider width="150px"></v-divider>
                </div>
                <v-col cols="12" class="ml-5">
                    <v-btn text plain @click="signOut" class="text-capitalize"
                        ><v-icon class="mr-3">mdi-logout</v-icon>Sign Out</v-btn
                    >
                </v-col>
            </v-row>
        </div>
    </v-navigation-drawer>
</template>

<script>
import { PURGE_AUTHENTICATION } from "@/store/action-types/authentication";
import { DRAWER_SHOW } from "@/store/action-types/interfaceModule";
import authorizationMixin from "@/mixins/authorization";
export default {
    name: "dashboard-navigation-drawer",

    mixins: [authorizationMixin],

    props: {
        navigations: Array,
    },

    data() {
        return {
            mini: true,
            drawerStateLocal: this.$store.state.interface.drawer,
        };
    },

    computed: {
        drawerState() {
            const drawer = this.$store.state.interface.drawer;
            return drawer;
        },

        clinic() {
            const details = this.$store.state.authentication.details;
            return details.clinic || null;
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

    methods: {
        async signOut() {
            this.$store.commit(PURGE_AUTHENTICATION);
            await this.$router.push({ name: "sign-in" });
        },
    },

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
