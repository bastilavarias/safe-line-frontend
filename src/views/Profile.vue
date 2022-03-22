<template>
    <v-container>
        <v-card flat color="transparent">
            <v-card-text>
                <v-row dense justify="center" align="center">
                    <v-col cols="12" md="10" lg="8" xl="6">
                        <v-card flat>
                            <v-card-title class="text-center title black--text">
                                <v-spacer></v-spacer>
                                Profile
                                <v-spacer></v-spacer>
                            </v-card-title>
                            <div class="text-center title black--text"></div>

                            <v-card-text>
                                <v-row dense>
                                    <v-col cols="12">
                                        <v-alert
                                            outlined
                                            type="error"
                                            v-if="error"
                                        >
                                            {{ error }}
                                        </v-alert>
                                    </v-col>

                                    <v-col cols="12">
                                        <v-text-field
                                            outlined
                                            label="First Name"
                                            dense
                                            v-model="form.first_name"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12">
                                        <v-text-field
                                            outlined
                                            label="Last Name"
                                            dense
                                            v-model="form.last_name"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12">
                                        <v-select
                                            dense
                                            outlined
                                            label="Gender"
                                            :items="genders"
                                            v-model="form.gender"
                                        ></v-select>
                                    </v-col>

                                    <v-col cols="12">
                                        <b-date-picker
                                            outlined
                                            dense
                                            label="Birthday"
                                            v-model="form.birthday"
                                        ></b-date-picker>
                                    </v-col>

                                    <v-col cols="12">
                                        <places-autocomplete
                                            placeholder="Search Address"
                                            dense
                                            v-model="form.location"
                                        ></places-autocomplete>
                                    </v-col>

                                    <v-col cols="12">
                                        <div
                                            class="d-flex justify-space-between"
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                depressed
                                                color="primary"
                                                class="text-capitalize"
                                                :loading="isActionStart"
                                                :disabled="!isFormValid"
                                                @click="updateProfile"
                                                >Update</v-btn
                                            >
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-snackbar
                v-model="isSnackbarShow"
                color="success"
                :timeout="3000"
            >
                Profile Updated
                <template v-slot:action="{ attrs }">
                    <v-btn
                        color="white"
                        text
                        v-bind="attrs"
                        @click="isSnackbarShow = false"
                    >
                        Close
                    </v-btn>
                </template>
            </v-snackbar>
        </v-card>
    </v-container>
</template>

<script>
import BDatePicker from "@/components/base/DatePicker";
import PlacesAutocomplete from "@/components/base/PlacesAutocomplete";
import apiService from "@/services/api";
import { SET_USER_DETAILS } from "@/store/action-types/authentication";

const defaultForm = {
    first_name: null,
    last_name: null,
    gender: null,
    birthday: null,
    location: {
        address: null,
        latitude: null,
        longitude: null,
    },
};

export default {
    components: { PlacesAutocomplete, BDatePicker },

    data() {
        return {
            genders: ["Female", "Male", "I'd rather not say"],
            form: Object.assign({}, defaultForm),
            isActionStart: false,
            userID: null,
            error: null,
            isSnackbarShow: false,
        };
    },

    computed: {
        isFormValid() {
            const { first_name, last_name, gender, birthday, location } =
                this.form;
            return (
                first_name &&
                last_name &&
                gender &&
                birthday &&
                location.address
            );
        },
    },

    watch: {
        "$store.state.authentication.details.user"(user) {
            if (!user) return;
            this.userID = user.id;
            const { profile } = user;
            const { first_name, last_name, gender, birthday, location } =
                profile;
            this.form = Object.assign(
                {},
                {
                    first_name,
                    last_name,
                    gender,
                    birthday,
                    location: {
                        address: location.address,
                        latitude: location.latitude,
                        longitude: location.longitude,
                    },
                }
            );
        },
    },

    methods: {
        async updateProfile() {
            this.isActionStart = true;
            try {
                const { first_name, last_name, gender, birthday, location } =
                    this.form;
                const payload = {
                    first_name,
                    last_name,
                    gender,
                    birthday,
                    ...location,
                    _method: "PUT",
                };
                const response = await apiService.post(
                    `/users/${this.userID}`,
                    payload
                );
                const result = response.data.data;
                this.isSnackbarShow = true;
                this.$store.commit(SET_USER_DETAILS, result);
            } catch (error) {
                this.error =
                    error.response.data.message || "Something went wrong.";
            }

            this.isActionStart = false;
        },
    },

    created() {
        const user = this.$store.state.authentication.details.user || null;
        if (!user) return;
        this.userID = user.id;
        const { profile } = user;
        const { first_name, last_name, gender, birthday, location } = profile;
        this.form = Object.assign(
            {},
            {
                first_name,
                last_name,
                gender,
                birthday,
                location: {
                    address: location.address,
                    latitude: location.latitude,
                    longitude: location.longitude,
                },
            }
        );
    },
};
</script>
