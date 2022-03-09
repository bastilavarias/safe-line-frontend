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
                    <div class="fill-height d-flex align-center">
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-card>
                                        <v-card-title>Add Clinic</v-card-title>
                                        <v-card-subtitle
                                            >For Developers
                                            Only</v-card-subtitle
                                        >

                                        <v-card-text>
                                            <v-row dense>
                                                <v-col cols="12" v-if="error">
                                                    <v-alert dark color="error"
                                                        >Error:
                                                        {{ error }}</v-alert
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
                                                        v-model="
                                                            timePickerMenu1
                                                        "
                                                        :close-on-content-click="
                                                            false
                                                        "
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
                                                            v-if="
                                                                timePickerMenu1
                                                            "
                                                            v-model="
                                                                form.opening_time
                                                            "
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
                                                        v-model="
                                                            timePickerMenu2
                                                        "
                                                        :close-on-content-click="
                                                            false
                                                        "
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
                                                            v-if="
                                                                timePickerMenu2
                                                            "
                                                            v-model="
                                                                form.closing_time
                                                            "
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
                                </v-col>
                                <v-col cols="12">
                                    <v-card rounded color="white">
                                        <v-toolbar flat>
                                            <v-toolbar-title
                                                class="font-weight-bold"
                                                >Clinics</v-toolbar-title
                                            >
                                            <v-spacer></v-spacer>
                                            <v-text-field
                                                filled
                                                hide-details
                                                placeholder="Search Clinic"
                                                dense
                                                rounded
                                                prepend-inner-icon="mdi-magnify"
                                                v-model="table.search"
                                            ></v-text-field>
                                        </v-toolbar>
                                        <v-data-table
                                            :loading="table.loading"
                                            :headers="table.headers"
                                            :items="table.items"
                                            :server-items-length="
                                                table.pagination.total
                                            "
                                            :items-per-page.sync="
                                                table.pagination.perPage
                                            "
                                            :page.sync="table.pagination.page"
                                            :footer-props="{
                                                'items-per-page-options':
                                                    table.pagination
                                                        .itemsPerPageOptions,
                                            }"
                                        >
                                            <template
                                                v-slot:item.created_at="{
                                                    item,
                                                }"
                                            >
                                                {{
                                                    formatSimpleDate(
                                                        item.created_at
                                                    )
                                                }}
                                            </template>
                                            <template
                                                v-slot:item.services="{ item }"
                                            >
                                                <v-chip
                                                    small
                                                    class="
                                                        font-weight-bold
                                                        ma-1
                                                    "
                                                    v-for="(
                                                        clinicService, index
                                                    ) in item.clinic_services"
                                                    :key="index"
                                                    >{{
                                                        clinicService.service
                                                            .name
                                                    }}</v-chip
                                                >
                                            </template>
                                            <template
                                                v-slot:item.status="{ item }"
                                            >
                                                <generic-status-chip
                                                    type="clinic-registration"
                                                    :status="item.status"
                                                    class-name="text-uppercase"
                                                    small
                                                    >{{
                                                        item.status
                                                    }}</generic-status-chip
                                                >
                                            </template>
                                        </v-data-table>
                                    </v-card>
                                </v-col>
                            </v-row>
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
import { debounce } from "@/helpers";
import { FETCH_CLINICS } from "@/store/action-types/clinic";
import GenericStatusChip from "@/components/generic/StatusChip";

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
    components: { GenericStatusChip, PlacesAutocomplete },

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
            clinics: [],

            table: {
                headers: [
                    {
                        text: "Clinic Name",
                        value: "name",
                    },

                    {
                        text: "Address",
                        value: "location.address",
                    },

                    {
                        text: "Services",
                        value: "services",
                    },

                    {
                        text: "Created At",
                        value: "created_at",
                    },

                    {
                        text: "Status",
                        value: "status",
                    },
                ],
                pagination: {
                    page: 1,
                    perPage: 5,
                    total: 0,
                    itemsPerPageOptions: [5, 10, 15, 20],
                },
                search: null,
                items: [],
                loading: false,
            },
        };
    },

    watch: {
        async "table.pagination.page"(value) {
            if (value) await this.getClinics();
        },

        async "table.pagination.perPage"(value) {
            if (value) {
                this.table.pagination.page = 1;
                await this.getClinics();
            }
        },

        ["table.search"]: debounce(async function () {
            await this.getClinics();
        }, 500),
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
                await this.getClinics();
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

        async getClinics() {
            this.table.loading = true;
            try {
                const route = `${apiService.baseURL()}/developer/clinics`;
                const url = new URL(route);
                const params = new URLSearchParams(url.search);
                params.set("page", this.table.pagination.page);
                params.set("per_page", this.table.pagination.perPage);
                if (this.table.search) params.set("search", this.table.search);
                const response = await apiService.get(
                    `/developer/clinics?${params}`
                );
                const result = response.data;
                this.table.pagination.total = result.pagination.total;
                this.table.items = result.data;
            } catch (error) {
                this.clinics = [];
            }

            this.table.loading = false;
        },
    },

    async created() {
        await this.getServices();
        await this.getClinics();
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
