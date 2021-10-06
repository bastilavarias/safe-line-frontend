<template>
    <section>
        <v-row>
            <v-col cols="12">
                <v-sheet color="transparent">
                    <h1 class="title font-weight-bold text-truncate mb-5">
                        Welcome {{ user.profile.first_name }}
                        {{ user.profile.last_name }}!
                    </h1>
                    <v-row>
                        <v-col cols="12" lg="10" xl="8">
                            <v-row dense>
                                <template v-for="n in 4">
                                    <v-col cols="12" lg="3" :key="n">
                                        <super-admin-dashboard-information-card></super-admin-dashboard-information-card>
                                    </v-col>
                                </template>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
            <v-col cols="12">
                <v-card rounded color="white">
                    <v-toolbar flat>
                        <v-toolbar-title class="font-weight-bold"
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
                        ></v-text-field>
                    </v-toolbar>
                    <v-data-table
                        :loading="isFetchClinicsStart"
                        :headers="table.headers"
                        :items="table.items"
                        :server-items-length="table.pagination.total"
                    >
                        <template v-slot:item.action>
                            <v-btn
                                color="primary"
                                outlined
                                class="text-capitalize"
                                small
                                >Open</v-btn
                            >
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </section>
</template>

<script>
import SuperAdminDashboardInformationCard from "@/components/super-admin/dashboard/InformationCard";
import { FETCH_CLINICS } from "@/store/action-types/clinic";
export default {
    components: { SuperAdminDashboardInformationCard },

    data() {
        return {
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
                        text: "Status",
                        value: "status",
                    },

                    {
                        text: "Created At",
                        value: "created_at",
                    },

                    {
                        text: "Action",
                        value: "action",
                    },
                ],
                pagination: {
                    page: 1,
                    perPage: 10,
                    total: 0,
                },
                search: null,
                items: [],
            },
            isFetchClinicsStart: false,
        };
    },

    computed: {
        user() {
            const details = this.$store.state.authentication.details;
            return details.user || null;
        },
    },

    methods: {
        async fetchClinics() {
            const payload = {
                ...this.table.pagination,
                search: null,
            };

            this.isFetchClinicsStart = true;
            const result = await this.$store.dispatch(FETCH_CLINICS, payload);
            this.table.pagination.total = result.pagination.total;
            this.table.items = result.data;
            this.isFetchClinicsStart = false;
        },
    },

    async created() {
        await this.fetchClinics();
    },
};
</script>
