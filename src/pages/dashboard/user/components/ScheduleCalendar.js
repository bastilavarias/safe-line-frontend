import { useState } from 'react';
import { Paper, Box } from '@material-ui/core';
import { useStaticState, Calendar } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        borderRadius: '.6rem',
        overflow: 'hidden',
    },
}));

function ScheduleCalendar() {
    const classes = useStyles();
    const [value, handleDateChange] = useState(new Date());

    const { pickerProps } = useStaticState({
        value,
        onChange: handleDateChange,
    });

    return (
        <Paper className={classes.paper} elevation={3}>
            <Box px={1}>
                <Calendar {...pickerProps} />
            </Box>
        </Paper>
    );
}

export default ScheduleCalendar;
