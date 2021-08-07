import {
    Dialog,
    Slide,
    DialogTitle,
    DialogContent,
    Button,
    Box,
    Typography,
} from '@material-ui/core';
import { DoneAll, Close } from '@material-ui/icons';
import { forwardRef, useState } from 'react';
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
            <DialogContent>Test</DialogContent>
        </Dialog>
    );
}

export default FinishDialog;
