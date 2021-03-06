import {
    AUTHENTICATE_USER,
    PATIENT_SIGN_UP,
    PURGE_AUTHENTICATION,
    SET_AUTHENTICATION,
    SIGN_IN,
    CLINIC_SIGNUP,
    SEARCH_EMAIL,
    RESET_PASSWORD,
    SET_USER_DETAILS,
} from "@/store/action-types/authentication";
import apiService from "@/services/api";
import tokenService from "@/services/token";

const storeDetails = ({ user, clinic }) => {
    if (user.user_type === "patient" || user.user_type === "super_admin")
        return window.localStorage.setItem("details", JSON.stringify({ user }));
    window.localStorage.setItem("details", JSON.stringify({ user, clinic }));
};

const removeDetails = () => {
    window.localStorage.removeItem("details");
};

const authenticationModule = {
    state: {
        isAuthenticated: !!tokenService.get(),
        details: JSON.parse(window.localStorage.getItem("details")) || null,
    },

    mutations: {
        [SET_AUTHENTICATION](state, payload) {
            state.isAuthenticated = true;
            state.details = Object.assign({}, payload.details);
            storeDetails(payload.details);
            tokenService.save(payload.access_token);
            apiService.setHeader(payload.access_token);
        },

        [PURGE_AUTHENTICATION](state) {
            state.isAuthenticated = false;
            removeDetails();
            tokenService.remove();
        },

        [SET_USER_DETAILS](state, payload) {
            if (state.isAuthenticated) {
                state.details.user = Object.assign({}, payload);
                removeDetails();
                storeDetails(state.details);
            }
        },
    },

    actions: {
        async [PATIENT_SIGN_UP]({ commit }, payload) {
            try {
                const response = await apiService.post("/auth/signup", payload);
                const { access_token, user } = response.data.data;
                const authPayload = {
                    access_token,
                    details: { user },
                };
                commit(SET_AUTHENTICATION, authPayload);
                return await response.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async [SIGN_IN]({ commit }, formPayload) {
            try {
                const response = await apiService.post(
                    "/auth/login",
                    formPayload
                );
                const { access_token, user, clinic } = response.data.data;
                const authPayload = {
                    access_token,
                    details: { user, clinic },
                };
                commit(SET_AUTHENTICATION, authPayload);
                return await response.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async [AUTHENTICATE_USER]({ commit }) {
            const accessToken = tokenService.get();
            const details = JSON.parse(window.localStorage.getItem("details"));
            const payload = { access_token: accessToken, details };
            if (accessToken) return commit(SET_AUTHENTICATION, payload);
            commit(PURGE_AUTHENTICATION);
        },

        async [CLINIC_SIGNUP]({ commit }, payload) {
            try {
                const response = await apiService.post("/clinics", payload);
                const { access_token, clinic } = response.data.data;
                const authPayload = {
                    access_token,
                    details: { clinic },
                };
                commit(SET_AUTHENTICATION, authPayload);
                return await response.data;
            } catch (error) {
                error.response.data;
            }
        },

        async [SEARCH_EMAIL](_, payload) {
            try {
                const response = await apiService.post(
                    "/auth/reset-password",
                    payload
                );
                return await response.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async [RESET_PASSWORD](_, payload) {
            try {
                const response = await apiService.post(
                    "/auth/reset/password",
                    payload
                );
                return await response.data;
            } catch (error) {
                return error.response.data;
            }
        },
    },
};

export default authenticationModule;
