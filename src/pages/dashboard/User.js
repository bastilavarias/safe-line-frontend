import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '../../parts/drawers/UserDashboard';

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
            <Drawer />
        </Box>
    );
}

export default User;
