import {
    Dialog,
    Slide,
    DialogTitle,
    DialogContent,
    Button,
    Box,
    Typography,
    Grid,
} from '@material-ui/core';
import { Close, PlaceRounded, ScheduleRounded } from '@material-ui/icons';
import { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageGirl1 from '../../../../assets/images/girl-1.jpg';
import './information-dialog.scss';
import {
    CarouselProvider,
    Slider,
    Slide as PRCSlide,
    ButtonBack,
    ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

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

const services = [
    'Oral Prophylaxis',
    'Restoration',
    'Extraction',
    'Dentures',
    'Crowns',
];

const sliderSettings = {
    arrows: true,
    dots: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    className: 'slides',
};

function InformationDialog({ isOpen, setDialogState }) {
    const classes = useStyles();

    return (
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            onClose={() => setDialogState(false)}
            maxWidth="sm"
            fullWidth
            disableAutoFocus //disables rescrolling the window when the dialog is opened
            disableEnforceFocus //allows user to interact outside the dialog
            disableScrollLock //prevents the div from shrinking to make room for a scrollbar
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
                <Box pb={4}>
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
                                    <Typography variant="h6">
                                        <Box fontWeight="bold">
                                            JRG DENTAL CLINIC
                                        </Box>
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
                    <Box>
                        <Box mb={3}>
                            <Typography variant="subtitle2">
                                Services Offered
                            </Typography>
                        </Box>
                        <CarouselProvider
                            naturalSlideWidth={100}
                            naturalSlideHeight={50}
                            visibleSlides={3}
                            totalSlides={services.length}
                            dragEnabled={false}
                            step={3}
                        >
                            <Slider>
                                {services.map((service, index) => (
                                    <PRCSlide index={index}>
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                            alignItems="center"
                                        >
                                            <Box
                                                width="3rem"
                                                height="3rem"
                                                borderRadius="50%"
                                                bgcolor="primary.main"
                                                mb={1}
                                            />
                                            <Typography variant="caption">
                                                {service}
                                            </Typography>
                                        </Box>
                                    </PRCSlide>
                                ))}
                            </Slider>
                            <ButtonBack>Back</ButtonBack>
                            <ButtonNext>Next</ButtonNext>
                        </CarouselProvider>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default InformationDialog;
