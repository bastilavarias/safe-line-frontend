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
                            <!--                            <v-text-field-->
                            <!--                                filled-->
                            <!--                                hide-details-->
                            <!--                                placeholder="Search Appointment"-->
                            <!--                                dense-->
                            <!--                                rounded-->
                            <!--                                prepend-inner-icon="mdi-magnify"-->
                            <!--                                v-model="table.search"-->
                            <!--                            ></v-text-field>-->
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
                            <template v-slot:item.id="{ item }">
                                <span class="font-weight-bold"
                                    >#{{ item.id }}</span
                                >
                            </template>
                            <template v-slot:item.doctor="{ item }">
                                {{ extractMembersName(item, "doctor") }}
                            </template>

                            <template v-slot:item.patient="{ item }">
                                {{ extractMembersName(item, "patient") }}
                            </template>

                            <template v-slot:item.type="{ item }">
                                <span class="text-capitalize">
                                    {{ item.type.replaceAll("_", " ") }}
                                </span>
                            </template>
                            <template v-slot:item.date_time="{ item }">
                                {{ formatSimpleDate(item.appointment_date) }}
                                {{ formatAMPM(item.appointment_time) }}
                            </template>
                            <template v-slot:item.action="{ item }">
                                <v-btn
                                    color="primary"
                                    depressed
                                    small
                                    class="text-capitalize"
                                    :disabled="item.type === 'personal_visit'"
                                    target="_blank"
                                    :href="item.zoom_link"
                                    >Open</v-btn
                                >
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
import {
    FETCH_DOCTOR_APPOINTMENTS,
    FETCH_PATIENT_APPOINTMENTS,
} from "@/store/action-types/appointment";
import dateMixin from "@/mixins/date";
import timeMixin from "@/mixins/time";
import { debounce } from "@/helpers";
import Calendar from "@/layouts/parts/dashboard/Calendar";
import Reminders from "@/layouts/parts/dashboard/Reminders";
import nameMixin from "@/mixins/name";
export default {
    components: {
        Calendar,
        Reminders,
    },

    mixins: [dateMixin, timeMixin, nameMixin],

    data() {
        return {
            table: {
                headers: [
                    {
                        text: "ID #",
                        value: "id",
                        sortable: false,
                    },

                    {
                        text: "Doctor",
                        value: "doctor",
                        sortable: false,
                    },

                    {
                        text: "Date & Time",
                        value: "date_time",
                        sortable: false,
                    },

                    {
                        text: "Type",
                        value: "type",
                        sortable: false,
                    },

                    {
                        text: "",
                        value: "action",
                        sortable: false,
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
                FETCH_PATIENT_APPOINTMENTS
            );
            this.table.pagination.total = result.pagination.total;
            this.table.items = result.data;
            this.table.loading = false;
        },
    },

    async created() {
        await this.fetchAppointments();
    },
};
</script>
