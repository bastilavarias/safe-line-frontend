import { Box, Typography } from '@material-ui/core';
import PriorityChip from '../../../../../components/chips/Priority';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        '&:not(:last-child)': {
            marginBottom: '1rem',
        },
    },

    title: {
        textTransform: 'capitalize',
    },

    subtitle: {
        color: 'rgba(0, 0, 0, 0.5)',
    },
});

function ReminderItem({ name, priority, time }) {
    const classes = useStyles();

    const borderProperties = (_priority) => {
        const colors = [
            {
                priority: 'HIGH',
                hex: '#E74C3C',
            },

            {
                priority: 'MEDIUM',
                hex: '#F1C40F',
            },
        ];
        const selectedColor = colors.find(
            (color) => color.priority === _priority
        ).hex;
        return `thin solid ${selectedColor}`;
    };

    return (
        <Box
            className={classes.root}
            border={borderProperties(priority)}
            borderRadius=".6rem"
            p={2}
        >
            <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="h6" className={classes.title}>
                    {name}
                </Typography>
                <PriorityChip text={priority} />
            </Box>
            <Typography className={classes.subtitle} variant="subtitle2">
                {time} ● In 4 Hours
            </Typography>
        </Box>
    );
}

export default ReminderItem;
