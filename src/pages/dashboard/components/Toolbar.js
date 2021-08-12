import { Box, TextField, Typography, InputAdornment } from '@material-ui/core';
import { SearchRounded } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    searchInput: {
        backgroundColor: 'white',
    },
}));

function Toolbar() {
    const classes = useStyles();

    return (
        <Box display="flex" justifyContent="space-between" alignItems="start">
            <Box>
                <Typography variant="h5">
                    <Box fontWeight="bold">Welcome John Doe!</Box>
                </Typography>
                <Typography variant="subtitle1">
                    <Box fontWeight="">How are you feeling?</Box>
                </Typography>
            </Box>
            <TextField
                placeholder="Search"
                variant="outlined"
                margin="dense"
                className={classes.searchInput}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchRounded />
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
}

export default Toolbar;
