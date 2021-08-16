import { Fragment, useRef, useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Container,
    Grid,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@material-ui/core';
import { NotificationsOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '../../parts/drawers/UserDashboard';
import Toolbar from './components/Toolbar';
import Table from './components/Table';
import InformationBox from './components/InformationBox';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#F5F5F5',
        minHeight: '100vh',
        display: 'flex',
    },

    userMenuAvatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        marginRight: '1rem',
    },
}));

function User() {
    const classes = useStyles();
    const userMenuRef = useRef(null);
    const [userMenuHeight, setUserMenuHeight] = useState(0);

    useEffect(() => {
        const height = userMenuRef.current.offsetHeight;
        setUserMenuHeight(height);
    }, [userMenuRef]);

    return (
        <Box component="section" className={classes.root}>
            <Drawer />
            <Box component="main" width="100%" pt={5}>
                <Container maxWidth="xl">
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={7} lg={8} xl={9}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Toolbar />
                                </Grid>
                                <Grid item xs={12}>
                                    <Table />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Grid container spacing={4}>
                                            {[1, 2, 3, 4].map((n) => (
                                                <Grid
                                                    key={n}
                                                    item
                                                    xs={12}
                                                    md={3}
                                                >
                                                    <InformationBox />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={5} lg={4} xl={3}>
                            <Grid container>
                                <Grid item xs={3} md={2}>
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        height={userMenuHeight || 77}
                                    >
                                        <Box>
                                            <NotificationsOutlined fontSize="medium" />
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={9} md={10}>
                                    <Box ref={userMenuRef}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src="https://randomuser.me/api/portraits/men/22.jpg"
                                                    className={
                                                        classes.userMenuAvatar
                                                    }
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="subtitle1"
                                                        >
                                                            <Box fontWeight="bold">
                                                                John Doe
                                                            </Box>
                                                        </Typography>
                                                    </Fragment>
                                                }
                                                secondary={
                                                    <Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="subtitle2"
                                                        >
                                                            johndoe@gmail.com
                                                        </Typography>
                                                    </Fragment>
                                                }
                                            />
                                        </ListItem>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export default User;
