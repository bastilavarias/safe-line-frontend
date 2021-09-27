<template>
    <v-text-field
        :outlined="outlined"
        :label="label"
        :append-icon="isPasswordShow ? 'mdi-eye' : 'mdi-eye-off'"
        :type="isPasswordShow ? 'text' : 'password'"
        @click:append="isPasswordShow = !isPasswordShow"
    ></v-text-field>
</template>

<script>
export default {
    name: "b-password-field",

    props: {
        modelValue: String,
        label: String,
        outlined: Boolean,
    },

    data() {
        return {
            isPasswordShow: false,
        };
    },
};
</script>
