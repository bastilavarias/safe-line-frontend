import {
    Dialog,
    Slide,
    DialogTitle,
    DialogContent,
    Button,
    Box,
    Typography,
} from '@material-ui/core';
import { DoneAllRounded, Close } from '@material-ui/icons';
import { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    finishButton: {
        padding: '.5rem 0',
        borderRadius: '.6rem',
        textTransform: 'capitalize',
        maxWidth: '20rem',
        minWidth: '20rem',
    },

    mainSparkle: {
        backgroundColor: '#C7F0F4',
        width: '10rem',
        height: '10rem',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& .mainSparkle__icon': {
            color: theme.palette.primary.main,
            fontSize: '6rem',
        },
        '& .mainSparkle__child1': {
            backgroundColor: 'rgba(231, 76, 60, 0.8)',
            width: '2.2rem',
            height: '2.2rem',
            borderRadius: '50%',
            position: 'absolute',
            left: '-50%',
            bottom: '0',
            transform: 'translate(50%, 0)',
        },
        '& .mainSparkle__child2': {
            backgroundColor: 'rgba(241, 196, 15, 0.8)',
            width: '2.2rem',
            height: '2.2rem',
            borderRadius: '50%',
            position: 'absolute',
            left: '-20%',
            top: '-30%',
            transform: 'translate(20%, 30%)',
        },
        '& .mainSparkle__child3': {
            backgroundColor: 'rgba(26, 188, 156, 0.8)',
            width: '2.2rem',
            height: '2.2rem',
            borderRadius: '50%',
            position: 'absolute',
            right: '-30%',
            top: '40%',
            transform: 'translate(30%, -40%)',
        },
    },
}));

function FinishDialog({ isOpen, setDialogState }) {
    const classes = useStyles();

    return (
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            onClose={() => setDialogState(false)}
            fullWidth
            maxWidth="sm"
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
                        mb={5}
                        p={2}
                        position="relative"
                        className={classes.mainSparkle}
                    >
                        <Box className="mainSparkle__child1" />
                        <Box className="mainSparkle__child2" />
                        <Box className="mainSparkle__child3" />
                        <DoneAllRounded className="mainSparkle__icon" />
                    </Box>
                    <Box textAlign="center">
                        <Box mb={3}>
                            <Typography variant="h4">
                                <Box fontWeight="fontWeightBold">
                                    You’re all set up!
                                </Box>
                            </Typography>
                        </Box>
                        <Box mb={2}>
                            <Typography variant="h6">
                                You can now use your account
                            </Typography>
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.finishButton}
                                disableElevation
                            >
                                Finish Set Up
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default FinishDialog;
