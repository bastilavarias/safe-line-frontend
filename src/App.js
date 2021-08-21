import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Home from './pages/home/Home';
import SignIn from './pages/sign-in/SignIn';
import UserSignUp from './pages/sign-up/components/user/Body';
import ClinicSignUp from './pages/sign-up/components/clinic/Body';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import DashboardStructure from './pages/dashboard/Structure';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4F48EC',
            light: '#F6FEFF',
            dark: '#100E34',
        },
        secondary: {
            main: '#38D6EB',
        },
    },

    overrides: {
        MuiPickersCalendarHeader: {
            daysHeader: {
                display: 'flex',
                justifyContent: 'space-between',
            },
        },

        MuiPickersCalendar: {
            week: {
                display: 'flex',
                justifyContent: 'space-between',
            },
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/sign-up/clinic">
                            <ClinicSignUp />
                        </Route>
                        <Route path="/sign-up/user">
                            <UserSignUp />
                        </Route>
                        <Route path="/sign-in">
                            <SignIn />
                        </Route>
                        <Route path="/user-dashboard">
                            <DashboardStructure />
                        </Route>
                    </Switch>
                </Router>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );
}

export default App;
