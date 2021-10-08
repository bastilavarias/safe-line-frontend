import moment from "moment";

const dateMixin = {
    methods: {
        formatSimpleDate(date) {
            return moment(new Date(date)).format("MMMM Do YYYY, h:mm:ss A");
        },
    },
};

export default dateMixin;
