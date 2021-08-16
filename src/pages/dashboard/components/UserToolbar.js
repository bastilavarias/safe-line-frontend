import { Fragment, useRef, useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Grid,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@material-ui/core';
import { NotificationsOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    userMenuAvatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        marginRight: '1rem',
    },
}));

function UserToolbar() {
    const classes = useStyles();
    const userMenuRef = useRef(null);
    const [userMenuHeight, setUserMenuHeight] = useState(0);

    useEffect(() => {
        const height = userMenuRef.current.offsetHeight;
        setUserMenuHeight(height);
    }, [userMenuRef]);

    return (
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
                                className={classes.userMenuAvatar}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Fragment>
                                    <Typography
                                        component="span"
                                        variant="subtitle1"
                                    >
                                        <Box fontWeight="bold">John Doe</Box>
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
    );
}

export default UserToolbar;
