import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import {
    ArrowRightAlt,
    Duo,
    MapRounded,
    VideocamRounded,
} from '@material-ui/icons';
import LandingPageImage from '../../../assets/landing-page.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        color: '#000000',
        backgroundColor: theme.palette.primary.light,
    },

    button: {
        borderRadius: '.5rem',
        textTransform: 'capitalize',
        width: '10rem',
    },

    image: {
        width: '30rem',
        height: '30rem',
        borderRadius: '50%',
        objectFit: 'cover',
    },
}));

function LandingSection() {
    const classes = useStyles();

    return (
        <Box
            component="section"
            className={classes.root}
            display="flex"
            alignItems="center"
        >
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Box
                            component="div"
                            height="100%"
                            display="flex"
                            justifyContent="center"
                            flexDirection="column"
                        >
                            <Typography variant="h4">
                                <Box fontWeight="fontWeightBold">
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
                                        <MapRounded
                                            color="primary"
                                            fontSize="large"
                                        />
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
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <img
                                alt="Landing Section"
                                src={LandingPageImage}
                                className={classes.image}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default LandingSection;
