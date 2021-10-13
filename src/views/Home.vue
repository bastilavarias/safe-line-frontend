<template>
    <v-app>
        <v-app-bar absolute app color="transparent" elevate-on-scroll>
            <v-container>
                <v-row justify="space-between">
                    <img
                        class="mr-2"
                        height="32px"
                        width="35px"
                        src="@/assets/home/logoViolet.png"
                    />
                    <v-toolbar-title class="black--text"
                        >Safe Line</v-toolbar-title
                    >
                    <v-spacer></v-spacer>
                    <v-btn text> Home </v-btn>
                    <v-btn text> Clinics </v-btn>
                    <v-btn text> About </v-btn>
                    <router-link to="/sign-in">
                        <v-btn color="primary" class="text-capitalize">
                            Sign In
                        </v-btn>
                    </router-link>
                    <router-view />
                </v-row>
            </v-container>
        </v-app-bar>

        <v-spacer></v-spacer>
        <v-main>
            <v-container>
                <v-row no-gutters class="mb-15 pb-15">
                    <v-col cols="6" class="mt-10">
                        <v-card flat>
                            <h1>Your friendly companion</h1>
                            &nbsp;
                            <v-card flat :style="{ width: '500px' }">
                                <p class="text-justify">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nec consectetur neque,
                                    ultricies in. Cras nisl malesuada et sed
                                    nibh convallis tellus.
                                </p>
                            </v-card>
                            <v-card flat class="d-flex justify-start ml-n4">
                                <v-card flat class="ml-0">
                                    <v-list disabled flat>
                                        <v-list-item-group>
                                            <v-list-item>
                                                <v-list-item-icon>
                                                    <v-icon>mdi-map</v-icon>
                                                </v-list-item-icon>
                                                <v-list-item-content
                                                    >Find clinics near you
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-icon>
                                                    <v-icon>mdi-video</v-icon>
                                                </v-list-item-icon>
                                                <v-list-item-content
                                                    >Call your doctors for
                                                    consultation
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-icon>
                                                    <v-icon>mdi-message</v-icon>
                                                </v-list-item-icon>
                                                <v-list-item-content
                                                    >Chat with your doctors
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list-item-group>
                                    </v-list>
                                    <v-card flat class="mt-5 ml-4">
                                        <SignPopUp />
                                    </v-card>
                                </v-card>
                            </v-card>
                        </v-card>
                    </v-col>

                    <v-col cols="6">
                        <v-card flat class="d-flex justify-center">
                            <v-card flat>
                                <img
                                    class="landingPhoto"
                                    src="@/assets/home/landingPhoto.png"
                                    alt="landingPhoto"
                                />
                            </v-card>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row no-gutters class="my-10">
                    <v-col cols="6" class="my-12 py-12">
                        <v-card flat>
                            <v-icon class="mb-2 ml-n1" color="#4F48EC" x-large
                                >mdi-map-marker-path</v-icon
                            >
                            <h2 class="mb-5">Find a clinic where you are</h2>
                            <v-card flat :style="{ width: '500px' }">
                                <p class="text-justify">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nec consectetur neque,
                                    ultricies in. Cras nisl malesuada et sed
                                    nibh convallis tellus.
                                </p>
                            </v-card>
                        </v-card>
                    </v-col>

                    <v-col cols="6">
                        <v-card flat class="d-flex justify-center">
                            <v-card flat>
                                <img
                                    height="450"
                                    width="420"
                                    src="@/assets/home/mapPin.png"
                                    alt="landingPhoto"
                                />
                            </v-card>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>

            <v-card outlined color="#F6F6F6">
                <v-container
                    ><v-row no-gutters class="my-10">
                        <v-col cols="6">
                            <v-card
                                flat
                                class="d-flex justify-start"
                                color="rgba(0, 0, 0, 0)"
                            >
                                <v-card flat color="rgba(0, 0, 0, 0)">
                                    <img
                                        height="450"
                                        width="440"
                                        src="@/assets/home/videoCall.png"
                                        alt="landingPhoto"
                                    />
                                </v-card>
                            </v-card>
                        </v-col>

                        <v-col cols="6" class="my-13 py-13">
                            <v-card flat color="rgba(0, 0, 0, 0)">
                                <v-icon
                                    class="mb-2 ml-n1"
                                    color="#4F48EC"
                                    x-large
                                    >mdi-video</v-icon
                                >
                                <h2 class="mb-5">Get checked at home</h2>
                                <v-card
                                    flat
                                    :style="{ width: '500px' }"
                                    color="rgba(0, 0, 0, 0)"
                                >
                                    <p class="text-justify">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Nec consectetur neque,
                                        ultricies in. Cras nisl malesuada et sed
                                        nibh convallis tellus.
                                    </p>
                                </v-card>
                            </v-card>
                        </v-col>
                    </v-row></v-container
                >
            </v-card>

            <v-container>
                <v-row no-gutters class="my-10">
                    <v-col cols="6" class="my-15 py-15">
                        <v-card flat>
                            <v-icon class="mb-2 ml-n1" color="#4F48EC" x-large
                                >mdi-forum</v-icon
                            >
                            <h2 class="mb-5">Message your doctors anytime</h2>
                            <v-card flat :style="{ width: '500px' }">
                                <p class="text-justify">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nec consectetur neque,
                                    ultricies in. Cras nisl malesuada et sed
                                    nibh convallis tellus.
                                </p>
                            </v-card>
                        </v-card>
                    </v-col>

                    <v-col cols="6">
                        <v-card flat class="d-flex justify-center">
                            <v-card flat>
                                <img
                                    height="450"
                                    width="475"
                                    src="@/assets/home/messageDoctor.png"
                                    alt="landingPhoto"
                                />
                            </v-card>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
            <v-footer color="#3C36CA" class="">
                <v-container>
                    <v-row>
                        <v-col class="justify-start">
                            <v-card
                                flat
                                width="250px"
                                color="rgba(0, 0, 0, 0)"
                                class="my-4"
                            >
                                <v-row>
                                    <v-col
                                        ><img
                                            src="@/assets/home/logoWhite.png"
                                            height="32px"
                                            width="35px"
                                            alt=""
                                        />
                                    </v-col>
                                    <v-col class="ml-n16">
                                        <h3 class="white--text ml-n13 mt-1">
                                            Safe Line
                                        </h3>
                                    </v-col>
                                </v-row>
                                <v-card-text class="white--text ml-n4"
                                    >Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit.</v-card-text
                                >
                                <v-divider></v-divider>
                                <v-list
                                    color="rgba(0,0,0,0)"
                                    class="ml-n4 mt-n3"
                                >
                                    <v-list-item-group>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon color="white"
                                                    >mdi-phone</v-icon
                                                >
                                            </v-list-item-icon>
                                            <v-list-item-content
                                                class="white--text ml-n5"
                                                >Lorem Ipsum
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon color="white"
                                                    >mdi-email</v-icon
                                                >
                                            </v-list-item-icon>
                                            <v-list-item-content
                                                class="white--text ml-n5"
                                                >Lorem Ipsum
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                                <v-row>
                                    <v-col>
                                        <v-icon class="mr-5" color="white"
                                            >mdi-facebook</v-icon
                                        >
                                        <v-icon color="white"
                                            >mdi-twitter</v-icon
                                        >
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>

                        <v-col class="mt-5 ml-n16">
                            <v-card flat color="rgba(0, 0, 0, 0)" width="200px">
                                <h4 class="white--text">Services</h4>
                                <v-list color="rgba(0, 0, 0, 0)" class="ml-n4">
                                    <v-list-item>
                                        <v-list-item-group class="white--text">
                                            <v-list-item-content>
                                                Clinics
                                            </v-list-item-content>
                                            <v-list-item-content>
                                                Telemedicine
                                            </v-list-item-content>
                                            <v-list-item-content>
                                                Maps
                                            </v-list-item-content>
                                        </v-list-item-group>
                                    </v-list-item>
                                </v-list>
                            </v-card>
                        </v-col>
                        <v-col class="mt-5 ml-n16">
                            <v-card flat color="rgba(0, 0, 0, 0)" width="200px">
                                <h4 class="white--text">Services</h4>
                                <v-list color="rgba(0, 0, 0, 0)" class="ml-n4">
                                    <v-list-item>
                                        <v-list-item-group class="white--text">
                                            <v-list-item-content>
                                                Clinics
                                            </v-list-item-content>
                                            <v-list-item-content>
                                                Telemedicine
                                            </v-list-item-content>
                                            <v-list-item-content>
                                                Maps
                                            </v-list-item-content>
                                        </v-list-item-group>
                                    </v-list-item>
                                </v-list>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-footer>
        </v-main>
    </v-app>
</template>

<script>
import SignPopUp from "../components/SignPopUp.vue";
export default {
    components: { SignPopUp },
};
</script>

<style lang="scss" scoped>
.base {
    height: 100vh;
}
.icon {
    height: 24px;
    width: 24px;
}
.landingPhoto {
    height: 485px;
    width: 391px;
}
</style>
