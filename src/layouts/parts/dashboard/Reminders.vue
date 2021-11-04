<template>
    <v-card width="290" height="248">
        <v-card-title class="ml-1"> Reminders </v-card-title>
        <div class="mx-auto">
            <reminder-content></reminder-content>
        </div>
    </v-card>
</template>

<script>
import ReminderContent from "@/layouts/parts/dashboard/ReminderContent";
export default {
    name: "reminders",
    components: { ReminderContent },
};
</script>

<style></style>
