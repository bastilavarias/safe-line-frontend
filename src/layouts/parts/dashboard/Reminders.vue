<template>
    <v-card width="350" height="248">
        <v-card-title> Reminders </v-card-title>
        <div class="py-3 ml-4">
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
