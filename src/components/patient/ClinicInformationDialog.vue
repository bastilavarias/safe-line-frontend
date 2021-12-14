<template>
    <v-dialog v-model="isOpenLocal" width="800">
        <v-card :loading="isUpdateClinicStatusStart">
            <v-alert outlined type="error" v-if="error">
                {{ error }}
            </v-alert>
            <v-card-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="isOpenLocal = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-list-item two-line>
                    <v-list-item-avatar :size="150">
                        <v-img
                            :src="
                                require('@/assets/placeholder/clinic-information.png')
                            "
                        ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title
                            class="
                                display-1
                                font-weight-bold
                                d-flex
                                justify-space-between
                            "
                            >{{ informationLocal.name }}

                            <generic-status-chip
                                type="clinic-registration"
                                :status="informationLocal.status"
                                label
                                class-name="text-capitalize"
                                >{{
                                    informationLocal.status
                                }}</generic-status-chip
                            >
                        </v-list-item-title>
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
                                                            informationLocal.opening_time
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
                                                            informationLocal.closing_time
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
                                                        informationLocal
                                                            .location.address
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
            </v-card-text>
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
                                <v-card-text>
                                    <v-slide-group show-arrows>
                                        <template
                                            v-for="(
                                                service, index
                                            ) in informationLocal.clinic_services"
                                        >
                                            <v-slide-item :key="service.id">
                                                <div
                                                    :class="`
                                                        d-flex
                                                        justify-center
                                                        align-center
                                                        flex-column
                                                        ${
                                                            index !==
                                                            information
                                                                .clinic_services
                                                                .length -
                                                                1
                                                                ? 'mr-5'
                                                                : ''
                                                        }
                                                    `"
                                                >
                                                    <v-avatar
                                                        :size="50"
                                                        class="mb-3"
                                                        color="#C3C3C3"
                                                    ></v-avatar>
                                                    <span class="subtitle-2">
                                                        {{
                                                            service.service.name
                                                        }}
                                                    </span>
                                                </div>
                                            </v-slide-item>
                                        </template>
                                    </v-slide-group>
                                </v-card-text>
                            </v-col>
                            <v-col
                                cols="12"
                                v-if="
                                    informationLocal.clinic_members.length > 0
                                "
                            >
                                <v-card-title class="font-weight-bold"
                                    >Members</v-card-title
                                >
                                <v-card-text>
                                    <v-slide-group show-arrows>
                                        <template
                                            v-for="(
                                                member, index
                                            ) in informationLocal.clinic_members"
                                        >
                                            <v-slide-item :key="member.id">
                                                <div
                                                    :class="`
                                                        d-flex
                                                        justify-center
                                                        align-center
                                                        flex-column
                                                        ${
                                                            index !==
                                                            information
                                                                .clinic_members
                                                                .length -
                                                                1
                                                                ? 'mr-5'
                                                                : ''
                                                        }
                                                    `"
                                                >
                                                    <v-avatar
                                                        :size="50"
                                                        class="mb-3"
                                                        color="#C3C3C3"
                                                    >
                                                        <v-img
                                                            :src="
                                                                member.user
                                                                    .profile
                                                                    .image_url
                                                            "
                                                        ></v-img>
                                                    </v-avatar>
                                                    <span
                                                        class="
                                                            subtitle-2
                                                            text-capitalize
                                                        "
                                                    >
                                                        {{
                                                            member.user.profile
                                                                .first_name
                                                        }}
                                                        {{
                                                            member.user.profile
                                                                .last_name
                                                        }}
                                                    </span>
                                                    <span
                                                        class="
                                                            caption
                                                            text-uppercase
                                                        "
                                                    >
                                                        {{ member.member_type }}
                                                    </span>
                                                </div>
                                            </v-slide-item>
                                        </template>
                                    </v-slide-group>
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-tab-item>
                <v-tab-item>
                    <v-row>
                        <v-col cols="12">
                            <v-card-title class="font-weight-bold"
                                >Clinic Files</v-card-title
                            >
                            <v-card-text>
                                <v-card max-width="200" max-height="160">
                                    <v-img
                                        src="@/assets/placeholder/dummy.jpg"
                                        height="110"
                                    ></v-img>
                                    <v-card-text class="font-weight-bold">
                                        Business Permit
                                    </v-card-text>
                                </v-card>
                            </v-card-text>
                        </v-col>
                    </v-row>
                </v-tab-item>
            </v-tabs-items>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary">Request Appointment</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import time from "@/mixins/time";
import GenericStatusChip from "@/components/generic/StatusChip";

export default {
    name: "patient-clinic-information-dialog",

    components: { GenericStatusChip },

    props: {
        isOpen: Boolean,
        information: Object,
    },

    data() {
        return {
            isOpenLocal: this.isOpen,
            currentTab: 0,
            isUpdateClinicStatusStart: false,
            informationLocal: Object.assign({}, this.information),
            error: null,
        };
    },

    mixins: [time],

    computed: {
        tabs() {
            return ["General Information"];
        },

        isStatusPending() {
            return this.informationLocal.status === "pending";
        },
    },

    watch: {
        isOpen(value) {
            this.isOpenLocal = value;
        },

        isOpenLocal(value) {
            this.$emit("update:isOpen", value);
        },

        information(value) {
            this.informationLocal = value;
        },

        informationLocal(value) {
            this.$emit("update:information", value);
        },
    },
};
</script>
