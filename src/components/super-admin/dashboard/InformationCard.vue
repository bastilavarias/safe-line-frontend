<template>
    <v-card rounded height="152" width="152">
        <v-card-text class="fill-height d-flex flex-column justify-center pt-7">
            <div>
                <v-sheet
                    color="primary"
                    class="d-inline-block px-1 py-1 rounded"
                    dark
                >
                    <v-icon>mdi-bottle-tonic-plus</v-icon>
                </v-sheet>
            </div>
            <span class="d-block my-2">Total clinics registered</span>
            <h1 class="title black--text font-weight-bold">12</h1>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "super-admin-dashboard-information-card",
};
</script>
