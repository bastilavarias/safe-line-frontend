import api from '../api';

const url = 'https://psgc.gitlab.io/api';

const psgcService = {
    async getRegions() {
        const result = await api.get(`${url}/regions`);
        return result.data;
    },

    async getCities(code) {
        const result = await api.get(
            `${url}/regions/${code}/cities-municipalities`
        );
        return result.data;
    },
};

export default psgcService;
