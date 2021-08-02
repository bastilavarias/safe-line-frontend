import {
    Dialog,
    Slide,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Box,
    Typography,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Logo from './Logo';

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
        borderColor: 'rgba(77, 77, 77, 0.25)',
        border: 'thin solid',
        borderRadius: '.5rem',
        width: '12rem',
        height: '10rem',
    },

    continueButton: {
        padding: '.5rem 0',
        borderRadius: '.5rem',
        textTransform: 'capitalize',
        maxWidth: '15rem',
        minWidth: '15rem',
    },
}));

function SignUpCollection({ isOpen, setDialogState }) {
    const classes = useStyles();

    return (
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            onClose={() => setDialogState(false)}
            maxWidth="lg"
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
                    minWidth="40rem"
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
                    <Box my={5} display="flex" justifyContent="center">
                        <Box className={classes.selectionBox}></Box>
                        <Box mx={1} />
                        <Box className={classes.selectionBox}></Box>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.continueButton}
                    >
                        Continue
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default SignUpCollection;
