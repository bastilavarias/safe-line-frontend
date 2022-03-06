<template>
    <section>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-sheet color="transparent">
                        <h1 class="title font-weight-bold text-truncate mb-5">
                            Welcome {{ user.profile.first_name }}
                            {{ user.profile.last_name }}!
                        </h1>
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
                            <template v-slot:item.patient_name="{ item }">
                                <v-avatar size="30" class="mr-2">
                                    <img
                                        :src="item.user.profile.image_url"
                                        alt=""
                                    />
                                </v-avatar>
                                <span>
                                    {{ item.user.profile.first_name }}
                                    {{ item.user.profile.last_name }}
                                </span>
                            </template>

                            <template v-slot:item.appointment.type="{ item }">
                                <span class="text-capitalize">
                                    {{
                                        item.appointment.type.replaceAll(
                                            "_",
                                            " "
                                        )
                                    }}
                                </span>
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
import { FETCH_PATIENT_APPOINTMENTS } from "@/store/action-types/appointment";
import Calendar from "@/layouts/parts/dashboard/Calendar";
import Reminders from "@/layouts/parts/dashboard/Reminders";
import dateMixin from "@/mixins/date";
import timeMixin from "@/mixins/time";
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
                        text: "Patient",
                        value: "patient_name",
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
        user() {
            const details = this.$store.state.authentication.details;
            return details.user || null;
        },
    },
    methods: {
        async fetchAppointments() {
            const patientID = 2;

            this.table.loading = true;
            const result = await this.$store.dispatch(
                FETCH_PATIENT_APPOINTMENTS,
                patientID
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
