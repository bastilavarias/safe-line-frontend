<template>
    <section v-if="shouldRenderPage">
        <v-toolbar width="30rem" class="diagnose-toolbar" rounded>
            <v-text-field
                color="primary"
                placeholder="Type your symptoms here..."
                hide-details
                prepend-icon="mdi-doctor"
                single-line
                readonly
                outlined
                dense
                class="mr-2"
                @click="specialistRecommendationDialog.open = true"
            ></v-text-field>
            <v-btn icon @click="specialistRecommendationDialog.open = true">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </v-toolbar>
        <GmapMap
            :center="map.center"
            :zoom="map.zoom"
            map-type-id="terrain"
            class="map"
        >
            <template v-for="(clinic, index) in clinics">
                <GmapMarker
                    :key="index"
                    :position="{
                        lat: clinic.location.latitude,
                        lng: clinic.location.longitude,
                    }"
                    :clickable="true"
                    :draggable="false"
                />
            </template>
        </GmapMap>

        <v-dialog
            v-model="specialistRecommendationDialog.open"
            width="800"
            persistent
        >
            <v-card>
                <v-card-title>
                    <span>Specialist Recommendation</span>
                    <v-spacer></v-spacer>
                    <v-btn
                        icon
                        @click="specialistRecommendationDialog.open = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12">
                            <v-select
                                outlined
                                label="Sex"
                                :items="sexes"
                                v-model="form.sex"
                            ></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                outlined
                                label="Age"
                                type="number"
                                v-model="form.age"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-autocomplete
                                outlined
                                label="Symptoms"
                                :items="symptoms"
                                item-value="id"
                                :item-text="
                                    (item) =>
                                        `${item.name} / ${item.common_name}`
                                "
                                multiple
                                chips
                                v-model="form.symptoms"
                            >
                                <template v-slot:item="{ item }">
                                    <v-list-item-content>
                                        <v-list-item-title>{{
                                            item.name
                                        }}</v-list-item-title>
                                        <v-list-item-subtitle>{{
                                            item.common_name
                                        }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </template>
                            </v-autocomplete>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        :disabled="!isFormValid"
                        :loading="isRecommendationStart"
                        @click="getSpecialistRecommendation"
                        ><span class="mr-1">Process</span>
                        <v-icon>mdi-cogs</v-icon></v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
            v-model="recommendationResultDialog.open"
            width="500"
            persistent
        >
            <v-card v-if="recommendation">
                <v-card-title>
                    <span>Recommendation</span>
                    <v-spacer></v-spacer>
                    <v-btn
                        icon
                        @click="recommendationResultDialog.open = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12">
                            <h6 class="overline">Symptoms</h6>
                            <div class="black--text recommendation-grid-height">
                                <template
                                    v-for="(symptom, index) in selectedSymptoms"
                                >
                                    <span class="body-2 d-block">
                                        [{{ index + 1 }}]
                                        {{ symptom.common_name }}
                                    </span>
                                </template>
                            </div>
                        </v-col>
                        <v-col cols="12">
                            <h6 class="overline">Recommended Specialist</h6>
                            <span class="black--text body-2 d-block">
                                {{ recommendation.recommended_specialist.name }}
                            </span>
                        </v-col>
                        <v-col cols="12">
                            <h6 class="overline">
                                Recommended Consultation Type
                            </h6>
                            <span class="black--text body-2 d-block">
                                {{
                                    recommendation.recommended_channel ===
                                    "video_teleconsultation"
                                        ? "Video Teleconsultation"
                                        : "Personal Visit"
                                }}
                            </span>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        block
                        :loading="isFetchNearestClinicsStart"
                        @click="fetchNearestClinics"
                        >Find
                        {{ recommendation.recommended_specialist.name }}
                        Clinics</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
    </section>
</template>

<script>
import {
    FETCH_SYMPTOMS,
    GET_RECOMMENDATION,
} from "@/store/action-types/symptom";
import { calculateAge } from "@/helpers";
import { FETCH_NEAREST_CLINICS } from "@/store/action-types/clinic";

const defaultForm = {
    sex: null,
    age: null,
    symptoms: [],
};

export default {
    data() {
        return {
            shouldRenderPage: false,

            specialistRecommendationDialog: {
                open: false,
            },

            recommendationResultDialog: {
                open: false,
            },

            symptoms: [],

            sexes: ["Female", "Male"],

            form: Object.assign({}, defaultForm),

            isRecommendationStart: false,

            recommendation: null,

            formSymptomsCopy: [],

            clinics: [],

            isFetchNearestClinicsStart: false,

            map: {
                center: null,
                zoom: 15,
            },
        };
    },

    computed: {
        user() {
            const details = this.$store.state.authentication.details;
            return details.user || null;
        },

        isFormValid() {
            const { sex, age, symptoms } = this.form;
            return symptoms && symptoms.length > 0 && sex && age && age > 0;
        },

        selectedSymptoms() {
            const symptomsArrayCopy = [...this.symptoms];
            return symptomsArrayCopy.filter((symptom) =>
                this.formSymptomsCopy.includes(symptom.id)
            );
        },
    },

    methods: {
        async getSpecialistRecommendation() {
            const payload = {
                sex: this.form.sex.toLowerCase(),
                age: this.form.age,
                symptoms_id: this.form.symptoms.join(","),
            };
            this.isRecommendationStart = true;
            const result = await this.$store.dispatch(
                GET_RECOMMENDATION,
                payload
            );
            this.recommendation = Object.assign({}, result.data);
            this.specialistRecommendationDialog.open = false;
            this.recommendationResultDialog.open = true;
            this.isRecommendationStart = false;
            this.formSymptomsCopy = this.form.symptoms;
            this.form.symptoms = [];
        },

        async fetchNearestClinics() {
            const { latitude, longitude } = this.user.profile.location;
            const payload = {
                serviceID: this.recommendation.recommended_specialist.id,
                latitude,
                longitude,
            };
            this.isFetchNearestClinicsStart = true;
            const result = await this.$store.dispatch(
                FETCH_NEAREST_CLINICS,
                payload
            );

            this.clinics = [result.data];
            this.map.center = Object.assign(
                {},
                {
                    lat: this.clinics[0].location.latitude,
                    lng: this.clinics[0].location.longitude,
                }
            );
            this.recommendationResultDialog.open = false;
            this.isFetchNearestClinicsStart = false;
        },
    },

    async created() {
        this.symptoms = await this.$store.dispatch(FETCH_SYMPTOMS);
        this.form.sex = this.user.profile.gender;
        this.form.age = calculateAge(this.user.profile.birthday) || null;
        this.map.center = Object.assign(
            {},
            {
                lat: this.user.profile.location.latitude,
                lng: this.user.profile.location.longitude,
            }
        );
        this.shouldRenderPage = true;
    },
};
</script>

<style scoped>
.map {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: 1;
}

.diagnose-toolbar {
    position: fixed;
    top: 3%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
}

.recommendation-grid-height {
    max-height: 10rem;
    overflow-y: auto;
}
</style>
