import { SHOW_SERVICES } from "@/store/action-types/interfaceModule";

export const userInterface = {
    state: {
        services: [],
    },
    mutations: {
        [SHOW_SERVICES](state, services) {
            return (state.services = services);
        },
    },
};

export default userInterface;
