<template>
    <v-dialog v-model="isOpenLocal" width="800">
        <v-card> {{ information }} </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "super-admin-dashboard-clinic-information-dialog",

    props: {
        isOpen: Boolean,
        information: Object,
    },

    data() {
        return {
            isOpenLocal: this.isOpen,
        };
    },

    watch: {
        isOpen(value) {
            this.isOpenLocal = value;
        },

        isOpenLocal(value) {
            this.$emit("update:isOpen", value);
        },
    },
};
</script>
