<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" width="600px" persistent>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    class="text-capitalize"
                    color="primary"
                    dark
                    text
                    v-bind="attrs"
                    v-on="on"
                >
                    Create Clinic
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Add clinic</span>
                </v-card-title>
                <v-container>
                    <v-row class="d-flex flex-column px-3">
                        <v-card-subtitle class="text-h6">
                            Clinic details
                        </v-card-subtitle>
                        <v-col cols="">
                            <v-text-field
                                outlined
                                label="Clinic name"
                                v-model="form.name"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="" class="mt-n8">
                            <places-autocomplete
                                placeholder="Search Address"
                                v-model="form.location"
                            ></places-autocomplete>
                        </v-col>
                        <v-card-subtitle class="text-h6 mt-n8">
                            Operating hours
                        </v-card-subtitle>
                        <v-row class="px-3">
                            <v-col cols="4">
                                <v-select
                                    v-model="form.opening_time"
                                    outlined
                                    label="Opening time"
                                    :items="timetable"
                                ></v-select>
                            </v-col>
                            <v-col cols="2">
                                <v-card-subtitle> AM </v-card-subtitle>
                            </v-col>
                            <v-col cols="4">
                                <v-select
                                    v-model="form.closing_time"
                                    outlined
                                    label="Closing time"
                                    :items="timetable"
                                ></v-select>
                            </v-col>
                            <v-col cols="2">
                                <v-card-subtitle> PM </v-card-subtitle>
                            </v-col>
                        </v-row>
                        <v-card-subtitle class="text-h6 mt-n5">
                            Services
                        </v-card-subtitle>
                        <v-col class="mt-n5">
                            <v-select
                                v-model="form.clinicServicesContent"
                                outlined
                                label="Select services"
                                chips
                                multiple
                                :items="services.items"
                                item-value="id"
                                item-text="name"
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">
                        Close
                    </v-btn>
                    <v-btn
                        color="primary"
                        text
                        @click="clinicRegister()"
                        :disabled="!isFormValid"
                    >
                        Create clinic
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import { CLINIC_SIGNUP } from "@/store/action-types/authentication";
import { CLINIC_SERVICES } from "@/store/action-types/clinic";
import PlacesAutocomplete from "@/components/base/PlacesAutocomplete";
export default {
    components: { PlacesAutocomplete },

    data() {
        return {
            dialog: false,
            form: {
                name: null,
                opening_time: null,
                closing_time: null,
                clinicServicesContent: null,
                location: {
                    address: PlacesAutocomplete.address,
                    longitude: PlacesAutocomplete.longitude,
                    latitude: PlacesAutocomplete.latitude,
                },
            },
            services: [
                {
                    id: null,
                },
            ],
            timetable: [
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

    watch: {
        location(value) {
            this.$emit("update:location", value);
        },
    },

    computed: {
        isFormValid() {
            const {
                name,
                opening_time,
                closing_time,
                clinicServicesContent,
                location,
            } = this.form;
            return (
                name &&
                opening_time &&
                closing_time &&
                clinicServicesContent &&
                location
            );
        },
    },

    methods: {
        async clinicServices() {
            const result = await this.$store.dispatch(CLINIC_SERVICES);
            this.services.items = result.data;
            console.log(this.services.items);
            return this.services.items;
        },

        async clinicRegister() {
            this.dialog = false;
            const {
                name,
                opening_time,
                closing_time,
                clinicServicesContent,
                location,
            } = this.form;

            location.latitude = parseFloat(location.latitude);
            location.longitude = parseFloat(location.longitude);

            const open = `${opening_time}:00:00`;
            const a = parseInt(closing_time);
            const b = 12;
            const c = a + b;
            const pm = c.toString();
            const close = `${pm}:00:00`;

            const payload = {
                name: name,
                opening_time: open,
                closing_time: close,
                services: clinicServicesContent,
                address: location.address,
                latitude: location.latitude,
                longitude: location.longitude,
            };
            console.log(payload);

            const clinicRegister = await this.$store.dispatch(
                CLINIC_SIGNUP,
                payload
            );
        },
    },
    async created() {
        await this.clinicServices();
    },
};
</script>

<style></style>
