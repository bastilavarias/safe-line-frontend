import {
    CREATE_APPOINTMENT,
    DELETE_APPOINTMENT,
    FETCH_CLINIC_APPOINTMENTS,
    FETCH_DOCTOR_APPOINTMENT_SCHEDULE,
    REQUEST_APPOINTMENT,
    UPDATE_APPOINTMENT,
} from "@/store/action-types/appointment";
import { FETCH_PATIENT_APPOINTMENTS } from "@/store/action-types/appointment";
import { FETCH_DOCTOR_APPOINTMENTS } from "@/store/action-types/appointment";
import { FETCH_DOCTOR_SCHEDULE } from "@/store/action-types/appointment";
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

        async [FETCH_DOCTOR_APPOINTMENTS](_) {
            try {
                const response = await apiService.get(
                    `/appointments/doctor/${doctorID}`
                );
                return response.data;
            } catch (error) {
                console.log(error);
                return error.response.data;
            }
        },

        async [FETCH_CLINIC_APPOINTMENTS](_, clinicID) {
            try {
                const response = await apiService.get(
                    `/appointments/clinic/${clinicID}`
                );
                return response.data;
            } catch (error) {
                console.log(error);
                return error.response.data;
            }
        },

        async [FETCH_DOCTOR_APPOINTMENT_SCHEDULE](_, doctorID) {
            try {
                const response = await apiService.get(
                    `/appointments/schedule/doctor/${doctorID}`
                );
                return response.data;
            } catch (error) {
                console.log(error);
                return error.response.data;
            }
        },

        async [CREATE_APPOINTMENT](_, payload) {
            try {
                const response = await apiService.post(
                    "/appointments",
                    payload
                );
                return response.data;
            } catch (error) {
                console.log(error);
                return error.response.data;
            }
        },

        async [UPDATE_APPOINTMENT](_, payload) {
            try {
                const response = await apiService.post(
                    "/appointments",
                    payload
                );
                return response.data;
            } catch (error) {
                console.log(error);
                return error.response.data;
            }
        },

        async [DELETE_APPOINTMENT](_, appointmentID) {
            try {
                const response = await apiService.delete(
                    `/appointments/${appointmentID}`
                );
                return response.data;
            } catch (error) {
                console.log(error);
                return error.response.data;
            }
        },

        async [FETCH_DOCTOR_SCHEDULE](_, doctorID) {
            try {
                const response = await apiService.get(`
                /appointments/schedule/doctor/${doctorID}`);
                return response.data;
            } catch (error) {
                console.log(error);
                return error.response.data;
            }
        },

        // async [POST_APPOINTMENT](_, appointmentPayload) {
        //     try {
        //     } catch (error) {}
        // },
    },
};

export default appointmentModule;
