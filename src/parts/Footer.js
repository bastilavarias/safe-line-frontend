import { makeStyles } from '@material-ui/core/styles';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { Phone, Email, Facebook, Twitter, Instagram } from '@material-ui/icons';
import Logo from '../components/Logo';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
    },
    logo: {
        width: '3rem',
        height: 'auto',
        fill: '#fff',
        marginRight: theme.spacing(1),
    },
}));

function Footer() {
    const classes = useStyles();

    return (
        <Box className={classes.root} py={5}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={2}>
                        <Box display="flex" alignItems="center" mb={3}>
                            <Logo classes={classes} />
                            <Typography variant="h6">
                                <Box fontWeight="fontWeightSemiBold">
                                    Safe Line
                                </Box>
                            </Typography>
                        </Box>
                        <Box mb={3}>
                            <Typography variant="caption">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Lectus sed vel tellus facilisis
                                tincidunt sed.
                            </Typography>
                        </Box>
                        <Box mb={3}>
                            <Box display="flex" alignItems="center" mb={1}>
                                <Box component="span" mr={2}>
                                    <Phone />
                                </Box>
                                <Box component="span">
                                    <Typography variant="caption">
                                        Lorem ipsum.
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <Box component="span" mr={2}>
                                    <Email />
                                </Box>
                                <Box component="span">
                                    <Typography variant="caption">
                                        Lorem ipsum.
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Box>
                                <Facebook />
                            </Box>
                            <Box>
                                <Twitter />
                            </Box>
                            <Box>
                                <Instagram />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={1} />
                    <Grid item xs={12} md={9}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <Box pt={3}>
                                    <Typography variant="h6">
                                        Lorem ipsum.
                                    </Typography>
                                    <Box component="ul" pt={2}>
                                        <Box component="li" pb={2}>
                                            Lorem ipsum.
                                        </Box>
                                        <Box component="li" pb={2}>
                                            Lorem ipsum.
                                        </Box>
                                        <Box component="li">Lorem ipsum.</Box>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Box pt={3}>
                                    <Typography variant="h6">
                                        Lorem ipsum.
                                    </Typography>
                                    <Box component="ul" pt={2}>
                                        <Box component="li" pb={2}>
                                            Lorem ipsum.
                                        </Box>
                                        <Box component="li" pb={2}>
                                            Lorem ipsum.
                                        </Box>
                                        <Box component="li">Lorem ipsum.</Box>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Box pt={3}>
                                    <Typography variant="h6">
                                        Lorem ipsum.
                                    </Typography>
                                    <Box component="ul" pt={2}>
                                        <Box component="li" pb={2}>
                                            Lorem ipsum.
                                        </Box>
                                        <Box component="li" pb={2}>
                                            Lorem ipsum.
                                        </Box>
                                        <Box component="li">Lorem ipsum.</Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default Footer;
