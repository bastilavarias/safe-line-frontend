import { useHistory } from 'react-router-dom';
import {
    Dialog,
    Slide,
    DialogTitle,
    DialogContent,
    Button,
    Box,
    Typography,
} from '@material-ui/core';
import { Close, Face, Favorite } from '@material-ui/icons';
import { forwardRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../Logo';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    logoBox: {
        width: '4rem',
        height: '4rem',
        borderRadius: '50%',
        backgroundColor: theme.palette.primary.main,
    },

    logo: {
        width: '2.5rem',
        height: 'auto',
        fill: '#fff',
    },

    selectionBox: {
        border: '.15rem solid rgba(77, 77, 77, 0.25)',
        borderRadius: '.6rem',
        cursor: 'pointer',
        width: '10rem',
        padding: '1.5rem 1rem',
        transition: 'all .3s ease-in-out',

        '&:hover': {
            boxShadow: '-1px 0px .2rem rgba(0,0,0,0.75);',
        },
    },

    activeSelectionBox: {
        borderColor: theme.palette.primary.main,
        boxShadow: '-1px 0px .5rem rgba(0,0,0,0.75);',
    },

    continueButton: {
        padding: '.5rem 0',
        borderRadius: '.6rem',
        textTransform: 'capitalize',
        maxWidth: '15rem',
        minWidth: '15rem',
    },
}));

function SelectionDialog({ isOpen, setDialogState }) {
    const classes = useStyles();
    const [type, setType] = useState('');
    const history = useHistory();

    const setSignUpType = (type) => {
        setType(type);
    };

    const handleContinue = () => {
        if (type === 'clinic') return history.push('/sign-up/clinic');
        history.push('/sign-up/user');
    };

    return (
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            onClose={() => setDialogState(false)}
            maxWidth="sm"
            fullWidth
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
            <DialogContent>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="35rem"
                    flexDirection="column"
                >
                    <Box
                        mb={2}
                        className={classes.logoBox}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Logo className={classes.logo} />
                    </Box>
                    <Box mb={1}>
                        <Typography variant="h4">
                            <Box fontWeight="fontWeightBold">
                                Sign Up to Safe Line
                            </Box>
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6">
                            Lorem ipsum dolor sit amet
                        </Typography>
                    </Box>
                    <Box mt={2} mb={4} display="flex" justifyContent="center">
                        <Box
                            className={`${classes.selectionBox} ${
                                type === 'user'
                                    ? classes.activeSelectionBox
                                    : null
                            }`}
                            padding={2}
                            color={
                                type === 'user'
                                    ? 'primary'
                                    : 'rgba(0, 0, 0, 0.6)'
                            }
                            borderColor={
                                type === 'user'
                                    ? 'primary'
                                    : 'rgba(77, 77, 77, 0.25)'
                            }
                            onClick={() => setSignUpType('user')}
                        >
                            <Box>
                                <Face />
                            </Box>
                            <Box my={1}>
                                <Typography variant="subtitle1">
                                    Patient
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body2">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit ut aliquam
                                </Typography>
                            </Box>
                        </Box>

                        <Box mx={1} />
                        <Box
                            className={`${classes.selectionBox} ${
                                type === 'clinic'
                                    ? classes.activeSelectionBox
                                    : null
                            }`}
                            padding={2}
                            color="rgba(0, 0, 0, 0.6)"
                            onClick={() => setSignUpType('clinic')}
                        >
                            <Box>
                                <Favorite />
                            </Box>
                            <Box my={1}>
                                <Typography variant="subtitle1">
                                    Clinic
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body2">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit ut aliquam
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.continueButton}
                        disableElevation
                        disabled={!type}
                        onClick={handleContinue}
                    >
                        Continue
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default SelectionDialog;
