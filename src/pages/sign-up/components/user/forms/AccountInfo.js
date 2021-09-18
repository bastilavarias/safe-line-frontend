import { Typography, Box, Grid, TextField } from '@material-ui/core';
import PasswordField from '../../../../../components/base/PasswordField';

function AccountInfo() {
    return (
        <Box py={3}>
            <Box mb={4}>
                <Typography variant="h4">
                    <Box fontWeight="bold">Account Information</Box>
                </Typography>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField label="Last Name" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Email" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12}>
                    {/*<TextField*/}
                    {/*    label="Password"*/}
                    {/*    variant="outlined"*/}
                    {/*    fullWidth*/}
                    {/*    type="password"*/}
                    {/*/>*/}
                    <PasswordField />
                </Grid>
            </Grid>
        </Box>
    );
}

export default AccountInfo;
