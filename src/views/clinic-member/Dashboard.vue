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
                                    @click="openViewDialog(item)"
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

        <v-dialog
            width="600"
            persistent
            v-model="isViewDialogOpen"
            v-if="isViewDialogOpen"
        >
            <v-card>
                <v-card-title>
                    <span>Appointment Information</span>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="isViewDialogOpen = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-card-text>
                    <v-row dense>
                        <v-col cols="12">
                            <v-text-field
                                outlined
                                label="Doctor"
                                readonly
                                :value="
                                    extractMembersName(
                                        selectedAppointment,
                                        'doctor'
                                    )
                                "
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                outlined
                                label="Patient"
                                readonly
                                :value="
                                    extractMembersName(
                                        selectedAppointment,
                                        'patient'
                                    )
                                "
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-select
                                item-text-="text"
                                item-value="value"
                                label="Appointment Type"
                                outlined
                                :items="appointmentTypes"
                                v-model="selectedAppointment.type"
                            ></v-select>
                        </v-col>

                        <v-col cols="12" md="6">
                            <b-date-picker
                                outlined
                                label="Date"
                                v-model="selectedAppointment.appointment_date"
                            ></b-date-picker>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-menu
                                ref="menu"
                                v-model="menu2"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="
                                    selectedAppointment.appointment_time
                                "
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        outlined
                                        placeholder="Select Time"
                                        append-icon="mdi-clock-time-four-outline"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        :value="
                                            formatAMPM(
                                                selectedAppointment.appointment_time
                                            )
                                        "
                                    ></v-text-field>
                                </template>
                                <v-time-picker
                                    v-if="menu2"
                                    v-model="
                                        selectedAppointment.appointment_time
                                    "
                                    full-width
                                    @click:minute="
                                        $refs.menu.save(
                                            selectedAppointment.appointment_time
                                        )
                                    "
                                ></v-time-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="error" depressed>
                        <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        depressed
                        :loading="isActionStart"
                        @click="updateAppointment"
                    >
                        <span class="text-capitalize mr-1">Re-Schedule</span>
                        <v-icon>mdi-calendar-edit</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar.open" color="success" :timeout="3000">
            {{ snackbar.text }}
            <template v-slot:action="{ attrs }">
                <v-btn
                    color="white"
                    text
                    v-bind="attrs"
                    @click="snackbar.open = false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </section>
</template>

<script>
import {
    CREATE_APPOINTMENT,
    FETCH_CLINIC_APPOINTMENTS,
    UPDATE_APPOINTMENT,
} from "@/store/action-types/appointment";
import Calendar from "@/layouts/parts/dashboard/Calendar";
import Reminders from "@/layouts/parts/dashboard/Reminders";
import dateMixin from "@/mixins/date";
import BDatePicker from "@/components/base/DatePicker";
export default {
    components: {
        BDatePicker,
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
            menu2: false,

            selectedAppointment: null,
            isViewDialogOpen: false,
            isActionStart: false,

            error: null,
            snackbar: {
                open: false,
                text: null,
            },
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

        appointmentTypes() {
            return [
                {
                    text: "Personal Visit",
                    value: "personal_visit",
                },

                {
                    text: "Video Teleconsultation",
                    value: "video_teleconsultation",
                },
            ];
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

        openViewDialog(item) {
            this.selectedAppointment = Object.assign({}, item);
            this.isViewDialogOpen = true;
        },

        async updateAppointment() {
            this.isActionStart = true;
            const { id, type, appointment_time, appointment_date } =
                this.selectedAppointment;
            const payload = {
                _method: "PUT",
                appointment_id: id,
                type,
                time: appointment_time,
                date: appointment_date,
            };
            const result = await this.$store.dispatch(
                UPDATE_APPOINTMENT,
                payload
            );

            if (!result.success) {
                this.isActionStart = false;
                return (this.error = result.message);
            }

            this.isActionStart = false;
            this.isViewDialogOpen = false;
            this.snackbar.open = true;
            this.snackbar.text = "Appointment has been scheduled.";
            this.selectedAppointment = Object.assign({});
            await this.fetchAppointments();
        },
    },
    async created() {
        await this.fetchAppointments();
    },
};
</script>
