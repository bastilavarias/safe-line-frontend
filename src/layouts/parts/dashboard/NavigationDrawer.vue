<template>
    <v-navigation-drawer
        app
        permanent
        :mini-variant="mini"
        mini-variant-width="90"
        color="primary"
        dark
        :expand-on-hover="false"
    >
        <div class="fill-height">
            <v-row class="fill-height" justify="center" align="center">
                <v-col cols="12" class="text-center">
                    <template v-for="(navigation, index) in navigations">
                        <v-btn
                            :key="index"
                            depressed
                            x-large
                            icon
                            :to="navigation.to"
                            color="white"
                            exact
                            :class="`${
                                index !== navigations.length - 1 ? 'mb-5' : ''
                            }`"
                            active-class="white primary--text"
                        >
                            <v-icon>{{ navigation.icon }}</v-icon>
                        </v-btn>
                    </template>
                </v-col>
            </v-row>
        </div>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: "dashboard-navigation-drawer",

    props: {
        navigations: Array,
    },

    data() {
        return {
            mini: true,
        };
    },
};
</script>
