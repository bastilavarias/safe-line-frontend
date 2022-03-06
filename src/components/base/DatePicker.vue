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
                :value="valueLocal ? formatSimpleDate(valueLocal) : ''"
                :label="label"
                :outlined="outlined"
                :placeholder="placeholder"
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker
            v-model="valueLocal"
            :max="max"
            :min="min"
            @input="handleInput"
        ></v-date-picker>
    </v-menu>
</template>

<script>
import dateMixin from "@/mixins/date";

export default {
    name: "b-date-picker",

    mixins: [dateMixin],

    props: {
        value: String,
        label: String,
        outlined: Boolean,
        placeholder: String,
        max: String,
        min: String,
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
