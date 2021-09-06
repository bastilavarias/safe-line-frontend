import { useState } from 'react';
import {
    Dialog,
    Slide,
    DialogTitle,
    DialogContent,
    Button,
    Box,
    Grid,
    Typography,
} from '@material-ui/core';
import { Close, PlaceRounded, ScheduleRounded } from '@material-ui/icons';
import { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../../../../../styles/custom.scss';
import InformationSection from './components/information-section/InformationSection';
import App from '../../../../../App';
import AppointmentForm from './components/AppointmentForm';
import ImageGirl1 from '../../../../../assets/images/girl-1.jpg';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
        height: 'max-content',
    },

    backdrop: {
        position: 'absolute',
    },

    paperScrollPaper: {
        overflow: 'visible',
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

function InformationDialog({ isOpen, setDialogState }) {
    const classes = useStyles();
    const [visible, setVisible] = useState('information-section');

    const onSetVisible = (name) => {
        setVisible(name);
    };

    return (
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            onClose={() => setDialogState(false)}
            maxWidth="sm"
            fullWidth
            disableAutoFocus
            disableEnforceFocus
            disableScrollLock
            disablePortal
            classes={{
                paperScrollPaper: classes.paperScrollPaper,
            }}
            BackdropProps={{
                classes: { root: classes.backdrop },
            }}
            style={{ position: 'absolute' }}
        >
            <DialogTitle>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box />
                    <Box>
                        <Button onClick={() => setDialogState(false)}>
                            <Close />
                        </Button>
                    </Box>
                </Box>
            </DialogTitle>
            <DialogContent style={{ overflow: 'hidden' }}>
                <Box mb={5}>
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
                                <Typography variant="h5">
                                    <Box fontWeight="bold">
                                        JRG DENTAL CLINIC
                                    </Box>
                                </Typography>
                                <Typography
                                    variant="subtitle2"
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
                                                className={
                                                    classes.availableText
                                                }
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
                                                90, 1012 Quezon St, Tondo,
                                                Manila, 1012 Metro Manila
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                {visible === 'information-section' ? (
                    <InformationSection setVisible={onSetVisible} />
                ) : null}
                {visible === 'appointment-form' ? (
                    <AppointmentForm setVisible={onSetVisible} />
                ) : null}
            </DialogContent>
        </Dialog>
    );
}

export default InformationDialog;
