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
import { KeyboardArrowDown } from '@material-ui/icons';
import Logo from '../../components/Logo';

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

    signUpButton: {
        textTransform: 'capitalize',
        borderRadius: '.5rem',
    },
}));

function SignInAppBar() {
    const classes = useStyles();
    const history = useHistory();

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
                    <Button color="inherit" className={classes.button}>
                        Home
                    </Button>
                    <Button
                        color="inherit"
                        className={classes.button}
                        endIcon={<KeyboardArrowDown />}
                    >
                        Clinics
                    </Button>
                    <Button color="inherit" className={classes.button}>
                        Lorem Ipsum
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.signUpButton}
                        onClick={() => history.push('/sign-in')}
                    >
                        Sign Up
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default SignInAppBar;
