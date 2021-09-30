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
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. A accusantium aliquam beatae
                                cum cupiditate enim illum in, ipsum iste itaque
                                laudantium nemo neque nesciunt perferendis
                                quaerat quia quod recusandae unde veniam
                                voluptatum? Alias autem culpa cum, debitis error
                                est eum fugiat fugit non placeat quisquam
                                repellat rerum sunt suscipit temporibus?
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
                                                >Lorem ipsum dolor sit
                                                amet.</v-card-subtitle
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
                                            <v-card-actions>
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
                    <v-snackbar
                        v-model="isSnackbarShow"
                        color="success"
                        :timeout="3000"
                    >
                        Sign in successfully.
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
                </v-col>
            </v-row>
        </v-main>
    </v-app>
</template>

<script>
import BPasswordField from "@/components/base/PasswordField";
import { SIGN_IN } from "@/store/action-types/authentication";
import tokenService from "@/services/token";

const defaultForm = {
    email: null,
    password: null,
};

export default {
    components: { BPasswordField },

    data() {
        return {
            form: Object.assign({}, defaultForm),
            error: null,
            isSnackbarShow: false,
            isSignInStart: false,
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

            tokenService.save(result.data.access_token);
            this.isSnackbarShow = true;
            setTimeout(async () => {
                await this.$router.push({ name: "patient-dashboard" });
            }, 2000);
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
