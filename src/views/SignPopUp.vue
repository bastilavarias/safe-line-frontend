<template>
    <v-dialog max-width="600px" max-height="1000px">
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

        <v-card>
            <v-row class="d-flex justify-center">
                <v-card flat>
                    <v-img
                        src="@/assets/landing/logoAlt.png"
                        height="56px"
                        width="56px"
                    ></v-img>
                    <v-card-title>Sign Up to Safe Line</v-card-title>
                    <v-card-subtitle>Select a user type</v-card-subtitle>
                </v-card>
            </v-row>
            <v-row no-gutters>
                <v-col cols="6">
                    <v-icon>md-heart</v-icon>
                    <v-card-title>Patient</v-card-title>
                    <v-card-subtitle
                        >Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        ut aliquam</v-card-subtitle
                    >
                </v-col>
                <v-col cols="6">
                    <v-icon>md-heart</v-icon>
                    <v-card-title>Patient</v-card-title>
                    <v-card-subtitle
                        >Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        ut aliquam</v-card-subtitle
                    >
                </v-col>
            </v-row>
            <v-row class="d-flex justify-center">
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        @click="dialog = false"
                        color="primary"
                        class="text-capitalize"
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
