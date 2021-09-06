import { Button, Box, Typography } from '@material-ui/core';
import ServiceSlider from './ServiceSlider';
import DoctorSlider from './DoctorSlider';
import '../../../../../../../styles/custom.scss';

function InformationSection({ setVisible }) {
    return (
        <Box pb={4} component="section">
            <Box mb={5}>
                <Box mb={5}>
                    <Box mb={2}>
                        <Typography variant="subtitle1">
                            Services Offered
                        </Typography>
                    </Box>
                    <ServiceSlider />
                </Box>
                <Box mb={5}>
                    <Box mb={2}>
                        <Typography variant="subtitle1">Doctors</Typography>
                    </Box>
                    <DoctorSlider />
                </Box>
            </Box>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box />
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        className="c-button-base"
                        onClick={() => setVisible('appointment-form')}
                    >
                        Set Appointment
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default InformationSection;
