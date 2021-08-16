import { Box, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '../../parts/drawers/UserDashboard';
import SearchToolbar from './components/SearchToolbar';
import Table from './components/Table';
import InformationBox from './components/InformationBox';
import UserToolbar from './components/UserToolbar';

const useStyles = makeStyles((theme) => ({
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
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={7} lg={8} xl={9}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <SearchToolbar />
                                </Grid>
                                <Grid item xs={12}>
                                    <Table />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Grid container spacing={4}>
                                            {[1, 2, 3, 4].map((n) => (
                                                <Grid
                                                    key={n}
                                                    item
                                                    xs={12}
                                                    md={3}
                                                >
                                                    <InformationBox />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={5} lg={4} xl={3}>
                            <UserToolbar />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export default User;
