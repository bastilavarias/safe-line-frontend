import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Grid, Typography, Button } from '@material-ui/core';
import {
    ScheduleRounded,
    PlaceRounded,
    ArrowDropDownRounded,
} from '@material-ui/icons';
import React, { useState } from 'react';
import ImageGirl1 from '../../../../assets/images/girl-1.jpg';
import InformationDialog from './InformationDialog';

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

    icon: {
        marginRight: '1rem',
    },

    availableText: {
        color: '#2ECC71',
    },

    button: {
        textTransform: 'capitalize',
    },
}));

function PreviewCard() {
    const classes = useStyles();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const setDialogState = (state) => {
        setIsDialogOpen(state);
    };

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
                        <Grid container>
                            <Grid item xs={5}>
                                <Box display="flex" alignItems="start">
                                    <ScheduleRounded
                                        color="primary"
                                        className={classes.icon}
                                    />
                                    <Box>
                                        <Typography
                                            className={classes.availableText}
                                            variant="subtitle1"
                                        >
                                            Open Now
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Closes at 5:00 PM
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={7}>
                                <Box display="flex" alignItems="start">
                                    <PlaceRounded
                                        color="primary"
                                        className={classes.icon}
                                    />
                                    <Box>
                                        <Typography variant="subtitle1">
                                            90, 1012 Quezon St, Tondo, Manila,
                                            1012 Metro Manila
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Button
                fullWidth
                color="primary"
                className={classes.button}
                onClick={() => setDialogState(true)}
            >
                <ArrowDropDownRounded fontSize="large" />
                <span>View More</span>
            </Button>
            <InformationDialog
                isOpen={isDialogOpen}
                setDialogState={setDialogState}
            />
        </Paper>
    );
}

export default PreviewCard;
