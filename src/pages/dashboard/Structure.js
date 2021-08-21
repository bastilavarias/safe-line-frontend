import { useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Drawer from '../../parts/drawers/UserDashboard';
import { Switch, Route } from 'react-router-dom';
import User from './user/components/User';
import Clinics from '../clinics/Clinics';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#F5F5F5',
        minHeight: '100vh',
        display: 'flex',
    },
}));

function Structure() {
    const classes = useStyles();
    let { path } = useRouteMatch();

    return (
        <Box component="section" className={classes.root}>
            <Drawer />
            <Box component="main" width="100%" pt={5}>
                <Switch>
                    <Route exact path={path}>
                        <User />
                    </Route>
                    <Route exact path={`${path}/clinics`}>
                        <Clinics />
                    </Route>
                </Switch>
            </Box>
        </Box>
    );
}

export default Structure;
