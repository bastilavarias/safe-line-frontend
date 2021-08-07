import {
    Typography,
    Box,
    Grid,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useState } from 'react';

const genders = ['Male', 'Female'];

function PersonalInfo() {
    const [gender, setGender] = useState('');
    const [selectedDate, setSelectedDate] = useState(
        new Date('2021-08-07T21:11:54')
    );

    const handleChange = (event) => {
        setGender(event.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <Box py={3}>
            <Box mb={4}>
                <Typography variant="h4">
                    <Box fontWeight="bold">Additional Information</Box>
                </Typography>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="genders-select">Gender</InputLabel>
                        <Select
                            labelId="genders-select"
                            value={gender}
                            onChange={handleChange}
                            label="Gender"
                        >
                            {genders.map((item) => (
                                <MenuItem value={item}>{item}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <KeyboardDatePicker
                            inputVariant="outlined"
                            format="MM/DD/YYYY"
                            margin="normal"
                            label="Birthday"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Confirm Password"
                        variant="outlined"
                        fullWidth
                        type="password"
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default PersonalInfo;
