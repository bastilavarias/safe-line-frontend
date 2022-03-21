<template>
    <v-app>
        <v-main>
            <v-row class="base-grid" no-gutters>
                <v-col cols="3" class="fill-height primary white--text">
                    <v-container class="fill-height">
                        <div>
                            <h1 class="font-weight-bold display-1">
                                Safe Line
                            </h1>
                            <div class="mb-5"></div>
                            <h3 class="mb-3">Your companion anywhere.</h3>
                            <p>
                                Get checked with Safe Line anywhere. Safe Line
                                allows you to find clinics near you to
                                accomodate what you are feeling.
                            </p>
                        </div>
                    </v-container>
                </v-col>
                <v-col cols="9" class="base-grid__right-side">
                    <section class="fill-height">
                        <v-toolbar absolute flat width="100%">
                            <v-toolbar-title
                                class="d-flex align-center cursor-pointer"
                                @click="$router.push({ name: 'home' })"
                            >
                                <v-img
                                    width="40"
                                    height="auto"
                                    :src="require('@/assets/logo-violet.png')"
                                    class="mr-2"
                                ></v-img>
                                <span class="font-weight-bold">
                                    Safe Line
                                </span>
                            </v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="primary"
                                depressed
                                class="text-capitalize"
                                :to="{ name: 'patient-sign-up' }"
                                >Sign Up</v-btn
                            >
                        </v-toolbar>
                        <div class="fill-height d-flex align-center">
                            <v-container>
                                <v-row justify="center">
                                    <v-col cols="8">
                                        <v-alert
                                            outlined
                                            type="error"
                                            v-if="error"
                                        >
                                            {{ error }}
                                        </v-alert>

                                        <v-card flat>
                                            <v-card-title
                                                class="
                                                    display-1
                                                    font-weight-bold
                                                "
                                                >Reset Password</v-card-title
                                            >
                                            <v-card-subtitle
                                                >Please provide your new
                                                password to
                                                continue.</v-card-subtitle
                                            >
                                            <v-card-text>
                                                <v-row dense>
                                                    <v-col cols="12">
                                                        <v-text-field
                                                            outlined
                                                            label="E-mail"
                                                            :value="email"
                                                        ></v-text-field>
                                                    </v-col>

                                                    <v-col cols="12">
                                                        <b-password-field
                                                            v-model="
                                                                form.password
                                                            "
                                                            outlined
                                                            label="New Password"
                                                        ></b-password-field>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <b-password-field
                                                            v-model="
                                                                form.passwordConfirmation
                                                            "
                                                            outlined
                                                            label="Confirm Password"
                                                            :rules="[
                                                                componentRules.samePassword,
                                                            ]"
                                                        ></b-password-field>
                                                    </v-col>
                                                </v-row>
                                            </v-card-text>
                                            <v-card-actions class="mb-10">
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    color="primary"
                                                    class="text-capitalize"
                                                    depressed
                                                    :disabled="!isFormValid"
                                                    :loading="
                                                        isResetPasswordStart
                                                    "
                                                    @click="resetPassword"
                                                    >Reset Password</v-btn
                                                >
                                            </v-card-actions>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </div>
                    </section>
                </v-col>
            </v-row>
        </v-main>

        <v-snackbar v-model="isSnackbarShow" color="success" :timeout="3000">
            {{ snackbarMessage }}
            <template v-slot:action="{ attrs }">
                <v-btn
                    color="white"
                    text
                    v-bind="attrs"
                    @click="isSnackbarShow = false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-app>
</template>

<script>
import SignPopUp from "../components/SignPopUp.vue";
import BPasswordField from "@/components/base/PasswordField";
import { RESET_PASSWORD } from "@/store/action-types/authentication";
import inputRuleMixin from "@/mixins/inputRule";

const defaultForm = {
    password: null,
    passwordConfirmation: null,
};

export default {
    components: { BPasswordField, SignPopUp },

    mixins: [inputRuleMixin],

    data() {
        return {
            form: Object.assign({}, defaultForm),
            error: null,
            isSnackbarShow: false,
            snackbarMessage: null,
            isResetPasswordStart: false,
        };
    },

    computed: {
        isFormValid() {
            return (
                this.form.password &&
                this.form.passwordConfirmation &&
                this.componentRules.samePassword(
                    this.form.passwordConfirmation
                ) === true
            );
        },

        email() {
            return this.$route.query.email || null;
        },

        token() {
            return this.$route.query.token || null;
        },

        componentRules() {
            return {
                samePassword: (value) =>
                    value === this.form.password ||
                    "Passwords are not the same.",
            };
        },
    },

    methods: {
        async resetPassword() {
            const payload = {
                email: this.email,
                token: this.token,
                password: this.form.password,
            };

            this.isResetPasswordStart = true;
            const result = await this.$store.dispatch(RESET_PASSWORD, payload);

            if (!result.success) {
                this.isResetPasswordStart = false;
                return (this.error = result.message);
            }

            this.snackbarMessage = "Password successfully reset.";
            this.isSnackbarShow = true;
            setTimeout(async () => {
                await this.$router.push({
                    name: "sign-in",
                });
            }, 2000);
        },
    },

    created() {
        if (!this.email || !this.token) {
            this.$router.push({ name: "sign-in" });
        }
    },
};
</script>

<style lang="scss" scoped>
.base-grid {
    height: 100vh;

    &__left-side,
    &__right-side {
        height: 100%;

        section {
            position: relative;
        }
    }
}
</style>
