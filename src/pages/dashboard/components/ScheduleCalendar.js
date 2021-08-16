import { useState } from 'react';
import { Paper, Box } from '@material-ui/core';
import { useStaticState, Calendar } from '@material-ui/pickers';

function ScheduleCalendar() {
    const [value, handleDateChange] = useState(new Date());

    const { pickerProps } = useStaticState({
        value,
        onChange: handleDateChange,
    });

    return (
        <Paper style={{ overflow: 'hidden' }}>
            <Box px={1}>
                <Calendar {...pickerProps} />
            </Box>
        </Paper>
    );
}

export default ScheduleCalendar;
