<template>
    <v-app>
        <v-row>
            <v-col cols="3" class="fill-height primary white--text">
                <v-container class="fill-height">
                    <div>
                        <h1 class="font-weight-bold display-1">Safe Line</h1>
                        <div class="mb-5"></div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. A accusantium aliquam beatae cum cupiditate
                            enim illum in, ipsum iste itaque laudantium nemo
                            neque nesciunt perferendis quaerat quia quod
                            recusandae unde veniam voluptatum? Alias autem culpa
                            cum, debitis error est eum fugiat fugit non placeat
                            quisquam repellat rerum sunt suscipit temporibus?
                        </p>
                    </div>
                </v-container>
            </v-col>
            <v-col cols="9" class="base-grid__right-side">
                <section class="fill-height">
                    <v-toolbar absolute flat width="100%">
                        <v-toolbar-title
                            class="d-flex align-center cursor-pointer"
                            @click="$router.push({ name: 'home' })"
                        >
                            <v-img
                                width="40"
                                height="auto"
                                :src="require('@/assets/logo-violet.png')"
                                class="mr-2"
                            ></v-img>
                            <span class="font-weight-bold"> Safe Line </span>
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" depressed class="text-capitalize"
                            >Sign In</v-btn
                        >
                    </v-toolbar>
                    <div class="fill-height d-flex align-center">
                        <v-container>
                            <v-card>
                                <v-card-title>Add Clinic</v-card-title>
                                <v-card-subtitle
                                    >For Developers Only</v-card-subtitle
                                >

                                <v-card-text>
                                    <v-row dense>
                                        <v-col cols="12" v-if="error">
                                            <v-alert dark color="error"
                                                >Error: {{ error }}</v-alert
                                            >
                                        </v-col>

                                        <v-col cols="12">
                                            <v-text-field
                                                outlined
                                                label="Name"
                                                v-model="form.name"
                                            ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                            <v-menu
                                                ref="menu"
                                                v-model="timePickerMenu1"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                :return-value.sync="
                                                    form.opening_time
                                                "
                                                transition="scale-transition"
                                                offset-y
                                                max-width="290px"
                                                min-width="290px"
                                            >
                                                <template
                                                    v-slot:activator="{
                                                        on,
                                                        attrs,
                                                    }"
                                                >
                                                    <v-text-field
                                                        outlined
                                                        label="Opening Time"
                                                        prepend-inner-icon="mdi-clock-time-four-outline"
                                                        readonly
                                                        :value="
                                                            form.opening_time
                                                                ? formatAMPM(
                                                                      form.opening_time
                                                                  )
                                                                : ''
                                                        "
                                                        v-bind="attrs"
                                                        v-on="on"
                                                    ></v-text-field>
                                                </template>
                                                <v-time-picker
                                                    v-if="timePickerMenu1"
                                                    v-model="form.opening_time"
                                                    full-width
                                                    @click:minute="
                                                        $refs.menu.save(
                                                            form.opening_time
                                                        )
                                                    "
                                                ></v-time-picker>
                                            </v-menu>
                                        </v-col>

                                        <v-col cols="12" md="6">
                                            <v-menu
                                                ref="menu"
                                                v-model="timePickerMenu2"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                :return-value.sync="
                                                    form.closing_time
                                                "
                                                transition="scale-transition"
                                                offset-y
                                                max-width="290px"
                                                min-width="290px"
                                            >
                                                <template
                                                    v-slot:activator="{
                                                        on,
                                                        attrs,
                                                    }"
                                                >
                                                    <v-text-field
                                                        outlined
                                                        label="Closing Time"
                                                        prepend-inner-icon="mdi-clock-time-four-outline"
                                                        readonly
                                                        v-bind="attrs"
                                                        :value="
                                                            form.closing_time
                                                                ? formatAMPM(
                                                                      form.closing_time
                                                                  )
                                                                : ''
                                                        "
                                                        v-on="on"
                                                    ></v-text-field>
                                                </template>
                                                <v-time-picker
                                                    v-if="timePickerMenu2"
                                                    v-model="form.closing_time"
                                                    full-width
                                                    @click:minute="
                                                        $refs.menu.save(
                                                            form.closing_time
                                                        )
                                                    "
                                                ></v-time-picker>
                                            </v-menu>
                                        </v-col>

                                        <v-col cols="12">
                                            <v-autocomplete
                                                label="Services"
                                                :items="services"
                                                item-text="name"
                                                item-value="id"
                                                multiple
                                                small-chips
                                                outlined
                                                v-model="form.services"
                                            ></v-autocomplete>
                                        </v-col>

                                        <v-col cols="12">
                                            <places-autocomplete
                                                placeholder="Search Address"
                                                v-model="form.location"
                                            ></places-autocomplete>
                                        </v-col>
                                    </v-row>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        @click="createClinic"
                                        color="primary"
                                        depressed
                                        class="text-capitalize"
                                        :loading="isCreateClinicStart"
                                        >Create Clinic</v-btn
                                    >
                                </v-card-actions>
                            </v-card>
                        </v-container>
                    </div>
                </section>
            </v-col>
        </v-row>

        <v-snackbar v-model="isSnackbarShow" color="success" :timeout="3000">
            Created Clinic
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
    </v-app>
</template>

<script>
import apiService from "@/services/api";
import PlacesAutocomplete from "@/components/base/PlacesAutocomplete";
import dateMixin from "@/mixins/date";

const defaultForm = {
    name: null,
    opening_time: "10:00",
    closing_time: "18:00",
    services: [],
    location: {
        address: null,
        longitude: null,
        latitude: null,
    },
};

export default {
    components: { PlacesAutocomplete },

    mixins: [dateMixin],

    data() {
        return {
            form: Object.assign({}, defaultForm),
            error: null,
            isSnackbarShow: false,
            isCreateClinicStart: false,

            timePickerMenu1: false,
            timePickerMenu2: false,

            services: [],
        };
    },

    methods: {
        async createClinic() {
            try {
                this.isCreateClinicStart = true;
                const payload = {
                    name: this.form.name || null,
                    opening_time: this.form.opening_time || null,
                    closing_time: this.form.closing_time || null,
                    services: this.form.services || [],
                    address: this.form.location.address || null,
                    latitude: this.form.location.latitude || null,
                    longitude: this.form.location.longitude || null,
                };

                await apiService.post("/developer/clinics", payload);
                this.isSnackbarShow = true;
                this.form = Object.assign({}, defaultForm);
            } catch (error) {
                this.error = error.response.data.message;
            }

            this.isCreateClinicStart = false;
        },

        async getServices() {
            try {
                const response = await apiService.get(
                    "/developer/clinic/services?per_page=99"
                );
                const result = response.data;
                this.services = result.data;
            } catch (error) {
                this.services = [];
            }
        },
    },

    async created() {
        await this.getServices();
    },
};
</script>

<style lang="scss" scoped>
.base-grid {
    height: 100vh;

    &__left-side,
    &__right-side {
        height: 100%;

        section {
            position: relative;
        }
    }
}
</style>
