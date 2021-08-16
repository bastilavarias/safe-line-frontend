import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    chip: {
        borderRadius: '.6rem',
    },

    success: {
        backgroundColor: 'rgba(46, 204, 113, 0.25)',
        color: '#2ECC71',
    },

    warning: {
        backgroundColor: 'rgba(241, 196, 15, 0.25)',
        color: '#F1C40F',
    },
});

function ConsultationStatusChip({ text }) {
    const classes = useStyles();

    const theme = () => {
        let theme = 'success';
        if (text === 'Resched') theme = 'warning';
        return `${classes.chip} ${classes[theme]}`;
    };

    return <Chip label={text} className={theme()} />;
}

export default ConsultationStatusChip;
