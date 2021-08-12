import { Box, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '../../parts/drawers/UserDashboard';
import Toolbar from './components/Toolbar';

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: '#F5F5F5',
        minHeight: '100vh',
        display: 'flex',
    },
}));

function User() {
    const classes = useStyles();

    return (
        <Box component="section" className={classes.root}>
            <Drawer />
            <Box component="main" width="100%" pt={5}>
                <Container maxWidth="xl">
                    <Grid container>
                        <Grid item xs={12} md={7} lg={8} xl={9}>
                            <Toolbar />
                        </Grid>
                        <Grid item xs={12} md={5} lg={4} xl={3}></Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export default User;
