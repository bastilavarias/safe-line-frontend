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

                        <v-col cols="12" v-if="isCsr">
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
        <v-dialog width="1200" persistent v-model="isDoctorScheduleDialogOpen">
            <v-card>
                <v-card-title>
                    <span>Set Appointment</span>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="isDoctorScheduleDialogOpen = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-row dense>
                        <v-col cols="12" v-if="error">
                            <v-alert outlined type="error">
                                {{ error }}
                            </v-alert>
                        </v-col>

                        <v-col cols="12">
                            <v-autocomplete
                                outlined
                                :loading="isGetDoctorsStart"
                                :items="doctors"
                                label="Doctor"
                                item-text="user.profile.first_name"
                                item-value="user_id"
                                v-model="selectedDoctorID"
                            >
                                <template v-slot:selection="{ item }">
                                    {{ item.user.profile.first_name }}
                                    {{ item.user.profile.last_name }}
                                </template>
                                <template v-slot:item="{ item }">
                                    {{ item.user.profile.first_name }}
                                    {{ item.user.profile.last_name }}
                                </template>
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12" class="mb-5">
                            <div
                                class="
                                    d-flex
                                    justify-space-between
                                    align-center
                                "
                            >
                                <div class="subtitle-1 mb-1">
                                    Current Schedule ({{ currentMonth }})
                                </div>
                                <div class="d-flex">
                                    <v-btn icon @click="previousCalendar">
                                        <v-icon>mdi-chevron-left</v-icon>
                                    </v-btn>
                                    <v-btn icon @click="nextCalendar">
                                        <v-icon>mdi-chevron-right</v-icon>
                                    </v-btn>
                                </div>
                            </div>

                            <v-sheet height="600">
                                <v-calendar
                                    ref="calendar"
                                    color="primary"
                                    type="week"
                                    category-show-all
                                    :categories="calendar.categories"
                                    :events="calendar.events"
                                    v-model="time"
                                ></v-calendar>
                            </v-sheet>
                        </v-col>
                        <v-col cols="12">
                            <v-row dense>
                                <v-col cols="12">
                                    <div class="subtitle-1 mb-1">
                                        New Appointment Date & Time
                                    </div>
                                </v-col>

                                <v-col cols="12" md="6">
                                    <b-date-picker
                                        outlined
                                        placeholder="Date"
                                        :min="dateToday"
                                        v-model="schedule.date"
                                    ></b-date-picker>
                                </v-col>

                                <v-col cols="12" md="6">
                                    <v-menu
                                        ref="menu"
                                        v-model="menu2"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        :return-value.sync="time"
                                        transition="scale-transition"
                                        offset-y
                                        max-width="290px"
                                        min-width="290px"
                                    >
                                        <template
                                            v-slot:activator="{ on, attrs }"
                                        >
                                            <v-text-field
                                                outlined
                                                placeholder="Select Time"
                                                append-icon="mdi-clock-time-four-outline"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                :value="
                                                    formatAMPM(schedule.time)
                                                "
                                            ></v-text-field>
                                        </template>
                                        <v-time-picker
                                            v-if="menu2"
                                            v-model="schedule.time"
                                            full-width
                                            @click:minute="
                                                $refs.menu.save(schedule.time)
                                            "
                                        ></v-time-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>
                        </v-col>

                        <v-col cols="12">
                            <v-select
                                :items="appointmentTypes"
                                item-text-="text"
                                item-value="value"
                                label="Appointment Type"
                                outlined
                                v-model="schedule.appointmentType"
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        :disabled="!isFormValid"
                        @click="createAppointment"
                        :loading="isCreateAppointmentStart"
                    >
                        Add Schedule
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="isSnackbarShow" color="success" :timeout="3000">
            Appointment created successfully.
            <template v-slot:action="{ attrs }">
                <v-btn
                    color="white"
                    text
                    v-bind="attrs"
                    @click="isSnackbarShow = false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </v-app>
</template>

<script>
import GenericChatMessage from "@/components/generic/chat/Message";
import {
    CREATE_CHAT,
    FETCH_CHATS,
    FETCH_DIRECT_CHAT_ROOMS,
    FETCH_GROUP_CHAT_ROOMS,
    GET_ROOM_LATEST_CHAT,
} from "@/store/action-types/chat";
import GenericChatRoom from "@/components/generic/chat/Room";
import pusherService from "@/services/pusher";
import { GET_CLINIC_DOCTORS } from "@/store/action-types/clinic";
import {
    CREATE_APPOINTMENT,
    FETCH_DOCTOR_APPOINTMENT_SCHEDULE,
} from "@/store/action-types/appointment";
import dateMixin from "@/mixins/date";
import BDatePicker from "@/components/base/DatePicker";
import authorizationMixin from "@/mixins/authorization";

export default {
    components: { BDatePicker, GenericChatRoom, GenericChatMessage },

    mixins: [dateMixin, authorizationMixin],

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

            message: null,

            isDoctorScheduleDialogOpen: false,

            calendar: {
                categories: null,
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
            },

            isGetDoctorsStart: false,
            doctors: [],
            selectedDoctorID: null,

            time: null,
            menu2: false,

            schedule: {
                date: null,
                time: null,
                appointmentType: null,
            },

            error: null,

            isSnackbarShow: false,

            isCreateAppointmentStart: false,
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

        patientInformation() {
            const clinicRooms = this.clinicChatRoomList.data;
            const patientRooms = this.patientChatRoomList.data;
            const room =
                clinicRooms
                    .concat(patientRooms)
                    .find((room) => room.id === parseInt(this.roomID)) || null;
            if (!room) return room;
            return room.room_members[0].user || null;
        },

        isFormValid() {
            const { time, date, appointmentType } = this.schedule;
            return this.selectedDoctorID && time && date && appointmentType;
        },

        appointmentTypes() {
            return [
                {
                    text: "Personal Visit",
                    value: "personal_visit",
                },

                {
                    text: "Video Teleconsultation",
                    value: "video_teleconsultation",
                },
            ];
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

        async isDoctorScheduleDialogOpen(isOpen) {
            if (isOpen) await this.getDoctors();
        },

        async selectedDoctorID(value) {
            this.calendar.events = [];
            if (value) {
                const selectedDoctorInformation = [...this.doctors].find(
                    (doctor) => doctor.user.id === value
                );
                this.calendar.categories = [
                    selectedDoctorInformation.user.profile.first_name,
                ];
                await this.getDoctorAppointmentSchedules();
            }
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

            pusherService.instance().bind("new-chat", async () => {
                const { data } = await this.$store.dispatch(
                    GET_ROOM_LATEST_CHAT,
                    roomID
                );
                console.log(data);
                if (data) {
                    const lastChat = data.last_chat;
                    if (
                        !this.chats.data
                            .map((chat) => chat.id)
                            .includes(lastChat.id)
                    )
                        this.chats.data = [...this.chats.data, lastChat];

                    if (data.room_members.length === 2) {
                        this.patientChatRoomList.data =
                            this.patientChatRoomList.data.filter(
                                (room) => room.id !== data.id
                            );
                        this.patientChatRoomList.data = [
                            data,
                            ...this.patientChatRoomList.data,
                        ];
                        return;
                    }

                    this.clinicChatRoomList.data =
                        this.clinicChatRoomList.data.filter(
                            (room) => room.id !== data.id
                        );
                    this.clinicChatRoomList.data = [
                        data,
                        ...this.clinicChatRoomList.data,
                    ];

                    this.scrollBottom();
                }
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

        async getDoctors() {
            this.isGetDoctorsStart = true;
            const result = await this.$store.dispatch(
                GET_CLINIC_DOCTORS,
                this.clinicInformation.id
            );
            this.doctors = result.data;
            this.isGetDoctorsStart = false;
        },

        rnd(a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a;
        },

        async getDoctorAppointmentSchedules() {
            const result = await this.$store.dispatch(
                FETCH_DOCTOR_APPOINTMENT_SCHEDULE,
                this.selectedDoctorID
            );
            const schedule = result.data;

            for (let i = 0; i < schedule.length; i++) {
                if (schedule[i].appointment) {
                    const min = this.formatCalendarDate(
                        `${
                            schedule[i].appointment.appointment_date.split(
                                " "
                            )[0]
                        } ${schedule[i].appointment.appointment_time}`
                    );

                    this.calendar.events.push({
                        name:
                            schedule[i].appointment.type === "personal_visit"
                                ? "Personal Visit"
                                : "Video Teleconsultation",
                        start: min,
                        color: this.calendar.colors[
                            this.rnd(0, this.calendar.colors.length - 1)
                        ],
                    });
                }
            }
        },

        async createAppointment() {
            this.isCreateAppointmentStart = true;
            const { time, date, appointmentType } = this.schedule;
            const payload = {
                doctor_id: this.selectedDoctorID,
                clinic_id: this.clinicInformation.id,
                patient_id: this.patientInformation.id,
                time,
                date,
                appointment_type: appointmentType,
            };
            const result = await this.$store.dispatch(
                CREATE_APPOINTMENT,
                payload
            );

            if (!result.success) {
                this.isCreateAppointmentStart = false;
                return (this.error = result.message);
            }

            this.isCreateAppointmentStart = false;
            this.isDoctorScheduleDialogOpen = false;
            this.isSnackbarShow = true;

            this.selectedDoctorID = null;
            this.error = null;
            this.doctors = [];
            this.calendar.events = [];
            this.schedule.date = null;
            this.schedule.time = null;
            this.schedule.appointmentType = null;
        },

        async nextCalendar() {
            this.$refs.calendar.next();
        },

        async previousCalendar() {
            this.$refs.calendar.prev();
        },
    },

    async created() {
        if (this.user) this.subscribeClinicMemberChatRoomListener();
        await this.fetchClinicChatRooms();
        await this.fetchPatientChatRooms();

        if (this.roomID) {
            if (!this.currentRoom) {
                await this.$router.go(-1);
            }

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
