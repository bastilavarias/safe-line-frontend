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
        maxWidth: '15rem',
        minWidth: '15rem',
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
                    <Box mb={5} className={classes.mainSparkle}>
                        <Box className="mainSparkle__child1" />
                        <Box className="mainSparkle__child2" />
                        <Box className="mainSparkle__child3" />
                        <DoneAllRounded className="mainSparkle__icon" />
                    </Box>
                    <Box textAlign="center">
                        <Typography variant="h4">
                            <Box fontWeight="fontWeightBold">
                                You’re all set up!
                            </Box>
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default FinishDialog;
