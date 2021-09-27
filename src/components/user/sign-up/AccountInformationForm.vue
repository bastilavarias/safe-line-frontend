<template>
    <v-card flat>
        <v-card-title class="display-1 font-weight-bold"
            >Account Information</v-card-title
        >
        <v-card-text>
            <v-row dense>
                <v-col cols="12" md="6">
                    <v-text-field outlined label="First Name"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field outlined label="Last Name"></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field outlined label="Email"></v-text-field>
                </v-col>
                <v-col cols="12">
                    <b-password-field
                        outlined
                        label="Password"
                    ></b-password-field>
                </v-col>
                <v-col cols="12">
                    <b-password-field
                        outlined
                        label="Confirm Password"
                    ></b-password-field>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="text-capitalize" depressed
                >Next</v-btn
            >
        </v-card-actions>
    </v-card>
</template>
<script>
import BPasswordField from "@/components/base/PasswordField";
export default {
    components: { BPasswordField },
};
</script>
