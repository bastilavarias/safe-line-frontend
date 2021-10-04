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
                    <v-data-table :headers="table.headers"></v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </section>
</template>

<script>
import SuperAdminDashboardInformationCard from "@/components/super-admin/dashboard/InformationCard";
export default {
    components: { SuperAdminDashboardInformationCard },

    data() {
        return {
            table: {
                headers: [
                    {
                        text: "Clinic Name",
                    },

                    {
                        text: "Address",
                    },

                    {
                        text: "Status",
                    },

                    {
                        text: "Created At",
                    },

                    {
                        text: "Action",
                    },
                ],
            },
        };
    },

    computed: {
        user() {
            const details = this.$store.state.authentication.details;
            return details.user || null;
        },
    },
};
</script>
