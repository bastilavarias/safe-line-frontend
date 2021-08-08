import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Typography,
    Box,
    Grid,
    Stepper,
    Step,
    StepLabel,
    Button,
} from '@material-ui/core';
import Details from './forms/Details';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../../../../components/Logo';
import { BaseButtonStyle } from '../../../../styles/base';
import Services from './forms/Services';
import FinishDialog from '../FinishDialog';

const useStyles = makeStyles((theme) => ({
    leftSide: {
        backgroundColor: theme.palette.primary.main,
        '& div': {
            color: 'white',
            maxWidth: '60%',
            margin: '0 auto',
            textAlign: 'left',
            '& h4': {
                fontWeight: 'bold',
                marginBottom: '1rem',
            },
        },
    },

    logoBox: {
        width: '3.5rem',
        height: '3.5rem',
        borderRadius: '50%',
        backgroundColor: theme.palette.primary.light,
        cursor: 'pointer',
        '& .logoBox__logo': {
            width: '2rem',
            height: 'auto',
            fill: theme.palette.primary.main,
        },
    },
}));

function getSteps() {
    return ['Clinic Details', 'Services'];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return <Details />;
        case 1:
            return <Services />;
        default:
            return 'Unknown stepIndex';
    }
}

function Body() {
    const classes = useStyles();
    const history = useHistory();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
    const baseButtonStyle = BaseButtonStyle();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleNext = () => {
        if (activeStep === 2) return setIsDialogOpen(true);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const setDialogState = (state) => {
        setIsDialogOpen(state);
    };

    return (
        <Box component="section">
            <Grid container>
                <Grid item xs={12} md={3}>
                    <Box
                        height="100vh"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        position="relative"
                        className={classes.leftSide}
                    >
                        <Box>
                            <Typography variant="h4">Safe Line</Typography>
                            <Typography variant="subtitle1">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Ut nascetur sit amet, faucibus
                                velit, dolor ut. Volutpat ornare at tristique
                                nisi sit quis fermentum.
                            </Typography>
                        </Box>
                        <Box
                            className={classes.logoBox}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            position="absolute"
                            top="3%"
                            left="5%"
                            onClick={() => history.push('/')}
                        >
                            <Logo className="logoBox__logo" />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Box height="100vh" position="relative">
                        <Box
                            height="100%"
                            width="100%"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Box width="50%">
                                <Stepper
                                    activeStep={activeStep}
                                    alternativeLabel
                                >
                                    {steps.map((label) => (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>

                                {getStepContent(activeStep)}

                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                >
                                    {activeStep === 0 ? (
                                        <Box />
                                    ) : (
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            className={baseButtonStyle.base}
                                            onClick={handleBack}
                                        >
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={baseButtonStyle.base}
                                    >
                                        {activeStep === steps.length - 1
                                            ? 'Finish'
                                            : 'Next'}
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <FinishDialog
                isOpen={isDialogOpen}
                setDialogState={setDialogState}
            />
        </Box>
    );
}

export default Body;
