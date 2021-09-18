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
import dateUtility from '../../../../../utilities/date';

const genders = ['Male', 'Female'];

function PersonalInfo({ form, setForm }) {
    const handleDateChange = (date) => {
        setForm('birthday', dateUtility.formatBasic(date._d));
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
                            value={form.gender}
                            onChange={(e) => setForm('gender', e.target.value)}
                            label="Gender"
                        >
                            {genders.map((item, index) => (
                                <MenuItem value={item} key={index}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <KeyboardDatePicker
                            inputVariant="outlined"
                            margin="normal"
                            label="Birthday"
                            value={form.birthday}
                            format="MMMM Do YYYY"
                            onChange={(date) =>
                                setForm(
                                    'birthday',
                                    dateUtility.formatBasic(date._d)
                                )
                            }
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Phone Number"
                        variant="outlined"
                        fullWidth
                        type="tel"
                        value={form.phoneNumber}
                        onChange={(e) => setForm('phoneNumber', e.target.value)}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default PersonalInfo;
