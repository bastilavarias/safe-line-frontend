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
import AccountInfo from './components/user/forms/AccountInfo';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../../components/Logo';

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
    return ['Account Info', 'Personal Info', 'Address Info'];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return <AccountInfo />;
        case 1:
            return 'What is an ad group anyways?';
        case 2:
            return 'This is the bit I really care about!';
        default:
            return 'Unknown stepIndex';
    }
}

function SignUp() {
    const classes = useStyles();
    const history = useHistory();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
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
                                    className={classes.stepper}
                                >
                                    {steps.map((label) => (
                                        <Step
                                            key={label}
                                            className={classes.step}
                                        >
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                                <Typography variant="h4">
                                    <Box fontWeight="bold">
                                        Account Information
                                    </Box>
                                </Typography>
                                {getStepContent(activeStep)}
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default SignUp;
