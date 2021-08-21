import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    chip: {
        border: 'thin solid',
        borderRadius: '.6rem',
        textTransform: 'uppercase',
        backgroundColor: 'transparent',
    },

    high: {
        borderColor: '#E74C3C',
        color: '#E74C3C',
    },

    medium: {
        borderColor: '#F1C40F',
        color: '#F1C40F',
    },
});

function Priority({ text }) {
    const classes = useStyles();

    const theme = () => {
        let theme = 'high';
        if (text === 'MEDIUM') theme = 'medium';
        return `${classes.chip} ${classes[theme]}`;
    };

    return <Chip label={text} className={theme()} />;
}

export default Priority;
