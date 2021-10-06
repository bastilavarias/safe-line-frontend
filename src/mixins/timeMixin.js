import moment from "moment";

const timeMixin = {
    methods: {
        formatSimpleTime(time) {
            return moment(time, "HH:mm").format("hh:mm A");
        },
    },
};

export default timeMixin;
