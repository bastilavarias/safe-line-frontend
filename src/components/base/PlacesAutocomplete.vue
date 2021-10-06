<template>
    <vuetify-google-autocomplete
        id="map"
        append-icon="mdi-search"
        :placeholder="placeholder"
        v-on:placechanged="getAddressData"
        outlined
        :value="valueLocal.address"
    >
    </vuetify-google-autocomplete>
</template>

<script>
export default {
    props: {
        value: Object,
        placeholder: String,
    },

    data() {
        return {
            valueLocal: this.value,
        };
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
