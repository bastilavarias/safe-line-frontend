import { Typography, Box, Grid } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AccountInfo from './user/AccountInfo';
import { makeStyles } from '@material-ui/core/styles';

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
}));

function SignUp() {
    const classes = useStyles();

    return (
        <Box component="section">
            <Grid container>
                <Grid item xs={12} md={3}>
                    <Box
                        height="100vh"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
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
                    </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Router>
                        <Switch>
                            <Route path="/">
                                <AccountInfo />
                            </Route>
                        </Switch>
                    </Router>
                </Grid>
            </Grid>
        </Box>
    );
}

export default SignUp;
