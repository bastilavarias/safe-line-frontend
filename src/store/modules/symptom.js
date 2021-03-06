import {
    FETCH_SYMPTOMS,
    GET_RECOMMENDATION,
    FETCH_PATIENT_SYMPTOM,
} from "@/store/action-types/symptom";
import apiService from "@/services/api";

const symptomModule = {
    actions: {
        async [FETCH_SYMPTOMS]() {
            try {
                const lsSymptoms =
                    JSON.parse(window.localStorage.getItem("symptoms")) || [];
                if (lsSymptoms.length > 0) return lsSymptoms;
                const response = await apiService.get("/symptoms");
                const symptoms = response.data.data;
                window.localStorage.setItem(
                    "symptoms",
                    JSON.stringify(symptoms)
                );
                return symptoms;
            } catch (error) {
                return error.response.data;
            }
        },

        async [GET_RECOMMENDATION](_, payload) {
            try {
                const response = await apiService.post(
                    "/symptoms/specialist",
                    payload
                );
                return response.data;
            } catch (error) {}
        },

        async [FETCH_PATIENT_SYMPTOM](_) {
            try {
                const response = await apiService.get("/symptoms");
                return response.data;
            } catch (error) {
                console.log(error);
                return error.response.data;
            }
        },
    },
};

export default symptomModule;
