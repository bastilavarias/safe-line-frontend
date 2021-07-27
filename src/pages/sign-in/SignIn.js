import { Box, Container, Grid, TextField, Typography } from '@material-ui/core';
import ImageGirl2 from '../../assets/images/girl-2.jpg';
import { makeStyles, alpha } from '@material-ui/core/styles';
import SignInAppBar from '../../parts/app-bars/SignInappBar';

const useStyles = makeStyles((theme) => ({
    image: {
        width: '18rem',
        height: '18rem',
        borderRadius: '50%',
        objectFit: 'cover',
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

    primaryText: { color: theme.palette.primary.main },
}));

function SignIn() {
    const classes = useStyles();

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
                                            Create Account
                                        </Box>
                                    </Typography>
                                </Box>
                                <Box>
                                    <Box py={1}>
                                        <Box>
                                            <Typography variant="subtitle1">
                                                <Box fontWeight="fontWeightBold">
                                                    Email
                                                </Box>
                                            </Typography>
                                        </Box>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            style={{
                                                backgroundColor: '#E4E4E4',
                                            }}
                                            margin="dense"
                                        />
                                    </Box>

                                    <Box py={1}>
                                        <Box>
                                            <Typography variant="subtitle1">
                                                <Box fontWeight="fontWeightBold">
                                                    Email
                                                </Box>
                                            </Typography>
                                        </Box>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            style={{
                                                backgroundColor: '#E4E4E4',
                                            }}
                                            margin="dense"
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default SignIn;
