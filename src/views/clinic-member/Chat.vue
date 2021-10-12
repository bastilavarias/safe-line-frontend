<template>
    <v-row no-gutters>
        <v-col cols="12" md="4" lg="3" xl="2">
            <generic-chat-rooms></generic-chat-rooms>
        </v-col>
        <v-col cols="12" md="8" lg="9" xl="10">
            <div class="conversation" ref="conversation">
                <v-toolbar ref="conversationToolbar">
                    <v-toolbar-title>
                        <v-avatar :size="40" class="mr-3">
                            <v-img
                                :src="
                                    require('@/assets/placeholder/clinic-information.png')
                                "
                            ></v-img>
                        </v-avatar>
                        <span class="font-weight-bold">Clinic Name</span>
                    </v-toolbar-title>
                </v-toolbar>
                <div
                    class="conversation__messages"
                    :style="{
                        height: `${conversationMessagesHeight}px`,
                    }"
                >
                    <template v-for="n in 15">
                        <div class="mb-5" :key="n">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Deleniti earum et, exercitationem hic ipsa,
                            minus nulla omnis perspiciatis quaerat qui
                            reiciendis ullam. Ab aliquam debitis, dolorem
                            doloremque dolores eius error illo incidunt iure
                            nostrum officia quidem repellendus repudiandae saepe
                            sed, tenetur vitae! Animi, delectus, exercitationem?
                            A ad aliquam aliquid aspernatur assumenda
                            consectetur delectus dignissimos distinctio ducimus
                            ea, eaque ex inventore ipsum iusto labore laborum
                            molestias necessitatibus nisi odio odit perferendis
                            perspiciatis placeat porro quae quia quibusdam sed
                            sint tenetur voluptas voluptatum. Ad alias ea eaque
                            earum incidunt ratione, rem. Accusamus atque
                            corporis cupiditate explicabo facere facilis
                            laboriosam, rem ut voluptate.
                        </div>
                    </template>
                </div>
                <div class="conversation__writer" ref="conversationWriter">
                    <v-card flat>
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="8" md="9" lg="10" xl="11">
                                    <v-text-field
                                        rounded
                                        filled
                                        hide-details
                                        placeholder="Type your message here"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </div>
            </div>
        </v-col>
    </v-row>
</template>

<script>
import GenericChatRooms from "@/components/generic/chat/Rooms";

export default {
    components: { GenericChatRooms },

    data() {
        return {
            conversationMessagesHeight: 0,
        };
    },

    methods: {
        computeConversationMessagesHeight() {
            const { conversation, conversationToolbar, conversationWriter } =
                this.$refs;
            const conversationHeight = conversation.clientHeight;
            const toolbarHeight = conversationToolbar.$el.clientHeight;
            const writerHeight = conversationWriter.clientHeight;
            this.conversationMessagesHeight =
                conversationHeight - (toolbarHeight + writerHeight);
        },
    },

    created() {
        this.$nextTick(() => {
            this.computeConversationMessagesHeight();
        });
    },
};
</script>

<style lang="scss">
.conversation {
    position: relative;
    height: 100vh;

    &__messages {
        overflow: auto;
    }

    &__writer {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
    }
}
</style>
