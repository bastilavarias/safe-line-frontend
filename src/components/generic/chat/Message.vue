<template>
    <div :class="`d-flex justify-space-between ${className}`">
        <div v-if="self"></div>
        <div class="d-flex">
            <div class="mr-5" v-if="!self">
                <v-avatar :size="35">
                    <v-img
                        src="https://avatars.githubusercontent.com/u/1024025?v=4"
                    ></v-img>
                </v-avatar>
            </div>
            <div>
                <span class="subtitle-2 d-block mb-3" v-if="!self"
                    >John Doe</span
                >
                <v-card
                    rounded
                    :color="self ? 'primary' : '#E2E2E2'"
                    max-width="400"
                    flat
                >
                    <v-card-text
                        :class="`${self ? 'white--text' : 'black--text'}`"
                        >Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Alias iste molestiae omnis sequi? Deleniti
                        distinctio error magnam officia placeat repudiandae. A
                        alias amet aperiam, aspernatur assumenda commodi eaque
                        expedita harum illo in, iure mollitia natus nostrum quae
                        qui recusandae repellendus repudiandae sit tempora
                        temporibus tenetur unde ut vel voluptates
                        voluptatibus.</v-card-text
                    >
                    <v-card-actions v-if="!self">
                        <v-spacer></v-spacer>
                        <span
                            :class="`${
                                self ? 'white--text' : 'black--text'
                            } caption`"
                            >2:45 PM</span
                        >
                    </v-card-actions>
                </v-card>
                <div class="py-2 d-flex justify-space-between" v-if="self">
                    <p class="d-block body-2">Sent by CSR Name</p>
                    <p class="d-block body-2">2:45 PM</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "generic-chat-message",

    props: {
        className: String,
        self: Boolean,
    },
};
</script>
