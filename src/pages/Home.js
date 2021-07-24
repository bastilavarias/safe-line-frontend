import HomeAppBar from '../parts/app-bars/HomeAppBar';
import { Box, Container, Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Map, VideocamRounded, Duo, ArrowRightAlt } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        color: '#000000',
        backgroundColor: theme.palette.primary.light,
    },

    button: {
        borderRadius: '.5rem',
        textTransform: 'capitalize',
        width: '10rem',
    },
}));

function Home() {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <HomeAppBar />
            <Container maxWidth="lg">
                <Grid container spacing={2} className={classes.grid}>
                    <Grid item xs={12} md={6}>
                        <Box component="div" py={10}>
                            <Typography variant="h4">
                                <Box fontWeight="fontWeightBold" mb={3}>
                                    Safe Line, your friendly companion.
                                </Box>
                            </Typography>
                            <Box mb={5}>
                                <Typography variant="body1">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Cupiditate, delectus,
                                    unde? Accusamus accusantium distinctio eius
                                    et fuga labore veritatis voluptatum.
                                </Typography>
                            </Box>
                            <Box mb={5}>
                                <Box display="flex" alignItems="center" mb={3}>
                                    <Box mr={3}>
                                        <Map color="primary" fontSize="large" />
                                    </Box>
                                    <Typography variant="body1">
                                        Find a Clinic whereever you are
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mb={3}>
                                    <Box mr={3}>
                                        <VideocamRounded
                                            color="primary"
                                            fontSize="large"
                                        />
                                    </Box>
                                    <Typography variant="body1">
                                        Get checked at home
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <Box mr={3}>
                                        <Duo color="primary" fontSize="large" />
                                    </Box>
                                    <Typography variant="body1">
                                        Message your doctor anytime
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex">
                                <Box mr={3}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                    >
                                        <Box component="span" mr={1}>
                                            Join Safe Line
                                        </Box>
                                        <ArrowRightAlt />
                                    </Button>
                                </Box>
                                <Box mr={3}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        className={classes.button}
                                    >
                                        Learn More
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" justifyContent="center">
                            <img />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Home;
