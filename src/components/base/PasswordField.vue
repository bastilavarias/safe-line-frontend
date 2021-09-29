<template>
    <v-text-field
        :outlined="outlined"
        :label="label"
        :append-icon="isPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
        :type="isPasswordShow ? 'text' : 'password'"
        @click:append="isPasswordShow = !isPasswordShow"
        @input="$emit('input', valueLocal)"
        v-model="valueLocal"
        :rules="rules"
    ></v-text-field>
</template>

<script>
export default {
    name: "b-password-field",

    props: {
        value: String,
        label: String,
        outlined: Boolean,
        rules: Array,
    },

    data() {
        return {
            isPasswordShow: false,
            valueLocal: this.value,
        };
    },
};
</script>
