<template>
    <v-dialog v-model="isOpenLocal" width="800">
        <v-card>
            <v-card-title>
                <generic-status-chip
                    type="clinic-registration"
                    :status="information.status"
                    label
                    class-name="text-capitalize"
                    >{{ information.status }}</generic-status-chip
                >
                <v-spacer></v-spacer>
                <v-btn icon @click="isOpenLocal = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-list-item two-line>
                <v-list-item-avatar :size="150">
                    <v-img
                        :src="
                            require('@/assets/placeholder/clinic-information.png')
                        "
                    ></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title class="display-1 font-weight-bold">{{
                        information.name
                    }}</v-list-item-title>
                    <v-list-item-subtitle>
                        <div>
                            <v-row dense>
                                <v-col cols="6">
                                    <v-list-item two-line>
                                        <v-list-item-icon>
                                            <v-icon color="primary"
                                                >mdi-clock-outline</v-icon
                                            >
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title
                                                class="
                                                    success--text
                                                    mb-2
                                                    font-weight-bold
                                                "
                                                >Opens at:
                                                {{
                                                    formatSimpleTime(
                                                        information.opening_time
                                                    )
                                                }}</v-list-item-title
                                            >
                                            <v-list-item-title
                                                class="
                                                    error--text
                                                    mb-2
                                                    font-weight-bold
                                                "
                                                >Closes at:
                                                {{
                                                    formatSimpleTime(
                                                        information.closing_time
                                                    )
                                                }}</v-list-item-title
                                            >
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="6">
                                    <v-list-item>
                                        <v-list-item-icon>
                                            <v-icon color="primary"
                                                >mdi-map-marker</v-icon
                                            >
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                <v-card>{{
                                                    information.location.address
                                                }}</v-card>
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                            </v-row>
                        </div>
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-tabs v-model="currentTab" fixed-tabs>
                <template v-for="(tab, index) in tabs">
                    <v-tab :key="index" class="text-capitalize">{{
                        tab
                    }}</v-tab>
                </template>
            </v-tabs>
            <v-tabs-items v-model="currentTab">
                <v-tab-item>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <v-card-title class="font-weight-bold"
                                    >Services Offered</v-card-title
                                >
                            </v-col>
                            <v-col cols="12">
                                <v-card-title class="font-weight-bold"
                                    >Doctors</v-card-title
                                >
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-tab-item>
                <v-tab-item>
                    <v-card-text>{{ currentTab }}</v-card-text>
                </v-tab-item>
            </v-tabs-items>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" outlined class="text-capitalize mr-2"
                    >Reject</v-btn
                >
                <v-btn color="primary" class="text-capitalize">Approve</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import timeMixin from "@/mixins/timeMixin";
import GenericStatusChip from "@/components/generic/StatusChip";

export default {
    name: "super-admin-dashboard-clinic-information-dialog",

    components: { GenericStatusChip },

    props: {
        isOpen: Boolean,
        information: Object,
    },

    data() {
        return {
            isOpenLocal: this.isOpen,
            currentTab: 0,
        };
    },

    mixins: [timeMixin],

    computed: {
        tabs() {
            return ["General Information", "Files"];
        },
    },

    watch: {
        isOpen(value) {
            this.isOpenLocal = value;
        },

        isOpenLocal(value) {
            this.$emit("update:isOpen", value);
        },
    },
};
</script>
