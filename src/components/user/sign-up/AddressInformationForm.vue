<template>
    <v-card flat>
        <v-card-title class="display-1 font-weight-bold"
            >Address Information</v-card-title
        >
        <v-card-text>
            <v-row dense>
                <v-col cols="12">
                    <places-autocomplete
                        v-model="locationLocal"
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
            <v-btn
                color="primary"
                class="text-capitalize"
                depressed
                :disabled="!isFormValid"
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
        location: Object,
    },

    data() {
        return {
            locationLocal: Object.assign({}, this.location),
        };
    },

    computed: {
        isFormValid() {
            const { address, latitude, longitude } = this.locationLocal;
            return address && latitude && longitude;
        },
    },

    watch: {
        locationLocal(value) {
            this.$emit("update:location", value);
        },
    },
};
</script>
