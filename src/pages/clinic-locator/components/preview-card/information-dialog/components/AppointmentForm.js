import { Box, Button, Grid, Typography, TextField } from '@material-ui/core';
import { AttachFileRounded } from '@material-ui/icons';
import '../../../../../../styles/custom.scss';

function AppointmentForm({ setVisible }) {
    return (
        <Box pb={4} component="section">
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        <Box fontWeight="bold">Appointment Request</Box>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box mb={2}>
                        <Typography variant="subtitle1">
                            <Box fontWeight="bold">Concern Description</Box>
                        </Typography>
                    </Box>
                    <TextField
                        placeholder="What’s your health concern?"
                        multiline
                        rows={8}
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        color="primary"
                        className="c-button-base"
                        startIcon={<AttachFileRounded />}
                    >
                        Attach File
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                    >
                        <Button
                            color="primary"
                            onClick={() => setVisible('information-section')}
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className="c-button-base"
                        >
                            Finish
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AppointmentForm;
