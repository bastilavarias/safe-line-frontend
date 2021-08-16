import { makeStyles } from '@material-ui/core/styles';
import { Paper, Box, Typography } from '@material-ui/core';
import { MapRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    paper: {
        borderRadius: '.6rem',
    },

    iconHolder: {
        borderRadius: '.6rem',
        padding: '.5rem',
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        display: 'inline-block',
    },

    subtitle: {
        color: 'rgba(0, 0, 0, 0.5)',
    },
}));

function InformationBox() {
    const classes = useStyles();

    return (
        <Paper className={classes.paper} elevation={3}>
            <Box pt={3} pb={1} px={3}>
                <Box className={classes.iconHolder}>
                    <MapRounded fontSize="large" />
                </Box>
                <Box mt={2} mb={1}>
                    <Typography
                        variant="subtitle1"
                        className={classes.subtitle}
                    >
                        Clinics near your area
                    </Typography>
                </Box>
                <Box my={2}>
                    <Typography variant="h4">
                        <Box fontWeight="bold">12</Box>
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
}

export default InformationBox;
