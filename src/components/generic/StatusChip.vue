<template>
    <v-chip :color="color" :small="small" :class="className" :label="label"
        ><slot></slot
    ></v-chip>
</template>

<script>
export default {
    name: "generic-status-chip",

    props: {
        type: String,
        status: String,
        small: Boolean,
        label: Boolean,
        className: String,
    },

    computed: {
        color() {
            let color;
            if (this.type === "clinic-registration") {
                const status = this.status;
                if (status === "approved") color = "success";
                if (status === "pending") color = "primary";
                if (status === "rejected") color = "error";
            }

            return color;
        },
    },
};
</script>
