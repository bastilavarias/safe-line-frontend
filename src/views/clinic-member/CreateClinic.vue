<template>
    <v-app>
        <v-row>
            <v-col cols="3" class="fill-height primary white--text">
                <v-container class="fill-height">
                    <div>
                        <h1 class="font-weight-bold display-1">Safe Line</h1>
                        <div class="mb-5"></div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. A accusantium aliquam beatae cum cupiditate
                            enim illum in, ipsum iste itaque laudantium nemo
                            neque nesciunt perferendis quaerat quia quod
                            recusandae unde veniam voluptatum? Alias autem culpa
                            cum, debitis error est eum fugiat fugit non placeat
                            quisquam repellat rerum sunt suscipit temporibus?
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
                            <span class="font-weight-bold"> Safe Line </span>
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" depressed class="text-capitalize"
                            >Sign In</v-btn
                        >
                    </v-toolbar>
                    <div class="fill-height d-flex align-center">
                        <v-container>
                            <v-row justify="center">
                                <v-col cols="8">
                                    <v-stepper
                                        alt-labels
                                        v-model="currentStep"
                                        :elevation="0"
                                    >
                                        <v-stepper-header class="shadow-none">
                                            <v-stepper-step
                                                :complete="currentStep > 1"
                                                :step="1"
                                            >
                                                Clinic Details
                                            </v-stepper-step>
                                            <v-divider></v-divider>
                                            <v-stepper-step
                                                :complete="currentStep > 2"
                                                :step="2"
                                            >
                                                Services
                                            </v-stepper-step>
                                        </v-stepper-header>
                                        <v-alert
                                            outlined
                                            type="error"
                                            v-if="error"
                                        >
                                            {{ error }}
                                        </v-alert>
                                        <v-stepper-items>
                                            <v-stepper-content :step="1">
                                                <clinic-details
                                                    :change-step="changeStep"
                                                    :clinic-name.sync="
                                                        form.clinicName
                                                    "
                                                    :clinic-address.sync="
                                                        form.clinicAddress
                                                    "
                                                ></clinic-details>
                                            </v-stepper-content>
                                            <v-stepper-content :step="2">
                                                <clinic-services
                                                    :change-step="changeStep"
                                                    :gender.sync="form.gender"
                                                    :birthday.sync="
                                                        form.birthday
                                                    "
                                                    :phone-number.sync="
                                                        form.phoneNumber
                                                    "
                                                    @success="signUpSuccess"
                                                ></clinic-services>
                                            </v-stepper-content>
                                        </v-stepper-items>
                                    </v-stepper>
                                    <v-snackbar
                                        v-model="isSnackbarShow"
                                        color="success"
                                        :timeout="3000"
                                    >
                                        Account sign up complete.
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
                                </v-col>
                            </v-row>
                        </v-container>
                    </div>
                </section>
            </v-col>
        </v-row>
    </v-app>
</template>

<script>
import ClinicDetails from "@/components/clinic/sign-up/ClinicDetails.vue";
import ClinicServices from "@/components/clinic/sign-up/ClinicServices.vue";

const defaultForm = {
    clinicName: null,
    clinicAddress: null,
    operatingHours: {
        opening_time: null,
        closing_time: null,
    },
    services: null,
};

export default {
    components: {
        ClinicDetails,
        ClinicServices,
    },

    data() {
        return {
            currentStep: 1,
            form: Object.assign({}, defaultForm),
            error: null,
            isSnackbarShow: false,
        };
    },

    methods: {
        changeStep(step) {
            this.currentStep = step;
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
