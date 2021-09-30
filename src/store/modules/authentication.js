import { PATIENT_SIGN_UP, SIGN_IN } from "@/store/action-types/authentication";
import apiService from "@/services/api";

const authenticationModule = {
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
    },
};

export default authenticationModule;
