<template>
    <v-app>
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
                                                :avatar="
                                                    room.room_members[0].user
                                                        .profile.image_url
                                                "
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
                        <v-spacer></v-spacer>
                        <v-btn icon @click="patientInformation = true"
                            ><v-icon>mdi-information-outline</v-icon></v-btn
                        >
                        <v-btn icon @click="isDoctorScheduleDialogOpen = true"
                            ><v-icon>mdi-calendar-edit</v-icon></v-btn
                        >
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
                                    :user="chat.user"
                                    :self="user.id === chat.user.id"
                                    :key="index"
                                ></generic-chat-message>
                            </template>
                            <infinite-loading
                                :identifier="chats.infiniteId"
                                direction="top"
                                @infinite="fetchChats"
                            >
                                <div slot="no-more"></div>
                                <div slot="no-results"></div>
                            </infinite-loading>
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
                                            v-model="message"
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
                                            :disabled="!message"
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
        <v-dialog width="500" v-model="patientInformation">
            <v-card>
                <v-card-title class="mb-5">Patient Information</v-card-title>
                <v-card-subtitle> Sex: </v-card-subtitle>
                <v-card-subtitle> Age: </v-card-subtitle>
                <v-card-subtitle> Symtom: </v-card-subtitle>
            </v-card>
        </v-dialog>
        <v-dialog width="800" v-model="isDoctorScheduleDialogOpen">
            <v-card>
                <v-card-title>Set Appointment</v-card-title>
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12">
                            <v-autocomplete label="Doctor"></v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                            <div class="d-flex justify-space-between mb-2">
                                <v-btn
                                    color="primary"
                                    @click="addSchedule = true"
                                >
                                    Add Schedule
                                </v-btn>
                            </div>
                            <v-sheet height="600">
                                <v-calendar
                                    ref="calendar"
                                    color="primary"
                                    type="day"
                                    category-show-all
                                    :categories="categories"
                                    :events="events"
                                    @change="fetchEvents"
                                ></v-calendar>
                            </v-sheet>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog width="500" v-model="addSchedule">
            <v-card class="px-5">
                <v-card-title class="ml-n6 mb-2"> Add Schedule </v-card-title>
                <v-row dense>
                    <v-col cols="12">
                        <v-select
                            v-model="appointmentForm.appointmentType"
                            outlined
                            chips
                            dense
                            label="Select Appointment Type"
                            :items="consultType"
                        >
                        </v-select>
                    </v-col>
                    <v-col cols="12">
                        <v-select
                            v-model="appointmentForm.startTime"
                            outlined
                            dense
                            label="Appointment Time"
                            :items="timetable"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" class="mr-n4">Add Appointment</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
import GenericChatMessage from "@/components/generic/chat/Message";
import {
    CREATE_CHAT,
    FETCH_CHATS,
    FETCH_DIRECT_CHAT_ROOMS,
    FETCH_GROUP_CHAT_ROOMS,
} from "@/store/action-types/chat";
import { FETCH_DOCTOR_SCHEDULE } from "@/store/action-types/appointment";
import { FETCH_PATIENT_SYMPTOM } from "@/store/action-types/symptom";
import GenericChatRoom from "@/components/generic/chat/Room";
import pusherService from "@/services/pusher";

export default {
    components: { GenericChatRoom, GenericChatMessage },

    data() {
        return {
            appointmentForm: {
                appointmentType: null,
                startTime: null,
            },

            timetable: [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
            ],

            consultType: ["Video Telecommunication", "Walk In"],

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

            message: null,

            isDoctorScheduleDialogOpen: false,
            patientInformation: false,
            addSchedule: false,

            categories: ["Dr John Doe schedule today"],
            events: [],
            colors: [
                "blue",
                "indigo",
                "deep-purple",
                "cyan",
                "green",
                "orange",
                "grey darken-1",
            ],
            names: [
                "Meeting",
                "Holiday",
                "PTO",
                "Travel",
                "Event",
                "Birthday",
                "Conference",
                "Party",
            ],
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
            const chats =
                result.data.length > 0
                    ? result.data.sort((a, b) => a.id - b.id)
                    : [];

            if (this.chats.page === 1) this.scrollBottom();

            this.chats.data = [...chats, ...this.chats.data];
            this.scrollBottom();
            if (chats.length === this.chats.perPage) {
                this.chats.page += 1;
                $state.loaded();
            } else {
                $state.complete();
            }

            this.chats.loading = false;
        },

        async createChat() {
            if (this.message) {
                const payload = {
                    room_id: this.roomID,
                    message: this.message,
                };
                this.message = null;
                await this.$store.dispatch(CREATE_CHAT, payload);
            }
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

            pusherService.instance().bind("new-chat", ({ data }) => {
                const lastChat = data.last_chat;
                if (
                    !this.chats.data
                        .map((chat) => chat.id)
                        .includes(lastChat.id)
                )
                    this.chats.data = [...this.chats.data, lastChat];
                this.patientChatRoomList.data =
                    this.patientChatRoomList.data.filter(
                        (room) => room.id !== data.id
                    );
                this.patientChatRoomList.data = [
                    data,
                    ...this.patientChatRoomList.data,
                ];
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

        rnd(a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a;
        },

        fetchEvents({ start, end }) {
            const events = [];

            const min = new Date(`${start.date}T00:00:00`);
            const max = new Date(`${end.date}T23:59:59`);
            const days = (max.getTime() - min.getTime()) / 86400000;
            const eventCount = this.rnd(days, days + 20);

            for (let i = 0; i < eventCount; i++) {
                const allDay = this.rnd(0, 3) === 0;
                const firstTimestamp = this.rnd(min.getTime(), max.getTime());
                const first = new Date(
                    firstTimestamp - (firstTimestamp % 900000)
                );
                const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
                const second = new Date(first.getTime() + secondTimestamp);

                console.log({
                    name: this.names[this.rnd(0, this.names.length - 1)],
                    start: first,
                    end: second,
                    color: this.colors[this.rnd(0, this.colors.length - 1)],
                    timed: !allDay,
                    category:
                        this.categories[
                            this.rnd(0, this.categories.length - 1)
                        ],
                });

                events.push({
                    name: this.names[this.rnd(0, this.names.length - 1)],
                    start: first,
                    end: second,
                    color: this.colors[this.rnd(0, this.colors.length - 1)],
                    timed: !allDay,
                    category:
                        this.categories[
                            this.rnd(0, this.categories.length - 1)
                        ],
                });
            }

            this.events = events;
        },

        // async fetchSymptoms() {
        //     const result = await this.$store.dispatch(FETCH_PATIENT_SYMPTOM);
        //     console.log(result.data);
        // },
        async fetchDoctorSchedule() {
            const doctorID = this.user.id;

            this.table.loading = true;
            const result = await this.$store.dispatch(
                FETCH_DOCTOR_SCHEDULE,
                doctorID
            );
            console.log(result.data);
        },

        async createAppointment() {
            const { appointmentType, startTime } = this.appointmentForm;

            const start = `${startTime}:00:00`;
            const docId = this.user.id;
            const clinic = this.user.clinic.id;

            const payload = {
                appointment_type: appointmentType,
                start_time: start,
                doctor_id: docId,
                clinic_id: clinic,
            };
        },

        async fetchClinicMembers() {
            const clinicMembers = this.clinicInformation.clinic_members;
            console.log(clinicMembers);
        },
    },

    async created() {
        await this.fetchClinicMembers();

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
