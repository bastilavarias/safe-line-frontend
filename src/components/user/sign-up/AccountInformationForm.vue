<template>
    <v-card flat>
        <v-card-title class="display-1 font-weight-bold"
            >Account Information</v-card-title
        >
        <v-card-text>
            <v-row dense>
                <v-col cols="12" md="6">
                    <v-text-field
                        outlined
                        label="First Name"
                        v-model="firstNameLocal"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        outlined
                        label="Last Name"
                        v-model="lastNameLocal"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        outlined
                        label="Email"
                        v-model="emailLocal"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <b-password-field
                        outlined
                        label="Password"
                        v-model="passwordLocal"
                    ></b-password-field>
                </v-col>
                <v-col cols="12">
                    <b-password-field
                        outlined
                        label="Confirm Password"
                        v-model="confirmPassword"
                        :rules="[
                            (value) =>
                                value === passwordLocal ||
                                `Passwords you entered don't match don't match`,
                        ]"
                    ></b-password-field>
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
                >Next</v-btn
            >
        </v-card-actions>
    </v-card>
</template>
<script>
import BPasswordField from "@/components/base/PasswordField";

export default {
    components: { BPasswordField },

    props: {
        changeStep: Function,
        form: Object,
    },

    data() {
        return {
            firstNameLocal: this.form.firstName,
            lastNameLocal: this.form.lastName,
            emailLocal: this.form.email,
            passwordLocal: this.form.password,
            confirmPassword: null,
        };
    },
};
</script>
