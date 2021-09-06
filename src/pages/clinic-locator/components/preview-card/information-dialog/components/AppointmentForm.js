import { Box, Button } from '@material-ui/core';

function AppointmentForm({ setVisible }) {
    return (
        <Box>
            <Button onClick={() => setVisible('information-section')}>
                Back
            </Button>
        </Box>
    );
}

export default AppointmentForm;
