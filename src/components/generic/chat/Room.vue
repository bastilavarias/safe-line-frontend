<template>
    <v-list-item two-line>
        <v-list-item-avatar :size="50">
            <v-img
                :src="require('@/assets/placeholder/clinic-information.png')"
            ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title class="font-weight-bold">{{
                name
            }}</v-list-item-title>
            <v-list-item-subtitle v-if="lastChat"
                >You: Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Asperiores, quaerat?</v-list-item-subtitle
            >
            <v-list-item-subtitle class="font-italic" v-else
                >No lastest chat.</v-list-item-subtitle
            >
        </v-list-item-content>
    </v-list-item>
</template>

<script>
export default {
    name: "generic-chat-room",

    props: {
        id: Number,
        name: String,
        lastChat: [Object, null],
    },
};
</script>
