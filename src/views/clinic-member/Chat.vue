<template>
    <v-row no-gutters>
        <v-col cols="12" md="4" lg="3" xl="2">
            <div class="rooms">
                <v-row no-gutters class="rooms__sticky-content">
                    <v-col cols="12" class="rooms__sticky-content__toolbar">
                        <v-card flat tile>
                            <v-card-title>Messages</v-card-title>
                            <v-card-text>
                                <v-text-field
                                    outlined
                                    placeholder="Search"
                                    dense
                                    prepend-inner-icon="mdi-magnify"
                                    hide-details
                                ></v-text-field>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <v-card flat :loading="clinicChatRoomList.loading">
                            <v-card-subtitle>
                                <v-icon>mdi-chevron-down</v-icon>
                                <span class="font-weight-bold">
                                    {{ clinicInformation.name }} Chats ({{
                                        clinicChatRoomList.data.length
                                    }})
                                </span>
                            </v-card-subtitle>
                            <v-list rounded v-model="clinicChatRoomList.state">
                                <v-skeleton-loader
                                    type="list-item-avatar-two-line"
                                    v-if="clinicChatRoomList.loading"
                                ></v-skeleton-loader>
                                <template
                                    v-for="clinic in clinicChatRoomList.data"
                                >
                                    <v-list-item two-line :key="clinic.id">
                                        <v-list-item-avatar :size="50">
                                            <v-img
                                                :src="
                                                    require('@/assets/placeholder/clinic-information.png')
                                                "
                                            ></v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title
                                                class="font-weight-bold"
                                                >{{
                                                    clinic.name
                                                }}</v-list-item-title
                                            >
                                            <v-list-item-subtitle
                                                >You: Lorem ipsum dolor sit
                                                amet, consectetur adipisicing
                                                elit. Asperiores,
                                                quaerat?</v-list-item-subtitle
                                            >
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>
                            </v-list>
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <v-card flat>
                            <v-card-subtitle>
                                <v-icon>mdi-chevron-down</v-icon>
                                <span class="font-weight-bold"> Patients </span>
                            </v-card-subtitle>
                            <v-list rounded v-model="clinicChatRoomListState">
                                <template v-for="n in 10">
                                    <v-list-item two-line :key="n">
                                        <v-list-item-avatar :size="50">
                                            <v-img
                                                :src="
                                                    require('@/assets/placeholder/clinic-information.png')
                                                "
                                            ></v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title
                                                class="font-weight-bold"
                                                >Patient Name</v-list-item-title
                                            >
                                            <v-list-item-subtitle
                                                >You: Lorem ipsum dolor sit
                                                amet, consectetur adipisicing
                                                elit. Asperiores,
                                                quaerat?</v-list-item-subtitle
                                            >
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>
                            </v-list>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
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
                    <div class="px-5 py-5">
                        <template v-for="n in 15">
                            <generic-chat-message
                                className="mb-5"
                                :key="n"
                                :self="n % 2 === 0"
                            ></generic-chat-message>
                        </template>
                    </div>
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
                                <v-col
                                    cols="4"
                                    md="3"
                                    lg="2"
                                    xl="1"
                                    class="text-center"
                                >
                                    <v-btn fab color="primary">
                                        <v-icon>mdi-send</v-icon>
                                    </v-btn>
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
import GenericChatMessage from "@/components/generic/chat/Message";
import { FETCH_GROUP_CHAT_ROOMS } from "@/store/action-types/chat";
export default {
    components: { GenericChatMessage },

    data() {
        return {
            clinicChatRoomListState: 1,
            patientChatRoomListState: null,
            conversationMessagesHeight: 0,
            clinicChatRoomList: {
                state: 1,
                data: [],
                loading: false,
            },
        };
    },

    computed: {
        authenticationDetails() {
            const details = this.$store.state.authentication.details;
            return details || null;
        },

        clinicInformation() {
            return this.authenticationDetails.clinic || null;
        },
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

        async fetchClinicChatRooms() {
            this.clinicChatRoomList.loading = true;
            const result = await this.$store.dispatch(FETCH_GROUP_CHAT_ROOMS);
            this.clinicChatRoomList.data = result.data;
            this.clinicChatRoomList.loading = false;
        },
    },

    async created() {
        await this.fetchClinicChatRooms();
        this.$nextTick(() => {
            this.computeConversationMessagesHeight();
        });
    },
};
</script>

<style lang="scss">
.rooms {
    height: 100vh;
    border-right: 1px solid #b0b0b0;
    overflow: auto;

    &__sticky-content {
        height: 100%;

        &__toolbar {
            position: sticky;
            top: 0;
            left: 0;
            z-index: 1;
        }
    }
}

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
