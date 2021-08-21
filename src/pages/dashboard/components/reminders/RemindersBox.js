import { Paper, Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReminderItem from './ReminderItem';

const useStyles = makeStyles((theme) => ({
    paper: {
        borderRadius: '.6rem',
        overflow: 'hidden',
    },
}));

const reminders = [
    {
        name: 'Video Consultation',
        priority: 'HIGH',
        time: '12:30 PM',
    },

    {
        name: 'Lab Results',
        priority: 'MEDIUM',
        time: '12:30 PM',
    },
];

function RemindersBox() {
    const classes = useStyles();

    return (
        <Paper className={classes.paper} elevation={3}>
            <Box px={2} py={2}>
                <Box mb={1}>
                    <Typography variant="h6">Reminders</Typography>
                </Box>
                <Box>
                    {reminders.map((reminder, index) => (
                        <ReminderItem {...reminder} key={index} />
                    ))}
                </Box>
            </Box>
        </Paper>
    );
}

export default RemindersBox;
