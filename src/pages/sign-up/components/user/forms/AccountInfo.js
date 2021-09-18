import { Typography, Box, Grid, TextField } from '@material-ui/core';
import PasswordField from '../../../../../components/base/PasswordField';

function AccountInfo({ form, setForm }) {
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
                        onChange={(e) => setForm('firstName', e.target.value)}
                        value={form.firstName}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setForm('lastName', e.target.value)}
                        value={form.lastName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => setForm('email', e.target.value)}
                        value={form.email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <PasswordField
                        label="Password"
                        onChange={(e) => setForm('password', e.target.value)}
                        value={form.password}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default AccountInfo;
