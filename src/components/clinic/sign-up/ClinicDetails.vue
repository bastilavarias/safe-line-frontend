<template>
    <v-card flat>
        <v-card-title class="display-1 font-weight-bold">
            Clinic Details
        </v-card-title>
        <v-card-text>
            <v-row dense>
                <v-col cols="12" md="6">
                    <v-text-field
                        outlined
                        label="Clinic Name"
                        v-model="firstNameLocal"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        outlined
                        label="Clinic Address"
                        v-model="lastNameLocal"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <p class="font-weight-bold">Operating Hours</p>
                </v-col>
                <v-col>
                    <v-select
                        outlined
                        label="Opening"
                        :items="times"
                    ></v-select>
                    <p>am</p>
                    <v-select
                        outlined
                        label="Closing"
                        :items="times"
                    ></v-select>
                    <p>pm</p>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                class="text-capitalize"
                depressed
                @click="changeStep(2)"
                :disabled="!isFormValid"
                >Next</v-btn
            >
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            times: [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
            ],
        };
    },
};
</script>

<style></style>
