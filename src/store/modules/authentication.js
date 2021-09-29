import { USER_SIGN_UP } from "@/store/action-types/authentication";
import apiService from "@/services/api";

const authenticationModule = {
    actions: {
        async [USER_SIGN_UP](_, payload) {
            try {
                const response = await apiService.post("/auth/signup", payload);
                return await response.data;
            } catch (error) {
                return error.response.data;
            }
        },
    },
};

export default authenticationModule;
