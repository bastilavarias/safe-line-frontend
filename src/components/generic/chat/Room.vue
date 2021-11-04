<template>
    <v-list-item
        :two-line="!lastChat"
        :three-line="!!lastChat"
        exact
        :to="{ name: 'clinic-member-chat', query: { room_id: id } }"
    >
        <v-list-item-avatar :size="50">
            <v-img :src="avatar" v-if="avatar"></v-img>
            <v-img
                :src="require('@/assets/placeholder/clinic-information.png')"
                v-else
            ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title class="font-weight-bold">{{
                name
            }}</v-list-item-title>
            <v-list-item-subtitle v-if="lastChat">{{
                lastChat.message
            }}</v-list-item-subtitle>
            <v-list-item-subtitle class="caption font-italic" v-if="lastChat"
                >Updated
                {{
                    formatDateFromNow(lastChat.created_at)
                }}</v-list-item-subtitle
            >
            <v-list-item-subtitle class="font-italic" v-else
                >No lastest chat.</v-list-item-subtitle
            >
        </v-list-item-content>
    </v-list-item>
</template>

<script>
import dateMixin from "@/mixins/date";

export default {
    name: "generic-chat-room",

    mixins: [dateMixin],

    props: {
        id: Number,
        name: String,
        lastChat: [Object, null],
        avatar: [String, null],
        routeName: String,
    },
};
</script>
