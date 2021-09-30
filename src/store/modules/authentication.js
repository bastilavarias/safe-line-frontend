import {
    AUTHENTICATE_USER,
    PATIENT_SIGN_UP,
    PURGE_AUTHENTICATION,
    SET_AUTHENTICATION,
    SIGN_IN,
} from "@/store/action-types/authentication";
import apiService from "@/services/api";
import tokenService from "@/services/token";

const authenticationModule = {
    state: {
        isAuthenticated: !!tokenService.get(),
    },

    mutations: {
        [SET_AUTHENTICATION](state, token) {
            state.isAuthenticated = true;
            tokenService.save(token);
            apiService.setHeader();
        },

        [PURGE_AUTHENTICATION](state) {
            state.isAuthenticated = false;
            tokenService.remove();
        },
    },

    actions: {
        async [PATIENT_SIGN_UP](_, payload) {
            try {
                const response = await apiService.post("/auth/signup", payload);
                return await response.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async [SIGN_IN](_, payload) {
            try {
                const response = await apiService.post("/auth/login", payload);
                return await response.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async [AUTHENTICATE_USER]({ commit }) {
            const token = tokenService.get();
            if (token) return commit(SET_AUTHENTICATION, token);
            commit(PURGE_AUTHENTICATION);
        },
    },
};

export default authenticationModule;
