import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    InputBase,
    Divider,
    IconButton,
    FormControl,
} from '@material-ui/core';
import { SearchRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '.5rem .5rem',
        display: 'flex',
        alignItems: 'center',
        width: '40rem',
        position: 'absolute',
        top: '5%',
        left: '50%',
        transform: 'translate(-50%, -5%)',
        zIndex: '999',
        borderRadius: '.6rem',
    },

    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },

    iconButton: {
        padding: '1rem',
    },

    divider: {
        height: 28,
        margin: 4,
    },
}));

function SearchTextField() {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Current location"
                inputProps={{ 'aria-label': 'Search Address' }}
                color="primary"
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton className={classes.iconButton} aria-label="search">
                <SearchRounded color="primary" />
            </IconButton>
        </Paper>
    );
}

export default SearchTextField;
