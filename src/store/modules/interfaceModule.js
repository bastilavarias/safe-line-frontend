import { SHOW_SERIVCES } from "@/store/action-types/interfaceModule";

export const userInterface = {
    state: {
        services: [],
    },
    mutations: {
        [SHOW_SERIVCES](state, services) {
            return (state.services = services);
        },
    },
};

export default userInterface;
