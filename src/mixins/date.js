import moment from "moment";

const dateMixin = {
    methods: {
        formatSimpleDate(date) {
            return moment(new Date(date)).format("MMMM Do YYYY");
        },

        formatDateFromNow(date) {
            return moment(new Date(date)).fromNow();
        },
    },
};

export default dateMixin;
