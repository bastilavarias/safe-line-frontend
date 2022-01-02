<template>
    <section>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-sheet color="transparent" class="my-5">
                        <h1 class="title font-weight-bold text-truncate">
                            Welcome {{ user.profile.first_name }}
                            {{ user.profile.last_name }}!
                        </h1>
                        <p class="subtitle-1">How are you feeling today?</p>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-row class="mx-auto">
                <v-col cols="9">
                    <v-card rounded color="white" class="ml-n3">
                        <v-toolbar flat>
                            <v-toolbar-title class="font-weight-bold"
                                >Appointments</v-toolbar-title
                            >
                            <v-spacer></v-spacer>
                            <v-text-field
                                filled
                                hide-details
                                placeholder="Search Appointment"
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
                            :server-items-length="table.pagination.total"
                            :items-per-page.sync="table.pagination.perPage"
                            :page.sync="table.pagination.page"
                            :footer-props="{
                                'items-per-page-options':
                                    table.pagination.itemsPerPageOptions,
                            }"
                        >
                            <template v-slot:item.appointment.type="{ item }">
                                {{ item.appointment.type.replaceAll("_", " ") }}
                            </template>
                            <template
                                v-slot:item.appointment.appointment_date="{
                                    item,
                                }"
                            >
                                {{
                                    formatSimpleDate(
                                        item.appointment.appointment_date
                                    )
                                }}
                            </template>
                            <template
                                v-slot:item.appointment.appointment_time="{
                                    item,
                                }"
                            >
                                {{
                                    formatSimpleTime(
                                        item.appointment.appointment_time
                                    )
                                }}
                            </template>
                            <template
                                v-slot:item.appointment.zoom_link="{ item }"
                            >
                                <v-btn
                                    color="primary"
                                    outlined
                                    class="text-capitalize"
                                    small
                                    :href="item.appointment.zoom_link"
                                    >Open</v-btn
                                >
                            </template>
                            <template
                                v-slot:item.user.profile.image_url="{ item }"
                            >
                                <v-avatar size="30">
                                    <img
                                        :src="item.user.profile.image_url"
                                        alt=""
                                    />
                                </v-avatar>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <div class="d-flex flex-column mt-3">
                        <div class="mb-7 d-block">
                            <calendar></calendar>
                        </div>
                        <div class="d-block">
                            <reminders></reminders>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
import { FETCH_DOCTOR_APPOINTMENTS } from "@/store/action-types/appointment";
import dateMixin from "@/mixins/date";
import timeMixin from "@/mixins/time";
import { debounce } from "@/helpers";
import Calendar from "@/layouts/parts/dashboard/Calendar";
import Reminders from "@/layouts/parts/dashboard/Reminders";
export default {
    components: {
        Calendar,
        Reminders,
    },

    mixins: [dateMixin, timeMixin],

    data() {
        return {
            table: {
                headers: [
                    {
                        text: "Appointment Type",
                        value: "appointment.type",
                    },
                    {
                        text: "",
                        value: "user.profile.image_url",
                    },
                    {
                        text: "Doctor",
                        value: "user.profile.first_name",
                    },
                    {
                        text: "",
                        value: "user.profile.last_name",
                    },
                    {
                        text: "Date",
                        value: "appointment.appointment_date",
                    },
                    {
                        text: "Time",
                        value: "appointment.appointment_time",
                    },
                    {
                        text: "",
                        value: "appointment.zoom_link",
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
            selectedClinicInformation: null,
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
    watch: {
        async "table.pagination.page"(value) {
            if (value) await this.fetchAppointments();
        },

        async "table.pagination.perPage"(value) {
            if (value) {
                this.table.pagination.page = 1;
                await this.fetchAppointments();
            }
        },

        ["table.search"]: debounce(async function () {
            await this.fetchAppointments();
        }, 500),
    },

    methods: {
        async fetchAppointments() {
            this.table.loading = true;
            const result = await this.$store.dispatch(
                FETCH_DOCTOR_APPOINTMENTS
            );
            this.table.pagination.total = result.pagination.total;
            this.table.items = result.data;
            this.table.loading = false;
            console.log(result.data);
        },
    },

    async created() {
        await this.fetchAppointments();
    },
};
</script>
