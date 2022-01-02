import { REQUEST_APPOINTMENT } from "@/store/action-types/appointment";
import { FETCH_PATIENT_APPOINTMENTS } from "@/store/action-types/appointment";
import { FETCH_DOCTOR_APPOINTMENTS } from "@/store/action-types/appointment";
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
        async [FETCH_PATIENT_APPOINTMENTS](_, patientID) {
            try {
                const response = await apiService.get(
                    `/appointments/patient/${patientID}` // /appointment/patient/2
                );
                return response.data;
            } catch (error) {
                console.log(error);
                return error.response.data;
            }
        },
        async [FETCH_DOCTOR_APPOINTMENTS](_, doctorID) {
            try {
                const response = await apiService.get(
                    "/appointments/doctor/10"
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
