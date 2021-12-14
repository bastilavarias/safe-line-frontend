import { REQUEST_APPOINTMENT } from "@/store/action-types/appointment";
import apiService from "@/services/api";

const appointmentModule = {
    actions: {
        async [REQUEST_APPOINTMENT](_, payload) {
            try {
                const response = await apiService.post(
                    "/appointments/request",
                    payload
                );
                return response.data;
            } catch (error) {
                console.log(error);
                return error.response.data;
            }
        },
    },
};

export default appointmentModule;
