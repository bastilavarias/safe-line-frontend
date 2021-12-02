import {
    FETCH_CLINICS,
    UPDATE_CLINIC_STATUS,
    CLINIC_SERVICES,
    FETCH_NEAREST_CLINICS,
} from "@/store/action-types/clinic";
import apiService from "@/services/api";
import axios from "axios";

const clinicModule = {
    actions: {
        async [FETCH_CLINICS](_, { page, perPage, search }) {
            try {
                const route = `${apiService.baseURL()}/clinics`;
                const url = new URL(route);
                const params = new URLSearchParams(url.search);
                params.set("page", page);
                params.set("per_page", perPage);
                if (search) params.set("search", search);
                const response = await apiService.get(`/clinics?${params}`);
                return response.data;
            } catch (error) {
                console.log(error);
                return error.response.data;
            }
        },

        async [UPDATE_CLINIC_STATUS](_, payload) {
            try {
                const response = await apiService.put("/clinics", payload);
                return response.data;
            } catch (error) {
                console.log(error);
                return error.response.data;
            }
        },

        async [CLINIC_SERVICES](_) {
            try {
                const response = await apiService.get("/clinics/services");
                return response.data;
            } catch (error) {
                console.log(error);
                return error.response.data;
            }
        },

        async [FETCH_NEAREST_CLINICS](_, { serviceID, latitude, longitude }) {
            try {
                const response = await apiService.get(
                    `/clinics/nearest/${serviceID}?latitude=${latitude}&longitude=${longitude}`
                );
                return response.data;
            } catch (error) {
                console.log(error);
                return error.response.data;
            }
        },
    },
};

export default clinicModule;
