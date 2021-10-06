<template>
    <v-chip :color="color" :small="small" :class="className"
        ><slot></slot
    ></v-chip>
</template>

<script>
export default {
    name: "generic-status-chip",

    props: {
        type: String,
        status: String,
        small: String,
        className: String,
    },

    computed: {
        color() {
            let color;
            if (this.type === "clinic-registration") {
                const status = this.status;
                if (status === "approved") color = "success";
                if (status === "pending") color = "primary";
            }

            return color;
        },
    },
};
</script>
