<template>
    <v-card flat>
        <v-card-title class="font-weight-bold text-truncate"
            >Welcome {{ user.profile.first_name }}
            {{ user.profile.last_name }}!</v-card-title
        >
        <v-card-text>
            <v-row>
                <v-col cols="12" lg="6">
                    <v-row dense>
                        <v-col cols="12" lg="4">
                            <super-admin-dashboard-information-card></super-admin-dashboard-information-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
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
