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
import AccountInfo from './forms/AccountInfo';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../../../../components/Logo';
import { BaseButtonStyle } from '../../../../styles/base';
import PersonalInfo from './forms/PersonalInfo';
import AddressInfo from './forms/AddressInfo';
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
    return ['Account Info', 'Personal Info', 'Address Info'];
}

function getStepContent(stepIndex, form, setForm) {
    switch (stepIndex) {
        case 0:
            return <AccountInfo form={form} setForm={setForm} />;
        case 1:
            return <PersonalInfo />;
        case 2:
            return <AddressInfo />;
        default:
            return 'Unknown stepIndex';
    }
}

const defaultForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    birthday: '',
    phoneNumber: '',
    streetAddress: '',
    latitude: '',
    longitude: '',
};

function Body() {
    const classes = useStyles();
    const history = useHistory();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
    const baseButtonStyle = BaseButtonStyle();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [form, setForm] = useState(Object.assign({ ...defaultForm }));

    const handleNext = () => {
        if (activeStep === 2) return setIsDialogOpen(true);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleDialogState = (state) => {
        setIsDialogOpen(state);
    };

    const handleFormState = (property, value) => {
        setForm((oldValue) => ({
            ...oldValue,
            [property]: value,
        }));
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

                                {getStepContent(
                                    activeStep,
                                    form,
                                    handleFormState
                                )}

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
                setDialogState={handleDialogState}
                title="You’re all set up!"
                description="You can now use your account"
            />
        </Box>
    );
}

export default Body;
