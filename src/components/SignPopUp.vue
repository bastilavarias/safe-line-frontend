<template>
    <v-dialog max-width="400px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
                color="primary"
                class="text-capitalize"
            >
                Join Safe Line
            </v-btn>
        </template>

        <v-card class="pa-10">
            <v-row class="d-flex justify-center mb-2">
                <v-card flat>
                    <center>
                        <v-img
                            src="@/assets/landing/logoAlt.png"
                            height="56px"
                            width="56px"
                        ></v-img>
                        <v-card-title class="text-center"
                            >Sign Up to Safe Line</v-card-title
                        >
                        <v-card-subtitle>Select a user type</v-card-subtitle>
                    </center>
                </v-card>
            </v-row>
            <v-card flat class="mb-8 d-flex justify-center">
                <v-btn
                    outlined
                    height="160"
                    width="170"
                    class="mr-2"
                    color="indigo"
                >
                    <v-card
                        flat
                        class="d-flex flex-column mt-2"
                        color="rgba(0, 0, 0, 0)"
                    >
                        <v-icon>mdi-face-man</v-icon>
                        <h3 class="text-capitalize mb-1">Patient</h3>
                        <v-card
                            flat
                            color="rgba(0, 0, 0, 0)"
                            max-width="150px"
                            class="body-2"
                        >
                            <p>Find hospitals and clinics near you</p>
                        </v-card>
                    </v-card>
                </v-btn>

                <v-btn outlined height="160" width="170" color="indigo">
                    <v-card
                        flat
                        class="d-flex flex-column mt-2"
                        color="rgba(0, 0, 0, 0)"
                    >
                        <v-icon>mdi-heart</v-icon>
                        <h3 class="text-capitalize mb-1">Clinic</h3>
                        <v-card
                            flat
                            color="rgba(0, 0, 0, 0)"
                            max-width="150px"
                            class="body-2"
                        >
                            <p>Check and admit patients near you</p>
                        </v-card>
                    </v-card>
                </v-btn>
            </v-card>
            <v-row class="d-flex justify-center">
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        @click="dialog = false"
                        color="primary"
                        class="text-capitalize font-weight-normal"
                        >Continue</v-btn
                    >
                </v-card-actions>
            </v-row>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    data() {
        return {
            dialog: false,
        };
    },
};
</script>
