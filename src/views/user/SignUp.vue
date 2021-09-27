<template>
    <v-app>
        <v-main>
            <v-row class="base-grid" no-gutters>
                <v-col cols="3" class="base-grid__left-side primary">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Consectetur ex fugiat libero tempora? Commodi hic illo ipsa
                    ipsam porro quibusdam, reiciendis repellat voluptas?
                    Accusamus aliquam aperiam architecto assumenda at, aut autem
                    consequatur debitis doloremque expedita fugiat harum iste,
                    itaque iure laboriosam maiores molestias non, obcaecati odio
                    omnis quod suscipit totam ullam vel vero vitae voluptas
                    voluptate. Aliquam asperiores assumenda, consectetur culpa
                    deleniti distinctio dolor, dolore dolores doloribus eligendi
                    eos et expedita facilis, harum inventore laboriosam laborum
                    magni natus nulla numquam obcaecati odio odit pariatur
                    placeat porro possimus quasi rerum sequi tempora velit vero
                    voluptate voluptatibus voluptatum? Cum illo itaque suscipit!
                </v-col>
                <v-col cols="9" class="base-grid__right-side">
                    <section class="fill-height">
                        <v-toolbar absolute flat width="100%">
                            <v-toolbar-title class="d-flex align-center">
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
                                            <v-stepper-header
                                                class="shadow-none"
                                            >
                                                <v-stepper-step
                                                    :complete="currentStep > 1"
                                                    :step="1"
                                                >
                                                    Account Info
                                                </v-stepper-step>
                                                <v-divider></v-divider>
                                                <v-stepper-step
                                                    :complete="currentStep > 2"
                                                    :step="2"
                                                >
                                                    Personal Info
                                                </v-stepper-step>
                                                <v-divider></v-divider>
                                                <v-stepper-step :step="3">
                                                    Address Info
                                                </v-stepper-step>
                                            </v-stepper-header>
                                            <v-stepper-items>
                                                <v-stepper-content :step="1">
                                                    <account-information-form
                                                        :change-step="
                                                            changeStep
                                                        "
                                                        :first-name.sync="
                                                            form.firstName
                                                        "
                                                        :last-name.sync="
                                                            form.lastName
                                                        "
                                                        :email.sync="form.email"
                                                        :password.sync="
                                                            form.password
                                                        "
                                                    ></account-information-form>
                                                </v-stepper-content>
                                                <v-stepper-content :step="2">
                                                    <personal-information-form
                                                        :change-step="
                                                            changeStep
                                                        "
                                                        :gender.sync="
                                                            form.gender
                                                        "
                                                        :birth-date.sync="
                                                            form.birthDate
                                                        "
                                                        :phone-number.sync="
                                                            form.phoneNumber
                                                        "
                                                    ></personal-information-form>
                                                </v-stepper-content>
                                                <v-stepper-content :step="3">
                                                    <address-information-form
                                                        :change-step="
                                                            changeStep
                                                        "
                                                    ></address-information-form>
                                                </v-stepper-content>
                                            </v-stepper-items>
                                        </v-stepper>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </div>
                    </section>
                </v-col>
            </v-row>
        </v-main>
    </v-app>
</template>

<script>
import AccountInformationForm from "@/components/user/sign-up/AccountInformationForm";
import PersonalInformationForm from "@/components/user/sign-up/PersonalInformationForm";
import AddressInformationForm from "@/components/user/sign-up/AddressInformationForm";

const defaultForm = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    gender: null,
    birthDate: null,
    phoneNumber: null,
    address: {
        address: null,
        longitude: null,
        latitude: null,
    },
};

export default {
    components: {
        AddressInformationForm,
        PersonalInformationForm,
        AccountInformationForm,
    },

    data() {
        return {
            currentStep: 1,
            form: Object.assign({}, defaultForm),
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

.shadow-none {
    box-shadow: none !important;
}
</style>
