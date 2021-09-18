import moment from 'moment';

const dateUtility = {
    formatBasic: (date) => {
        return moment(new Date(date)).format('YYYY-MM-DD');
    },
};

export default dateUtility;
