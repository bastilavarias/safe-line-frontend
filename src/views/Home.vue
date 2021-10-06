<template>
    <v-app>
        <v-app-bar absolute app color="transparent" elevate-on-scroll>
            <v-container>
                <v-row justify="space-between">
                    <img
                        class="mr-2"
                        height="32px"
                        width="32px"
                        src="@/assets/home/logoViolet.png"
                    />
                    <v-toolbar-title class="black--text"
                        >Safe Line</v-toolbar-title
                    >
                    <v-spacer></v-spacer>
                    <v-btn text> Home </v-btn>
                    <v-btn text> Clinics </v-btn>
                    <v-btn text> About </v-btn>
                    <v-btn color="primary" class="text-capitalize">
                        Sign In
                    </v-btn>
                </v-row>
            </v-container>
        </v-app-bar>

        <v-spacer></v-spacer>
        <v-main>
            <v-container>
                <v-row no-gutters>
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
                            <v-card flat class="d-flex justify-start">
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
                                    <v-card flat class="mt-5">
                                        <SignPopUp />
                                    </v-card>
                                </v-card>
                            </v-card>
                        </v-card>
                    </v-col>

                    <v-col cols="6">
                        <v-card flat class="d-flex justify-end">
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
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import SignPopUp from "./SignPopUp.vue";
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
