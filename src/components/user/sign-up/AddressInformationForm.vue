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
                @click="signUp"
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
        form: Object,
    },

    data() {
        return {
            locationLocal: Object.assign({}, this.location),
            isSignUpStart: false,
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

    methods: {
        async signUp() {
            this.isSignUpStart = true;

            const {
                firstName,
                lastName,
                email,
                password,
                gender,
                birthday,
                phoneNumber,
                location,
            } = this.form;

            const payload = {
                user_type: "patient",
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                gender: gender,
                birthday: birthday,
                contacts: [`phone_number:${phoneNumber}`],
                latitude: location.latitude,
                longitude: location.longitude,
            };

            console.log(payload);
        },
    },
};
</script>
