import {
    CREATE_CHAT,
    FETCH_CHATS,
    FETCH_DIRECT_CHAT_ROOMS,
    FETCH_GROUP_CHAT_ROOMS,
} from "@/store/action-types/chat";
import apiService from "@/services/api";

const chatModule = {
    actions: {
        async [FETCH_GROUP_CHAT_ROOMS]() {
            try {
                const response = await apiService.get("/chats/rooms/group");
                return await response.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async [FETCH_DIRECT_CHAT_ROOMS](_) {
            try {
                const response = await apiService.get("/chats/rooms/direct");
                return await response.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async [FETCH_CHATS](_, { roomID, page, perPage }) {
            try {
                const route = `${apiService.baseURL()}/chats/${roomID}`;
                const url = new URL(route);
                const params = new URLSearchParams(url.search);
                params.set("page", page);
                params.set("per_page", perPage);
                const response = await apiService.get(
                    `/chats/${roomID}?${params}`
                );
                return await response.data;
            } catch (error) {
                return error.response.data;
            }
        },

        async [CREATE_CHAT](_, payload) {
            try {
                const response = await apiService.post("/chats", payload);
                return response.data;
            } catch (error) {
                return error.response.data;
            }
        },
    },
};

export default chatModule;
