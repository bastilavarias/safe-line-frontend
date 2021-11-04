<template>
    <section>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-sheet color="transparent">
                        <h1 class="title font-weight-bold text-truncate mb-5">
                            Welcome {{ user.profile.first_name }}
                            {{ user.profile.last_name }}!
                        </h1>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
export default {
    data() {
        return {};
    },

    computed: {
        user() {
            const details = this.$store.state.authentication.details;
            return details.user || null;
        },
    },
};
</script>
