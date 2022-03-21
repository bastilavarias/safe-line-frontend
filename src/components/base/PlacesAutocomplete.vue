<template>
    <vuetify-google-autocomplete
        id="map"
        append-icon="mdi-search"
        :placeholder="placeholder"
        v-on:placechanged="getAddressData"
        outlined
        :dense="dense"
        :value="valueLocal.address"
        ref="vga"
    >
    </vuetify-google-autocomplete>
</template>

<script>
export default {
    props: {
        value: Object,
        dense: Boolean,
        placeholder: String,
    },

    data() {
        return {
            valueLocal: this.value,
        };
    },

    watch: {
        "value.address"(value) {
            if (!value) {
                const component = this.$refs["vga"];
                component.autocompleteText = "";
                return;
            }

            const component = this.$refs["vga"];
            component.autocompleteText = value;
        },
    },

    methods: {
        getAddressData(value, place) {
            const location = {
                address: place.formatted_address,
                longitude: `${value.longitude}`,
                latitude: `${value.latitude}`,
            };
            this.$emit("input", location);
        },
    },
};
</script>
