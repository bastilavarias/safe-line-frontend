import {
    AppBar,
    Typography,
    Toolbar as MUIToolbar,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Box,
} from '@material-ui/core';
import './toolbar.scss';
import { Fragment } from 'react';

function Toolbar() {
    return (
        <AppBar className="app-bar" position="static" elevation={0}>
            <MUIToolbar>
                <ListItem alignItems="center">
                    <ListItemAvatar className="app-bar__avatar">
                        <Avatar
                            src="https://qualimed.com.ph/wp-content/uploads/2015/01/QualiMed-Clinic-Makati-Reception1.jpg"
                            alt="Avatar"
                            className="app-bar__avatar-image"
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Fragment>
                                <Typography variant="h6" color="textPrimary">
                                    <Box fontWeight="fontWeightBold">
                                        JRG Dentists
                                    </Box>
                                </Typography>
                            </Fragment>
                        }
                    />
                </ListItem>
            </MUIToolbar>
        </AppBar>
    );
}

export default Toolbar;
