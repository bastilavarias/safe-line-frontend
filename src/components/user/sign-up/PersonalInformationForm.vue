<template>
    <v-card flat>
        <v-card-title class="display-1 font-weight-bold"
            >Personal Information</v-card-title
        >
        <v-card-text>
            <v-row dense>
                <v-col cols="12">
                    <v-select
                        outlined
                        label="Gender"
                        :items="genders"
                    ></v-select>
                </v-col>
                <v-col cols="12">
                    <b-date-picker
                        v-model="sampleDate"
                        label="Birth Date"
                        outlined
                    ></b-date-picker>
                </v-col>
                <v-col cols="12">
                    <v-text-field label="Phone Number" outlined></v-text-field>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-btn
                color="primary"
                class="text-capitalize"
                outlined
                depressed
                @click="changeStep(1)"
                >Back</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                class="text-capitalize"
                depressed
                @click="changeStep(3)"
                >Next</v-btn
            >
        </v-card-actions>
    </v-card>
</template>
<script>
import BDatePicker from "@/components/base/DatePicker";
export default {
    components: { BDatePicker },

    props: {
        changeStep: Function,
    },

    data() {
        return {
            genders: [
                "Female",
                "Male",
                "Other (probably with an input field to specify)",
                "I'd rather not say",
            ],

            sampleDate: "2021-09-30",
        };
    },
};
</script>
