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
                <v-card rounded>
                    <v-card>
                        <v-card-title class="font-weight-bold"
                            >Clinics
                        </v-card-title>
                    </v-card>
                </v-card>
            </v-col>
        </v-row>
    </section>
</template>

<script>
import SuperAdminDashboardInformationCard from "@/components/super-admin/dashboard/InformationCard";
export default {
    components: { SuperAdminDashboardInformationCard },
    computed: {
        user() {
            const details = this.$store.state.authentication.details;
            return details.user || null;
        },
    },
};
</script>
