import { Typography, Box, Grid } from '@material-ui/core';
import GooglePlacesAutocomplete from '../../../../../components/base/GooglePlacesAutocomplete';

function AddressInfo() {
    return (
        <Box py={3}>
            <Box mb={4}>
                <Typography variant="h4">
                    <Box fontWeight="bold">Address Information</Box>
                </Typography>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <GooglePlacesAutocomplete />
                </Grid>
            </Grid>
        </Box>
    );
}

export default AddressInfo;
