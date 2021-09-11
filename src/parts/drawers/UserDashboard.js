import { Drawer, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../../components/Logo';
import { NavLink, useRouteMatch } from 'react-router-dom';
import {
    HomeRounded,
    MessageRounded,
    MapRounded,
    ExitToAppRounded,
} from '@material-ui/icons';

const drawerWidth = '6rem';
const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
    },

    drawerPaper: {
        width: drawerWidth,
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

    navButton: {
        backgroundColor: 'transparent',
        color: '#DCDAFB',
        borderRadius: '.6rem',
        padding: '1rem',
        '&.active': {
            background: 'white',
            color: theme.palette.primary.main,
        },
    },

    exitButton: {
        color: 'white',
        padding: '1rem',
        borderRadius: '.6rem',
    },
}));

function UserDashboard() {
    const classes = useStyles();
    let { url } = useRouteMatch();

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            className={classes.drawer}
            classes={{ paper: classes.drawerPaper }}
        >
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
                        className={classes.navButton}
                        component={NavLink}
                        to={url}
                        exact
                    >
                        <HomeRounded fontSize="large" />
                    </Button>
                    <Button
                        className={classes.navButton}
                        component={NavLink}
                        to={`${url}/chat`}
                    >
                        <MessageRounded fontSize="large" />
                    </Button>
                    <Button
                        className={classes.navButton}
                        component={NavLink}
                        to={`${url}/clinic-locator`}
                    >
                        <MapRounded fontSize="large" />
                    </Button>
                </Box>
                <Box />
            </Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderRadius="50%"
                position="absolute"
                bottom="3%"
                width="100%"
            >
                <Button
                    className={classes.exitButton}
                    component={NavLink}
                    exact={true}
                    to="/"
                >
                    <ExitToAppRounded fontSize="large" />
                </Button>
            </Box>
        </Drawer>
    );
}

export default UserDashboard;
