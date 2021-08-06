import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Container,
    Button,
    Box,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../../components/Logo';
import SignUpSelectionDialog from '../../components/sign-up/SelectionDialog';
import { BaseButtonStyle } from '../../styles/base';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#fff',
        color: '#000000',
        boxShadow: 'none',
        padding: '1rem 0',
        width: '100%',
    },

    toolbar: {
        padding: '0',
        display: 'flex',
        justifyContent: 'space-around',
    },

    logo: {
        width: '2.5rem',
        height: 'auto',
        fill: theme.palette.primary.main,
        marginRight: theme.spacing(1),
        cursor: 'pointer',
    },

    button: {
        textTransform: 'capitalize',
        marginRight: theme.spacing(1),
    },
}));

function SignIn() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const classes = useStyles();
    const history = useHistory();
    const baseButtonStyle = BaseButtonStyle();

    const setDialogState = (state) => {
        setIsDialogOpen(state);
    };

    return (
        <AppBar className={classes.root} position="absolute">
            <Container maxWidth="lg">
                <Toolbar className={classes.toolbar}>
                    <Logo
                        className={classes.logo}
                        onClick={() => history.push('/')}
                    />
                    <Box
                        component="span"
                        flexGrow={1}
                        onClick={() => history.push('/')}
                    >
                        <Typography variant="h6">
                            <Box fontWeight="fontWeightSemiBold">Safe Line</Box>
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        className={baseButtonStyle.base}
                        onClick={() => setDialogState(true)}
                    >
                        Sign Up
                    </Button>
                </Toolbar>
            </Container>
            <SignUpSelectionDialog
                isOpen={isDialogOpen}
                setDialogState={setDialogState}
            />
        </AppBar>
    );
}

export default SignIn;
