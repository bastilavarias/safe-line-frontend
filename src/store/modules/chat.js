import {
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

        async [FETCH_CHATS](_, { roomID }) {
            try {
                const response = await apiService.get(`/chats/${roomID}`);
                return await response.data;
            } catch (error) {
                return error.response.data;
            }
        },
    },
};

export default chatModule;
