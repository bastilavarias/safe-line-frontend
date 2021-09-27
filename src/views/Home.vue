<template>
    <v-app>
        <v-app-bar app color="transparent" elevate-on-scroll>
            <v-container>
                <v-row justify="space-between">
                    <v-toolbar-title class="black--text"
                        >Safe Line</v-toolbar-title
                    >
                    <v-spacer></v-spacer>
                    <v-btn color="primary" class="text-capitalize">
                        Sign In
                    </v-btn>
                </v-row>
            </v-container>
        </v-app-bar>
    </v-app>
</template>

<script>
export default {
    name: "Home",
};
</script>
