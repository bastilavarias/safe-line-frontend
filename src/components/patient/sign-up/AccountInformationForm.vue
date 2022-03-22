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
                        :rules="[rules.name]"
                        v-model="firstNameLocal"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        outlined
                        label="Last Name"
                        :rules="[rules.name]"
                        v-model="lastNameLocal"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        outlined
                        label="Email"
                        :rules="[rules.email]"
                        v-model="emailLocal"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        outlined
                        label="Email Confirmation"
                        :rules="[
                            rules.email,
                            rules.sameAs(
                                emailLocal,
                                emailConfirmation,
                                'E-mail are not same.'
                            ),
                        ]"
                        v-model="emailConfirmation"
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
                            rules.sameAs(
                                passwordLocal,
                                confirmPassword,
                                'Password don'
                            ),
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
                :disabled="!isFormValid"
                >Next</v-btn
            >
        </v-card-actions>
    </v-card>
</template>
<script>
import BPasswordField from "@/components/base/PasswordField";
import inputRuleMixin from "@/mixins/inputRule";

export default {
    components: { BPasswordField },

    mixins: [inputRuleMixin],

    props: {
        changeStep: Function,
        firstName: String,
        lastName: String,
        email: String,
        password: String,
    },

    data() {
        return {
            firstNameLocal: this.firstName,
            lastNameLocal: this.lastName,
            emailLocal: this.email,
            emailConfirmation: null,
            passwordLocal: this.password,
            confirmPassword: null,
        };
    },

    computed: {
        isFormValid() {
            return (
                this.firstNameLocal &&
                this.lastNameLocal &&
                this.emailLocal &&
                this.emailConfirmation &&
                this.passwordLocal &&
                this.confirmPassword &&
                this.rules.name(this.firstNameLocal) === true &&
                this.rules.name(this.lastName) === true &&
                this.rules.email(this.emailLocal) === true &&
                this.rules.email(this.emailConfirmation) === true &&
                this.rules.sameAs(this.emailLocal, this.emailConfirmation) ===
                    true &&
                this.rules.sameAs(this.passwordLocal, this.confirmPassword) ===
                    true
            );
        },
    },

    watch: {
        firstNameLocal(value) {
            this.$emit("update:firstName", value);
        },

        lastNameLocal(value) {
            this.$emit("update:lastName", value);
        },

        emailLocal(value) {
            this.$emit("update:email", value);
        },

        passwordLocal(value) {
            this.$emit("update:password", value);
        },
    },
};
</script>
