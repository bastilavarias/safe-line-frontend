import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Home from './pages/home/Home';
import SignIn from './pages/sign-in/SignIn';
import UserSignUp from './pages/sign-up/components/user/Body';
import ClinicSignUp from './pages/sign-up/components/clinic/Body';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import DashboardStructure from './pages/dashboard/Structure';
import './styles/_index.scss';

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
                        <Route exact path="/" component={Home} />
                        <Route
                            path="/sign-up/clinic"
                            component={ClinicSignUp}
                        />
                        <Route path="/sign-up/user" component={UserSignUp} />
                        <Route path="/sign-in" component={SignIn} />
                        <Route
                            path="/user-dashboard"
                            component={DashboardStructure}
                        />
                    </Switch>
                </Router>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );
}

export default App;
