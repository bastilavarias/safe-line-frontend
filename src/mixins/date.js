import moment from "moment";

const dateMixin = {
    methods: {
        formatSimpleDate(date) {
            return moment(new Date(date)).format("MMMM Do YYYY, h:mm:ss A");
        },

        formatDateFromNow(date) {
            return moment(new Date(date)).fromNow();
        },
    },
};

export default dateMixin;
