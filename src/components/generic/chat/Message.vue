<template>
    <div :class="`d-flex justify-space-between ${className}`">
        <div v-if="self"></div>
        <div class="d-flex">
            <div class="mr-5" v-if="!self">
                <v-avatar :size="35">
                    <v-img :src="user.profile.image_url"></v-img>
                </v-avatar>
            </div>
            <div>
                <span class="subtitle-2 d-block mb-3" v-if="!self"
                    >{{ user.profile.first_name }}
                    {{ user.profile.last_name }}</span
                >
                <v-card
                    rounded
                    :color="self ? 'primary' : '#E2E2E2'"
                    max-width="400"
                    flat
                >
                    <v-card-text
                        :class="`${self ? 'white--text' : 'black--text'}`"
                        >{{ message }}</v-card-text
                    >
                    <v-card-actions v-if="!self">
                        <v-spacer></v-spacer>
                        <span
                            :class="`${
                                self ? 'white--text' : 'black--text'
                            } caption`"
                        >
                            {{ formatDateFromNow(createdAt) }}</span
                        >
                    </v-card-actions>
                </v-card>
                <div class="py-2 d-flex justify-space-between" v-if="self">
                    <p class="d-block body-2">Sent by CSR Name</p>
                    <p class="d-block body-2">
                        {{ formatDateFromNow(createdAt) }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dateMixin from "@/mixins/date";

export default {
    name: "generic-chat-message",

    mixins: [dateMixin],

    props: {
        className: String,
        message: String,
        createdAt: String,
        self: Boolean,
        user: Object,
    },
};
</script>
