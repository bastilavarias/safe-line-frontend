<template>
    <v-card flat>
        <v-card-title class="display-1 font-weight-bold">
            Clinic Services
        </v-card-title>
        <v-card-text>
            <v-row dense>
                <v-col cols="12">
                    <v-select outlined label="Select a service"> </v-select>
                </v-col>
                <v-col cols="12">
                    <v-btn outlined>
                        <v-icon>mdi-plus</v-icon>Add service
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {};
</script>

<style></style>
