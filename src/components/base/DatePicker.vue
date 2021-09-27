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
                v-model="valueLocal"
                :label="label"
                :outlined="outlined"
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker
            v-model="valueLocal"
            @input="handleInput"
        ></v-date-picker>
    </v-menu>
</template>

<script>
export default {
    name: "b-date-picker",

    props: {
        value: String,
        label: String,
        outlined: Boolean,
    },

    data() {
        return {
            valueLocal: this.value,
            menu: false,
        };
    },

    methods: {
        handleInput(e) {
            this.$emit("input", e);
            this.menu = false;
        },
    },
};
</script>
