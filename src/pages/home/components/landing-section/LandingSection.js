import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import {
    ArrowRightAlt,
    Duo,
    MapRounded,
    VideocamRounded,
} from '@material-ui/icons';
import ImageBox from './ImageBox';
import SignUpSelectionDialog from '../../../../components/sign-up/SelectionDialog';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        color: theme.palette.primary.dark,
        backgroundColor: '#fff',
    },

    button: {
        borderRadius: '.6rem',
        textTransform: 'capitalize',
        width: '10rem',
    },

    icon: {
        color: theme.palette.primary.dark,
    },
}));

function LandingSection() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const classes = useStyles();

    const setDialogState = (state) => {
        setIsDialogOpen(state);
    };

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
                                            className={classes.icon}
                                            fontSize="large"
                                        />
                                    </Box>
                                    <Typography variant="body1">
                                        <Box
                                            component="span"
                                            fontWeight="fontWeightBold"
                                        >
                                            Find a Clinic whereever you are
                                        </Box>
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" mb={3}>
                                    <Box mr={3}>
                                        <VideocamRounded
                                            className={classes.icon}
                                            fontSize="large"
                                        />
                                    </Box>
                                    <Typography variant="body1">
                                        <Box
                                            component="span"
                                            fontWeight="fontWeightBold"
                                        >
                                            Get checked at home
                                        </Box>
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <Box mr={3}>
                                        <Duo
                                            className={classes.icon}
                                            fontSize="large"
                                        />
                                    </Box>
                                    <Typography variant="body1">
                                        <Box
                                            component="span"
                                            fontWeight="fontWeightBold"
                                        >
                                            Message your doctor anytime
                                        </Box>
                                    </Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={() => setDialogState(true)}
                                >
                                    <Box component="span" mr={1}>
                                        Join Safe Line
                                    </Box>
                                    <ArrowRightAlt />
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ImageBox />
                    </Grid>
                </Grid>
            </Container>

            <SignUpSelectionDialog
                isOpen={isDialogOpen}
                setDialogState={setDialogState}
            />
        </Box>
    );
}

export default LandingSection;
