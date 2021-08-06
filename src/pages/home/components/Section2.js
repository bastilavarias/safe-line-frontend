import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import { ArrowRightAlt, VideocamRounded } from '@material-ui/icons';
import LandingPageImage from '../../../assets/images/girl-1.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.primary.light,
    },

    image: {
        width: '30rem',
        height: '30rem',
        borderRadius: '50%',
        objectFit: 'cover',
    },

    icon: {
        fontSize: '5rem',
    },

    button: {
        borderRadius: '.6rem',
        textTransform: 'capitalize',
        width: '10rem',
    },
}));

function Section2() {
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

                    <Grid item xs={12} md={6}>
                        <Box
                            height="100%"
                            display="flex"
                            justifyContent="center"
                            flexDirection="column"
                        >
                            <Box>
                                <VideocamRounded
                                    color="primary"
                                    className={classes.icon}
                                />
                            </Box>
                            <Box mb={3}>
                                <Typography variant="h4">
                                    <Box fontWeight="fontWeightBold">
                                        Get checked at home
                                    </Box>
                                </Typography>
                            </Box>
                            <Box mb={3}>
                                <Typography variant="body1">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Cupiditate, delectus,
                                    unde? Accusamus accusantium distinctio eius
                                    et fuga labore veritatis voluptatum.
                                </Typography>
                            </Box>
                            <Button
                                variant="outlined"
                                color="primary"
                                className={classes.button}
                            >
                                <Box component="span" mr={1}>
                                    Learn More
                                </Box>
                                <ArrowRightAlt />
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Section2;
