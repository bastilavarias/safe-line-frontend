<template>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="date"
                :label="label"
                :outlined="outlined"
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
    </v-menu>
</template>

<script>
export default {
    name: "b-date-picker",

    props: {
        modelValue: String,
        label: String,
        outlined: Boolean,
    },

    data() {
        return {
            date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10),
            menu: false,
        };
    },
};
</script>
