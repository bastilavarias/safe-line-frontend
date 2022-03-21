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
                                                >Sign In</v-card-title
                                            >
                                            <v-card-subtitle
                                                >Sign in to your
                                                account</v-card-subtitle
                                            >
                                            <v-card-text>
                                                <v-row dense>
                                                    <v-col cols="12">
                                                        <v-text-field
                                                            v-model="form.email"
                                                            outlined
                                                            label="Email"
                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <b-password-field
                                                            v-model="
                                                                form.password
                                                            "
                                                            outlined
                                                            label="Password"
                                                        ></b-password-field>
                                                    </v-col>
                                                </v-row>
                                            </v-card-text>
                                            <v-card-actions class="mb-10">
                                                <v-btn
                                                    color="primary"
                                                    class="text-capitalize"
                                                    text
                                                    small
                                                    @click="
                                                        isSearchEmailDialogOpen = true
                                                    "
                                                    >Forgot Password?</v-btn
                                                >
                                                <v-spacer></v-spacer>
                                                <v-btn
                                                    color="primary"
                                                    class="text-capitalize"
                                                    depressed
                                                    :loading="isSignInStart"
                                                    :disabled="!isFormValid"
                                                    @click="signIn"
                                                    >Sign In</v-btn
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

        <v-dialog
            width="500"
            persistent
            v-model="isSearchEmailDialogOpen"
            v-if="isSearchEmailDialogOpen"
        >
            <v-card>
                <v-card-title class="primary">
                    <div>
                        <v-icon class="mr-2" color="white" large
                            >mdi-email-edit</v-icon
                        >
                        <span class="white--text">Search E-mail</span>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="white"
                        icon
                        @click="isSearchEmailDialogOpen = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-card-text class="pt-10">
                    <v-alert
                        outlined
                        type="error"
                        class="mb-5"
                        v-if="searchEmailError"
                    >
                        {{ searchEmailError }}
                    </v-alert>

                    <v-text-field
                        label="E-mail"
                        outlined
                        v-model="email"
                    ></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        depressed
                        class="text-capitalize"
                        :loading="isSearchEmailStart"
                        :disabled="!email"
                        @click="searchEmail"
                        >Search E-mail</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
import BPasswordField from "@/components/base/PasswordField";
import { SEARCH_EMAIL, SIGN_IN } from "@/store/action-types/authentication";
import tokenService from "@/services/token";
import routingMixin from "@/mixins/routing";

const defaultForm = {
    email: null,
    password: null,
};

export default {
    components: { BPasswordField },

    mixins: [routingMixin],

    data() {
        return {
            form: Object.assign({}, defaultForm),
            error: null,
            isSnackbarShow: false,
            snackbarMessage: null,
            isSignInStart: false,
            isSearchEmailDialogOpen: false,
            isSearchEmailStart: false,
            email: null,
            searchEmailError: null,
        };
    },

    computed: {
        isFormValid() {
            return this.form.email && this.form.password;
        },
    },

    methods: {
        async signIn() {
            this.isSignInStart = true;

            const result = await this.$store.dispatch(SIGN_IN, this.form);

            if (!result.success) {
                this.isSignInStart = false;
                return (this.error = result.message);
            }

            this.snackbarMessage = "Sign in successfully.";
            this.isSnackbarShow = true;
            setTimeout(async () => {
                const user = result.data.user;
                await this.$router.push({
                    name: this.redirectTo(user.user_type),
                });
            }, 2000);
        },

        async searchEmail() {
            this.isSearchEmailStart = true;

            const result = await this.$store.dispatch(SEARCH_EMAIL, {
                email: this.email,
            });

            if (!result.success) {
                this.isSearchEmailStart = false;
                return (this.searchEmailError = result.message);
            }

            this.snackbarMessage = result.message;
            this.email = null;
            this.isSearchEmailDialogOpen = false;
            this.isSearchEmailStart = false;
            this.searchEmailError = null;
            this.isSnackbarShow = true;
        },
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
