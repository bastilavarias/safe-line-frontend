import { Drawer, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../../components/Logo';
import { NavLink } from 'react-router-dom';
import { HomeRounded, MessageRounded, MapRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '6rem',
        backgroundColor: theme.palette.primary.main,
    },

    drawerContainer: {
        width: '100%',
        height: '100%',
    },

    logoBox: {
        width: '3.5rem',
        height: '3.5rem',
        backgroundColor: theme.palette.primary.light,
        cursor: 'pointer',
        '& .logoBox__logo': {
            width: '2rem',
            height: 'auto',
            fill: theme.palette.primary.main,
        },
    },

    button: {
        backgroundColor: 'transparent',
        color: '#DCDAFB',
        borderRadius: '.6rem',
        padding: '1rem',
        '&.active': {
            background: 'white',
            color: theme.palette.primary.main,
        },
    },
}));

function UserDashboard() {
    const classes = useStyles();

    return (
        <Drawer classes={{ paper: classes.paper }} variant="permanent">
            <Box
                className={classes.drawerContainer}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
                position="relative"
            >
                <Box
                    className={classes.logoBox}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="50%"
                    position="absolute"
                    top="3%"
                >
                    <Logo className="logoBox__logo" />
                </Box>
                <Box />
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    alignItems="center"
                    height="15rem"
                    width="100%"
                >
                    <Button
                        className={classes.button}
                        component={NavLink}
                        to="/user-dashboard"
                    >
                        <HomeRounded fontSize="large" />
                    </Button>
                    <Button
                        className={classes.button}
                        component={NavLink}
                        to="/dashboard"
                    >
                        <MessageRounded fontSize="large" />
                    </Button>
                    <Button
                        className={classes.button}
                        component={NavLink}
                        to="/messages"
                    >
                        <MapRounded fontSize="large" />
                    </Button>
                </Box>
                <Box />
            </Box>
        </Drawer>
    );
}

export default UserDashboard;
