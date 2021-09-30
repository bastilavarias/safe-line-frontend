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
                        v-model="genderLocal"
                    ></v-select>
                </v-col>
                <v-col cols="12">
                    <b-date-picker
                        v-model="birthdayLocal"
                        label="Birthday"
                        outlined
                    ></b-date-picker>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Cellphone Number (11 Digits)"
                        outlined
                        v-model="phoneNumberLocal"
                        :counter="11"
                        :rules="[
                            (v) =>
                                v.length === 11 ||
                                'You must enter 11 digits cellphone number',
                        ]"
                    ></v-text-field>
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
                :disabled="!isFormValid"
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
        gender: String,
        birthday: String,
        phoneNumber: String,
    },

    data() {
        return {
            genders: ["Female", "Male", "I'd rather not say"],
            genderLocal: this.gender,
            birthdayLocal: this.birthday,
            phoneNumberLocal: this.phoneNumber,
        };
    },

    computed: {
        isFormValid() {
            return (
                this.genderLocal &&
                this.birthdayLocal &&
                this.phoneNumberLocal &&
                this.phoneNumberLocal.length === 11
            );
        },
    },

    watch: {
        genderLocal(value) {
            this.$emit("update:gender", value);
        },

        birthdayLocal(value) {
            this.$emit("update:birthday", value);
        },

        phoneNumberLocal(value) {
            this.$emit("update:phoneNumber", value);
        },
    },
};
</script>
