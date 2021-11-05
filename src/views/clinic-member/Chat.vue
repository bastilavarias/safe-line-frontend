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

                            <v-list rounded>
                                <v-skeleton-loader
                                    type="list-item-avatar-two-line"
                                    v-if="clinicChatRoomList.loading"
                                ></v-skeleton-loader>
                                <v-list-item-group
                                    v-model="clinicChatRoomList.state"
                                >
                                    <template
                                        v-for="room in clinicChatRoomList.data"
                                    >
                                        <generic-chat-room
                                            :id="room.id"
                                            :name="room.name"
                                            :last-chat="null"
                                            route-name="clinic-member-chat"
                                            :key="room.id"
                                        ></generic-chat-room>
                                    </template>
                                </v-list-item-group>
                            </v-list>
                        </v-card>
                    </v-col>

                    <v-col cols="12">
                        <v-card flat>
                            <v-card-subtitle>
                                <v-icon>mdi-chevron-down</v-icon>
                                <span class="font-weight-bold">
                                    Patient Chats ({{
                                        patientChatRoomList.data.length
                                    }})
                                </span>
                            </v-card-subtitle>
                            <v-list rounded>
                                <v-skeleton-loader
                                    type="list-item-avatar-two-line"
                                    v-if="patientChatRoomList.loading"
                                ></v-skeleton-loader>
                                <v-list-item-group
                                    v-model="patientChatRoomList.state"
                                >
                                    <template
                                        v-for="room in patientChatRoomList.data"
                                    >
                                        <generic-chat-room
                                            :id="room.id"
                                            :name="`${room.room_members[0].user.profile.first_name} ${room.room_members[0].user.profile.last_name}`"
                                            :last-chat="room.last_chat"
                                            avatar="https://avatars.githubusercontent.com/u/1024025?v=4"
                                            route-name="clinic-member-chat"
                                            :key="room.id"
                                        ></generic-chat-room>
                                    </template>
                                </v-list-item-group>
                            </v-list>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
        </v-col>
        <v-col cols="12" md="8" lg="9" xl="10">
            <div class="conversation" ref="conversation" v-if="roomID">
                <v-toolbar ref="conversationToolbar">
                    <v-toolbar-title v-if="currentRoom">
                        <span class="font-weight-bold">{{
                            currentRoom.name
                        }}</span>
                    </v-toolbar-title>
                </v-toolbar>
                <div
                    class="conversation__messages"
                    ref="conversationMessagesDiv"
                    :style="{
                        height: `${conversationMessagesHeight}px`,
                    }"
                >
                    <div class="px-5 py-5">
                        <template v-for="(chat, index) in chats.data">
                            <generic-chat-message
                                className="mb-5"
                                :message="chat.message"
                                :created-at="chat.created_at"
                                :key="index"
                            ></generic-chat-message>
                        </template>
                        <infinite-loading
                            direction="top"
                            @infinite="fetchChats"
                        ></infinite-loading>
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
                                        @keyup.enter="createChat"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="4"
                                    md="3"
                                    lg="2"
                                    xl="1"
                                    class="text-center"
                                >
                                    <v-btn
                                        fab
                                        color="primary"
                                        @click="createChat"
                                    >
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
import {
    FETCH_CHATS,
    FETCH_DIRECT_CHAT_ROOMS,
    FETCH_GROUP_CHAT_ROOMS,
} from "@/store/action-types/chat";
import GenericChatRoom from "@/components/generic/chat/Room";
import pusherService from "@/services/pusher";

export default {
    components: { GenericChatRoom, GenericChatMessage },

    data() {
        return {
            conversationMessagesHeight: 0,

            clinicChatRoomList: {
                state: 1,
                data: [],
                loading: false,
            },

            patientChatRoomList: {
                state: 1,
                data: [],
                loading: false,
            },

            chats: {
                data: [],
                loading: false,
                page: 1,
                perPage: 5,
                infiniteId: +new Date(),
            },
        };
    },

    computed: {
        authenticationDetails() {
            const details = this.$store.state.authentication.details;
            return details || null;
        },

        user() {
            return this.authenticationDetails.user || null;
        },

        clinicInformation() {
            return this.authenticationDetails.clinic || null;
        },

        roomID() {
            return parseInt(this.$route.query.room_id) || null;
        },

        currentRoom() {
            const clinicRooms = this.clinicChatRoomList.data;
            const patientRooms = this.patientChatRoomList.data;
            const room =
                clinicRooms
                    .concat(patientRooms)
                    .find((room) => room.id === parseInt(this.roomID)) || null;
            if (!room) return room;
            return {
                name:
                    room.room_type === "group"
                        ? room.name
                        : `${room.room_members[0].user.profile.first_name} ${room.room_members[0].user.profile.last_name}`,
            };
        },
    },

    watch: {
        async roomID(newValue, oldValue) {
            if (oldValue) this.unsubscribeRoomChatListener(oldValue);
            if (newValue) {
                this.subscribeRoomChatListener(newValue);
                this.$nextTick(() => {
                    this.computeConversationMessagesHeight();
                });
            }

            this.chats = {
                ...this.chats,
                data: [],
                loading: false,
                page: 1,
                infiniteId: (this.chats.infiniteId += 1),
            };
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

        async fetchPatientChatRooms() {
            this.patientChatRoomList.loading = true;
            const result = await this.$store.dispatch(FETCH_DIRECT_CHAT_ROOMS);
            this.patientChatRoomList.data = result.data;
            this.patientChatRoomList.loading = false;
        },

        async fetchChats($state) {
            this.chats.loading = true;
            const payload = {
                page: this.chats.page,
                perPage: this.chats.perPage,
                roomID: this.roomID,
            };
            const result = await this.$store.dispatch(FETCH_CHATS, payload);
            const chats = result.data;
            this.chats.data = [...this.chats.data, ...chats];
            if (this.chats.page === 1) this.scrollBottom();

            if (chats.length === this.chats.perPage) {
                this.chats.page += 1;
                $state.loaded();
            } else {
                $state.complete();
            }

            this.chats.loading = false;
        },

        createChat() {
            this.chats.data = [...this.chats.data, this.chats.data[0]];
            this.scrollBottom();
        },

        subscribeClinicMemberChatRoomListener() {
            pusherService.instance().subscribe(`user-${this.user.id}`);

            pusherService.instance().bind("new-room", ({ data }) => {
                this.patientChatRoomList.data = [
                    data,
                    ...this.patientChatRoomList.data,
                ];
            });
        },

        unsubscribeClinicMemberChatRoomListener() {
            pusherService.instance().unsubscribe(`user-${this.user.id}`);
        },

        subscribeRoomChatListener(roomID) {
            pusherService.instance().subscribe(`room-${roomID}`);

            pusherService.instance().bind("create-chat", ({ data }) => {
                if (!this.chats.data.map((chat) => chat.id).includes(data.id))
                    this.chats.data = [...this.chats.data, data];
                this.scrollBottom();
            });
        },

        unsubscribeRoomChatListener(roomID) {
            pusherService.instance().unsubscribe(`room-${roomID}`);
        },

        scrollBottom() {
            this.$nextTick(() => {
                const { conversationMessagesDiv } = this.$refs;
                conversationMessagesDiv.scrollTop =
                    conversationMessagesDiv.scrollHeight ||
                    conversationMessagesDiv.clientHeight;
            });
        },
    },

    async created() {
        if (this.user) this.subscribeClinicMemberChatRoomListener();
        await this.fetchClinicChatRooms();
        await this.fetchPatientChatRooms();

        if (this.roomID) {
            this.subscribeRoomChatListener(this.roomID);
            this.$nextTick(() => {
                this.computeConversationMessagesHeight();
            });
        }

        window.addEventListener("scroll", this.scrollBottom);
        // this.$nextTick(() => {
        //     this.$refs.conversationMessagesDiv.addEventListener(
        //         "scroll",
        //         this.scrollBottom
        //     );
        // });
    },

    destroyed() {
        this.unsubscribeClinicMemberChatRoomListener();
        if (this.roomID) this.unsubscribeRoomChatListener(this.roomID);
        window.removeEventListener("scroll", this.scrollBottom);
    },
};
</script>

<style lang="scss">
.rooms {
    height: 100vh;
    border-right: 1px solid #b0b0b0;
    overflow: auto;

    &__sticky-content {
        //height: 100%;

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
