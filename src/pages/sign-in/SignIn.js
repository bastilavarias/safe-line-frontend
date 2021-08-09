import { Box, Button, Grid, TextField, Typography } from '@material-ui/core';
import ImageGirl2 from '../../assets/images/girl-2.jpg';
import { makeStyles } from '@material-ui/core/styles';
import SignInAppBar from '../../parts/app-bars/SignIn';
import { ArrowRightAlt } from '@material-ui/icons';
import Logo from '../../components/Logo';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    primaryText: { color: theme.palette.primary.main },

    button: { borderRadius: '.6rem', textTransform: 'capitalize' },

    image: {
        width: '18rem',
        height: '18rem',
        borderRadius: '50%',
        objectFit: 'cover',
    },

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

    sparkle1: {
        width: '4rem',
        height: '4rem',
        borderRadius: '50%',
        backgroundColor: '#F1C40F',
        position: 'absolute',
        right: '0',
        bottom: '-20%',
        transform: 'translate(0, 20%)',
    },

    sparkle2: {
        width: '3rem',
        height: '3rem',
        borderRadius: '50%',
        backgroundColor: '#1ABC9C',
        position: 'absolute',
        left: '15%',
        top: '-35%',
        transform: 'translate(-15%, 35%)',
    },

    sparkle3: {
        width: '2rem',
        height: '2rem',
        borderRadius: '50%',
        backgroundColor: '#E74C3C',
        position: 'absolute',
        left: '0',
        bottom: '-10%',
        transform: 'translate(0, 10%)',
    },
}));

function SignIn() {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Box component="section">
            <Grid container>
                <Grid item xs={12} md={4}>
                    <Box
                        height="100vh"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        style={{ backgroundColor: '#E5FCFF' }}
                    >
                        <Box position="relative">
                            <img
                                src={ImageGirl2}
                                alt="Girl 2"
                                className={classes.image}
                            />
                            <Box className={classes.sparkle1} />
                            <Box className={classes.sparkle2} />
                            <Box className={classes.sparkle3} />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box height="100vh" position="relative">
                        <SignInAppBar />
                        <Box
                            height="100%"
                            width="100%"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Box width="50%">
                                <Box
                                    mb={5}
                                    className={classes.logoBox}
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Logo className={classes.logo} />
                                </Box>
                                <Box mb={2}>
                                    <Typography variant="h3">
                                        <Box fontWeight="fontWeightBold">
                                            Hello, Welcome back!
                                        </Box>
                                    </Typography>
                                </Box>
                                <Box mb={2}>
                                    <Typography variant="subtitle1">
                                        <Box component="span" mr={1}>
                                            New to Safe Line?
                                        </Box>
                                        <Box
                                            component="span"
                                            color="primary"
                                            className={classes.primaryText}
                                        >
                                            Create an Account
                                        </Box>
                                    </Typography>
                                </Box>
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Email"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Password"
                                            variant="outlined"
                                            fullWidth
                                            type="password"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            color="primary"
                                            size="medium"
                                            className={classes.button}
                                            onClick={() =>
                                                history.push('/user-dashboard')
                                            }
                                        >
                                            <Box component="span" mr={1}>
                                                Sign In
                                            </Box>
                                            <ArrowRightAlt />
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            color="primary"
                                            className={classes.button}
                                        >
                                            Forgot Password?
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default SignIn;
