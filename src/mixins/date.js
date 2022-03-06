import moment from "moment";

const dateMixin = {
    computed: {
        dateToday() {
            return moment().format("YYYY-MM-DD");
        },

        currentTime() {
            return moment().format("HH:mm");
        },
    },
    methods: {
        formatSimpleDate(date) {
            return moment(new Date(date)).format("MMMM Do YYYY");
        },

        formatDateFromNow(date) {
            return moment(new Date(date)).fromNow();
        },

        formatCalendarDate(date) {
            return moment(new Date(date)).format("YYYY-MM-DD HH:mm");
        },

        formatAMPM(time) {
            if (!time) return "";
            return moment(new Date(`2021-12-02 ${time}`)).format("hh:mm A");
        },
    },
};

export default dateMixin;
