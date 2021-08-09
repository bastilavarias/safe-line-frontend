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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SearchRounded, NotificationsRounded, Mail } from '@material-ui/icons';
import { useState } from 'react';

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
}));

function UserDashboard() {
    const classes = useStyles();
    const [hasNewNotification, setHasNewNotification] = useState(false);

    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar className={classes.toolbar}>
                <Container>
                    <Grid container>
                        <Grid item xs={12} md={10}>
                            <Box
                                display="flex"
                                height="100%"
                                justifyContent="space-between"
                                alignItems="start"
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
                        <Grid item xs={12} md={2}>
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
                                        <Mail />
                                    </Badge>
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default UserDashboard;
