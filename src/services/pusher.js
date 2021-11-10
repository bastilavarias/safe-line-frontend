import Pusher from "pusher-js";

let pusher;

const pusherService = {
    init: () => {
        pusher = new Pusher(process.env.VUE_APP_PUSHER_API_KEY, {
            cluster: "mt1",
        });
        return pusher;
    },

    instance: () => {
        if (pusher) return pusher;
    },
};

export default pusherService;
