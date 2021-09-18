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
    const steps = ['Account Info', 'Personal Info', 'Address Info'];
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

    function showStepContent() {
        switch (activeStep) {
            case 0:
                return <AccountInfo form={form} setForm={handleFormState} />;
            case 1:
                return <PersonalInfo form={form} setForm={handleFormState} />;
            case 2:
                return <AddressInfo form={form} setForm={handleFormState} />;
            default:
                return 'Unknown stepIndex';
        }
    }

    const showStepButton = () => {
        const { firstName, lastName, email, password } = form;
        const isButton1Valid = firstName && lastName && email && password;
        switch (activeStep) {
            case 0:
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={baseButtonStyle.base}
                        disabled={!isButton1Valid}
                    >
                        Next
                    </Button>
                );
            case 1:
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={baseButtonStyle.base}
                    >
                        Next
                    </Button>
                );
            case 2:
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        className={baseButtonStyle.base}
                    >
                        Finish
                    </Button>
                );
            default:
                return 'Unknown stepIndex';
        }
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

                                {showStepContent()}

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

                                    {showStepButton()}
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
