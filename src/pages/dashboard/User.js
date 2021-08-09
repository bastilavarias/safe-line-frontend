import { Box } from '@material-ui/core';
import UserDashboardAppBar from '../../parts/app-bars/UserDashboard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#F5F5F5',
        minHeight: '100vh',
    },
}));

function User() {
    const classes = useStyles();

    return (
        <Box component="section" className={classes.root}>
            <UserDashboardAppBar />
        </Box>
    );
}

export default User;
