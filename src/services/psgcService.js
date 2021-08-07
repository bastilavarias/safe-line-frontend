import api from '../api';

const url = 'https://psgc.gitlab.io/api';

const psgcService = {
    async getRegions() {
        const result = await api.get(`${url}/regions`);
        return result.data;
    },
};

export default psgcService;
