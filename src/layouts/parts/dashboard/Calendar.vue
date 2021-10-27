<template>
    <v-row>
        <v-date-picker v-model="picker"></v-date-picker>
    </v-row>
</template>

<script>
export default {
    name: "calendar",
    data() {
        return {
            picker: new Date(
                Date.now() - new Date().getTimezoneOffset() * 60000
            )
                .toISOString()
                .substr(0, 10),
        };
    },
};
</script>

<style></style>
