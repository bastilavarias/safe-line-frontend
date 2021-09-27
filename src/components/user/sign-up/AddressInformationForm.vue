<template>
    <v-card flat>
        <v-card-title class="display-1 font-weight-bold"
            >Address Information</v-card-title
        >
        <v-card-text>
            <v-row dense>
                <v-col cols="12">
                    <places-autocomplete
                        v-model="samplevalue"
                    ></places-autocomplete>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-btn
                color="primary"
                class="text-capitalize"
                outlined
                depressed
                @click="changeStep(2)"
                >Back</v-btn
            >
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="text-capitalize" depressed disabled
                >Sign Up</v-btn
            >
        </v-card-actions>
    </v-card>
</template>
<script>
import PlacesAutocomplete from "@/components/base/PlacesAutocomplete";
export default {
    components: { PlacesAutocomplete },
    props: {
        changeStep: Function,
    },

    data() {
        return {
            samplevalue: {
                address:
                    "406 Sta. Fe, Tondo, Manila, 1013 Metro Manila, Philippines",
                longitude: "120.9612243",
                latitude: "14.6142909",
            },
        };
    },
};
</script>
