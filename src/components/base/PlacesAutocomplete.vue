<template>
    <vuetify-google-autocomplete
        id="map"
        append-icon="mdi-search"
        placeholder="Search Location"
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
