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
                <v-col cols="8">
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
                            <template v-slot:item.created_at="{ item }">
                                {{ formatSimpleDate(item.created_at) }}
                            </template>
                            <template v-slot:item.status="{ item }">
                                <generic-status-chip
                                    type="clinic-registration"
                                    :status="item.status"
                                    class-name="text-uppercase"
                                    small
                                    >{{ item.status }}</generic-status-chip
                                >
                            </template>
                            <template v-slot:item.action="{ item }">
                                <v-btn
                                    color="primary"
                                    outlined
                                    class="text-capitalize"
                                    small
                                    @click="openClinicInformationDialog(item)"
                                    >Open</v-btn
                                >
                            </template>
                        </v-data-table>
                    </v-card>
                </v-col>
                <v-col cols="4">
                    <div class="d-flex flex-column mt-3">
                        <div class="mb-7 ml-3 d-block">
                            <calendar></calendar>
                        </div>
                        <div class="d-block">
                            <reminders></reminders>
                        </div>
                    </div>
                </v-col>
            </v-row>
            <super-admin-dashboard-clinic-information-dialog
                :is-open.sync="isClinicInformationDialogOpen"
                :information.sync="selectedClinicInformation"
                :fetch-clinics="fetchClinics"
                v-if="selectedClinicInformation"
            ></super-admin-dashboard-clinic-information-dialog>
        </v-container>
    </section>
</template>

<script>
import SuperAdminDashboardClinicInformationDialog from "@/components/super-admin/dashboard/ClinicInformationDialog";
import { FETCH_CLINICS } from "@/store/action-types/clinic";
import GenericStatusChip from "@/components/generic/StatusChip";
import dateMixin from "@/mixins/date";
import { debounce } from "@/helpers";
import Calendar from "@/layouts/parts/dashboard/Calendar";
import Reminders from "@/layouts/parts/dashboard/Reminders";
export default {
    components: {
        Calendar, 
        Reminders,
        SuperAdminDashboardClinicInformationDialog,
        GenericStatusChip,
    },

    mixins: [dateMixin],

    data() {
        return {
            table: {
                headers: [
                    {
                        text: "Doctor",
                        value: "name",
                    },

                    {
                        text: "Schedule",
                        value: "location.address",
                    },

                    {
                        text: "Status",
                        value: "status",
                    },
                    {
                        text: "",
                        value: "action",
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
            isClinicInformationDialogOpen: false,
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
            if (value) await this.fetchClinics();
        },

        async "table.pagination.perPage"(value) {
            if (value) {
                this.table.pagination.page = 1;
                await this.fetchClinics();
            }
        },

        ["table.search"]: debounce(async function () {
            await this.fetchClinics();
        }, 500),
    },

    methods: {
        async fetchClinics() {
            const payload = {
                ...this.table.pagination,
                search: this.table.search || null,
            };

            this.table.loading = true;
            const result = await this.$store.dispatch(FETCH_CLINICS, payload);
            this.table.pagination.total = result.pagination.total;
            this.table.items = result.data;
            this.table.loading = false;
        },

        openClinicInformationDialog(clinic) {
            this.selectedClinicInformation = Object.assign({}, clinic);
            this.isClinicInformationDialogOpen = true;
            console.log(this.selectedClinicInformation);
        },
    },

    async created() {
        await this.fetchClinics();
    },
};
</script>
