import {
    Typography,
    Box,
    Grid,
    TextField,
    FormControl,
} from '@material-ui/core';
import { KeyboardTimePicker } from '@material-ui/pickers';

function Details() {
    return (
        <Box py={3}>
            <Box mb={4}>
                <Typography variant="h4">
                    <Box fontWeight="bold">Clinic Details</Box>
                </Typography>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <TextField
                        label="Clinic Name"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Clinic Address"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">
                                <Box fontWeight="bold">Operating Hours</Box>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <KeyboardTimePicker
                                    inputVariant="outlined"
                                    margin="normal"
                                    label="Opening"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <KeyboardTimePicker
                                    inputVariant="outlined"
                                    margin="normal"
                                    label="Closing"
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Details;
