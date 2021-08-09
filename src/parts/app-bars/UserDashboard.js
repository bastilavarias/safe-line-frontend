import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Container,
    Grid,
    TextField,
    InputAdornment,
    Badge,
    IconButton,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SearchRounded, NotificationsRounded } from '@material-ui/icons';
import { useState, Fragment } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#F5F5F5',
        boxShadow: 'none',
    },

    toolbar: {
        minHeight: 128,
        alignItems: 'flex-start',
        padding: '2rem 0',
    },

    searchInput: {
        backgroundColor: 'white',
        borderRadius: '.6rem !important',
    },

    largeUserAvatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

function UserDashboard() {
    const classes = useStyles();
    const [hasNewNotification, setHasNewNotification] = useState(false);

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar className={classes.toolbar}>
                <Container>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={9}>
                            <Box
                                display="flex"
                                height="100%"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Box>
                                    <Typography
                                        style={{ color: 'black' }}
                                        variant="h5"
                                    >
                                        <Box fontWeight="bold">
                                            Welcome Random User!
                                        </Box>
                                    </Typography>
                                    <Typography
                                        style={{ color: 'rgba(0, 0, 0, 0.7)' }}
                                        variant="subtitle1"
                                    >
                                        How are you feeling?
                                    </Typography>
                                </Box>
                                <TextField
                                    className={classes.searchInput}
                                    margin="dense"
                                    variant="outlined"
                                    placeholder="Search"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchRounded />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Box
                                display="flex"
                                height="100%"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <IconButton>
                                    <Badge
                                        color="primary"
                                        variant="dot"
                                        invisible={hasNewNotification}
                                    >
                                        <NotificationsRounded />
                                    </Badge>
                                </IconButton>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar
                                            alt="Remy Sharp"
                                            src="https://randomuser.me/api/portraits/men/18.jpg"
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Fragment>
                                                <Typography
                                                    variant="h6"
                                                    style={{
                                                        color: 'rgba(0, 0, 0, 1)',
                                                        fontWeight: 'bolder',
                                                    }}
                                                >
                                                    Lorem Ipsum
                                                </Typography>
                                            </Fragment>
                                        }
                                        secondary={
                                            <Fragment>
                                                <Typography
                                                    variant="body2"
                                                    color="rgba(0, 0, 0, 0.8)"
                                                >
                                                    loremipsum@gmail.com
                                                </Typography>
                                            </Fragment>
                                        }
                                    />
                                </ListItem>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default UserDashboard;
