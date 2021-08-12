import { Box, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '../../parts/drawers/UserDashboard';
import Toolbar from './components/Toolbar';
import Table from './components/Table';

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
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={7} lg={8} xl={9}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Toolbar />
                                </Grid>
                                <Grid item xs={12}>
                                    <Table />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={5} lg={4} xl={3}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Animi aut deleniti esse impedit, nesciunt non
                            perspiciatis possimus recusandae tempora! Cumque
                            numquam odit optio quae quo. Alias aliquid
                            asperiores commodi consequatur, deserunt est eum ex
                            explicabo facilis illum ipsum odio pariatur,
                            repellat reprehenderit sit tenetur totam unde. Fuga
                            fugit officiis quam?
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export default User;
