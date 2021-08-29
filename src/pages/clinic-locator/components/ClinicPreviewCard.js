import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Grid, Typography } from '@material-ui/core';
import React from 'react';
import ImageGirl1 from '../../../assets/images/girl-1.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '40rem',
        position: 'absolute',
        bottom: '5%',
        left: '50%',
        transform: 'translate(-50%, -5%)',
        zIndex: '999',
        borderRadius: '.6rem',
    },

    image: {
        width: '7rem',
        height: '7rem',
        borderRadius: '50%',
        objectFit: 'cover',
    },

    clinicTypeText: {
        color: 'rgba(0, 0, 0, 0.55)',
    },
}));

function ClinicPreviewCard() {
    const classes = useStyles();

    return (
        <Paper className={classes.root} component={Box} elevation={3}>
            <Box p={4}>
                <Grid container spacing={4}>
                    <Grid item xs={3}>
                        <img
                            alt="Clinic Image"
                            src={ImageGirl1}
                            className={classes.image}
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <Box mb={3}>
                            <Typography variant="h6">
                                <Box fontWeight="bold">JRG DENTAL CLINIC</Box>
                            </Typography>
                            <Typography
                                variant="caption"
                                className={classes.clinicTypeText}
                            >
                                Dental Clinic
                            </Typography>
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Box>1</Box>
                            <Box>2</Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}

export default ClinicPreviewCard;
