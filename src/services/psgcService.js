import api from '../api';

const url = 'https://psgc.gitlab.io/api';

const psgcService = {
    async getRegions() {
        try {
            const result = await api.get(`${url}/regions`);
            return result.data;
        } catch (e) {
            return [];
        }
    },

    async getCities(code) {
        try {
            const result = await api.get(
                `${url}/regions/${code}/cities-municipalities`
            );
            return result.data;
        } catch (e) {}
    },
};

export default psgcService;
