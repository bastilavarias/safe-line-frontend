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
                        <v-card-subtitle>COVID-19 Services</v-card-subtitle>
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
                                >Update</v-btn
                            >
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
import apiService from "@/services/api";

const defaultForm = {
    covidService: {
        accept_walk_in: false,
        accept_covid_patient: false,
        has_testing_center: false,
    },
};

export default {
    data() {
        return {
            form: Object.assign({}, defaultForm),
            isCovidServicesActionStart: false,
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
    },

    async created() {
        if (!this.clinic) return this.$router.go(-1);

        await this.getCovidServices();
    },
};
</script>
