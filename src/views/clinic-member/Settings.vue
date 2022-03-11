<template>
    <section>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <h1 class="title font-weight-bold text-truncate mb-5">
                        Settings
                    </h1>
                </v-col>

                <v-col cols="12">
                    <v-card outlined :loading="isCovidServicesActionStart">
                        <v-card-title>COVID-19 Services</v-card-title>
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="12">
                                    <v-alert
                                        outlined
                                        type="error"
                                        icon="mdi-virus"
                                    >
                                        Coronavirus disease (COVID-19) is an
                                        infectious disease caused by the
                                        SARS-CoV-2 virus.
                                    </v-alert>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-checkbox
                                        color="primary"
                                        label="Accept Walk In"
                                        v-model="
                                            form.covidService.accept_walk_in
                                        "
                                    ></v-checkbox>

                                    <v-checkbox
                                        color="primary"
                                        label="Accept COVID-19 Patient"
                                        v-model="
                                            form.covidService
                                                .accept_covid_patient
                                        "
                                    ></v-checkbox>

                                    <v-checkbox
                                        color="primary"
                                        label="Has Testing Center"
                                        v-model="
                                            form.covidService.has_testing_center
                                        "
                                    ></v-checkbox>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary"
                                depressed
                                class="text-capitalize"
                                @click="updateCovidServices"
                                >Update</v-btn
                            >
                        </v-card-actions>
                    </v-card>
                </v-col>

                <v-col cols="12">
                    <v-card outlined :loading="isClinicMembersActionStart">
                        <v-card-title>Clinic Members</v-card-title>
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="12">
                                    <div class="subtitle-1">
                                        Add Clinic Member
                                    </div>
                                </v-col>

                                <v-col cols="12" v-if="clinicMemberFormError">
                                    <v-alert outlined type="error">
                                        {{ clinicMemberFormError }}
                                    </v-alert>
                                </v-col>

                                <v-col cols="12">
                                    <v-row dense>
                                        <v-col cols="12" md="3">
                                            <v-select
                                                dense
                                                outlined
                                                label="Type"
                                                :items="memberTypes"
                                                item-text="text"
                                                item-value="value"
                                                v-model="
                                                    form.clinicMember
                                                        .member_type
                                                "
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="12" md="8">
                                    <v-row dense>
                                        <v-col cols="12" md="6">
                                            <v-text-field
                                                outlined
                                                dense
                                                label="First Name"
                                                v-model="
                                                    form.clinicMember.first_name
                                                "
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field
                                                outlined
                                                dense
                                                label="Last Name"
                                                v-model="
                                                    form.clinicMember.last_name
                                                "
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        outlined
                                        dense
                                        type="email"
                                        label="E-mail"
                                        v-model="form.clinicMember.email"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-select
                                        dense
                                        outlined
                                        label="Gender"
                                        :items="genders"
                                        v-model="form.clinicMember.gender"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <b-date-picker
                                        label="Birthday"
                                        dense
                                        outlined
                                        v-model="form.clinicMember.birthday"
                                    ></b-date-picker>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <places-autocomplete
                                        placeholder="Search Address"
                                        dense
                                        v-model="form.clinicMember.location"
                                    ></places-autocomplete>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary"
                                depressed
                                class="text-capitalize"
                                :loading="isClinicMembersActionStart"
                                @click="createClinicMember"
                                >Create</v-btn
                            >
                        </v-card-actions>
                        <v-data-table
                            :loading="table.loading"
                            :headers="table.headers"
                            :items="table.items"
                            :items-per-page.sync="table.pagination.perPage"
                            :page.sync="table.pagination.page"
                            :footer-props="{
                                'items-per-page-options':
                                    table.pagination.itemsPerPageOptions,
                            }"
                        >
                            <template v-slot:item.member_type="{ item }">
                                <span class="text-capitalize">{{
                                    item.member_type
                                }}</span>
                            </template>

                            <template v-slot:item.name="{ item }">
                                <span class="text-capitalize">
                                    {{ item.user.profile.first_name }}
                                    {{ item.user.profile.last_name }}</span
                                >
                            </template>

                            <template
                                v-slot:item.user.profile.birthday="{ item }"
                            >
                                {{
                                    formatSimpleDate(item.user.profile.birthday)
                                }}
                            </template>
                        </v-data-table>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
import apiService from "@/services/api";
import dateMixin from "@/mixins/date";
import BDatePicker from "@/components/base/DatePicker";
import PlacesAutocomplete from "@/components/base/PlacesAutocomplete";

const defaultForm = {
    covidService: {
        accept_walk_in: false,
        accept_covid_patient: false,
        has_testing_center: false,
    },

    clinicMember: {
        location: {
            address: null,
            latitude: null,
            longitude: null,
        },
        first_name: null,
        last_name: null,
        gender: null,
        birthday: null,
        member_type: null,
        email: null,
    },
};

export default {
    components: { PlacesAutocomplete, BDatePicker },
    mixins: [dateMixin],

    data() {
        return {
            form: Object.assign({}, defaultForm),
            isCovidServicesActionStart: false,
            isClinicMembersActionStart: false,
            clinicMemberFormError: null,

            table: {
                headers: [
                    {
                        text: "Type",
                        value: "member_type",
                    },

                    {
                        text: "Name",
                        value: "name",
                    },

                    {
                        text: "E-mail",
                        value: "user.email",
                    },

                    {
                        text: "Gender",
                        value: "user.profile.gender",
                    },

                    {
                        text: "Birthday",
                        value: "user.profile.birthday",
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

            genders: ["Male", "Female"],
            memberTypes: [
                {
                    text: "Admin",
                    value: "admin",
                },
                {
                    text: "Doctor",
                    value: "doctor",
                },
                {
                    text: "Customer Service Representative",
                    value: "csr",
                },
            ],
        };
    },

    computed: {
        clinic() {
            const details = this.$store.state.authentication.details;
            return details.clinic || null;
        },
    },

    methods: {
        async getCovidServices() {
            this.isCovidServicesActionStart = true;
            try {
                const response = await apiService.get(
                    `/clinics/covid/services/${this.clinic.id}`
                );
                const result = response.data.data;
                this.form = Object.assign(
                    {},
                    {
                        ...this.form,
                        covidService: {
                            accept_walk_in: result.accept_walk_in,
                            accept_covid_patient: result.accept_covid_patient,
                            has_testing_center: result.has_testing_center,
                        },
                    }
                );
            } catch (error) {
                this.form = Object.assign({}, defaultForm);
            }

            this.isCovidServicesActionStart = false;
        },

        async getClinicMembers() {
            this.isClinicMembersActionStart = true;
            try {
                const response = await apiService.get(
                    `/clinics/${this.clinic.id}/members`
                );
                this.table.items = response.data.data;
            } catch (error) {
                this.table.items = [];
            }

            this.table.pagination.total = this.table.items.length;
            this.isClinicMembersActionStart = false;
        },

        async updateCovidServices() {
            this.isCovidServicesActionStart = true;
            try {
                const payload = {
                    clinic_id: this.clinic.id,
                    ...this.form.covidService,
                    _method: "PUT",
                };
                const response = await apiService.post(
                    "/clinics/covid/services",
                    payload
                );
                const result = response.data.data;
                this.form = Object.assign(
                    {},
                    {
                        ...this.form,
                        covidService: {
                            accept_walk_in: result.accept_walk_in,
                            accept_covid_patient: result.accept_covid_patient,
                            has_testing_center: result.has_testing_center,
                        },
                    }
                );
            } catch (error) {
                this.form = Object.assign({}, defaultForm);
            }

            this.isCovidServicesActionStart = false;
        },

        async createClinicMember() {
            this.isClinicMembersActionStart = true;
            try {
                const payload = {
                    clinic_id: this.clinic.id,
                    ...this.form.clinicMember,
                    password: "password",
                    address: this.form.clinicMember.location.address || null,
                    latitude: this.form.clinicMember.location.latitude || null,
                    longitude:
                        this.form.clinicMember.location.longitude || null,
                    contacts: "Number:09123456789",
                };
                await apiService.post("/clinics/members", payload);
                await this.getClinicMembers();
                this.clearClinicMemberForm();
            } catch (error) {
                this.clinicMemberFormError =
                    error.response.data.message || "Something went wrong.";
            }

            this.isClinicMembersActionStart = false;
        },

        clearClinicMemberForm() {
            this.form.clinicMember.member_type = null;
            this.form.clinicMember.first_name = null;
            this.form.clinicMember.last_name = null;
            this.form.clinicMember.email = null;
            this.form.clinicMember.gender = null;
            this.form.clinicMember.birthday = null;
            this.form.clinicMember.location.address = null;
            this.form.clinicMember.location.latitude = null;
            this.form.clinicMember.location.longitude = null;
        },
    },

    async created() {
        if (!this.clinic) return this.$router.go(-1);

        await this.getCovidServices();
        await this.getClinicMembers();
    },
};
</script>
