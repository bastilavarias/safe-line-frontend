import { DRAWER_SHOW } from "@/store/action-types/interfaceModule";

export const userInterface = {
    state: {
        drawer: false,
    },
    mutations: {
        [DRAWER_SHOW](state, drawer) {
            return (state.drawer = drawer);
        },
    },
};

export default userInterface;
