import { useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Drawer from '../../parts/drawers/UserDashboard';
import { Switch, Route } from 'react-router-dom';
import User from './user/User';
import ClinicLocator from '../clinic-locator/ClinicLocator';
import Chat from '../chat/user/User';

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
            <Box component="main" width="100%">
                <Switch>
                    <Route exact path={path} component={User} />
                    <Route
                        path={`${path}/clinic-locator`}
                        component={ClinicLocator}
                    />
                    <Route path={`${path}/chat`} component={Chat} />
                </Switch>
            </Box>
        </Box>
    );
}

export default Structure;
