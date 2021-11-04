<template>
    <v-card flat outlined class="card container">
        <v-row class="mr-2">
            <v-col>
                <p class="h6">Video Consultation</p>
                <p class="caption mt-n2">12:30PM ● in 4 Hours</p>
            </v-col>
            <v-chip class="mt-3 chip" color="red" text-color="white" small>
                HIGH
            </v-chip>
        </v-row>
    </v-card>
</template>

<script>
export default {
    name: "reminder-content",
};
</script>

<style scoped>
.card {
    height: 80px;
    width: 250px;
}
.container {
    position: relative;
}
.chip {
    position: absolute;
    right: 10px;
}
</style>
