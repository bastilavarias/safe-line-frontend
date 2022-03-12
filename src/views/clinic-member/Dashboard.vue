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
                            <!--                            <v-text-field-->
                            <!--                                filled-->
                            <!--                                hide-details-->
                            <!--                                placeholder="Search Appointment"-->
                            <!--                                dense-->
                            <!--                                rounded-->
                            <!--                                prepend-inner-icon="mdi-magnify"-->
                            <!--                                v-model="table.search"-->
                            <!--                            ></v-text-field>-->
                            <!--                          -->
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
                                    >View</v-btn
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
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
import {
    FETCH_CLINIC_APPOINTMENTS,
    FETCH_PATIENT_APPOINTMENTS,
} from "@/store/action-types/appointment";
import Calendar from "@/layouts/parts/dashboard/Calendar";
import Reminders from "@/layouts/parts/dashboard/Reminders";
import dateMixin from "@/mixins/date";
export default {
    components: {
        Calendar,
        Reminders,
    },

    mixins: [dateMixin],

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
                        text: "Patient",
                        value: "patient",
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
                    total: undefined,
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

        clinic() {
            const details = this.$store.state.authentication.details;
            return details.clinic || null;
        },
    },
    methods: {
        async fetchAppointments() {
            this.table.loading = true;
            const result = await this.$store.dispatch(
                FETCH_CLINIC_APPOINTMENTS,
                this.clinic.id
            );
            this.table.items = result.data;
            this.table.pagination.total = this.table.items.length;
            this.table.loading = false;
            console.log(result.data);
        },

        extractMembersName({ appointment_members = [] }, type) {
            const index = type === "doctor" ? 0 : 1;
            const { first_name, last_name } =
                appointment_members[index].user.profile;
            return `${first_name} ${last_name}`;
        },
    },
    async created() {
        await this.fetchAppointments();
    },
};
</script>
