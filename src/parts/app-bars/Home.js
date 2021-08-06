import { useHistory } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Button,
    Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardArrowDown } from '@material-ui/icons';
import Logo from '../../components/Logo';
import { BaseButtonStyle } from '../../styles/base';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#fff',
        color: '#000000',
        boxShadow: 'none',
        padding: '1rem 0',
    },

    logo: {
        width: '2.5rem',
        height: 'auto',
        fill: theme.palette.primary.main,
        marginRight: theme.spacing(1),
        cursor: 'pointer',
    },

    button: {
        textTransform: 'capitalize',
        marginRight: theme.spacing(1),
    },
}));

function Home() {
    const classes = useStyles();
    const history = useHistory();
    const baseButtonStyle = BaseButtonStyle();

    return (
        <AppBar className={classes.root} position="fixed">
            <Container maxWidth="lg">
                <Toolbar style={{ padding: 0 }}>
                    <Logo
                        className={classes.logo}
                        onClick={() => history.push('/')}
                    />
                    <Box
                        component="span"
                        flexGrow={1}
                        onClick={() => history.push('/')}
                    >
                        <Typography variant="h6">
                            <Box fontWeight="fontWeightSemiBold">Safe Line</Box>
                        </Typography>
                    </Box>
                    <Button color="inherit" className={classes.button}>
                        Home
                    </Button>
                    <Button
                        color="inherit"
                        className={classes.button}
                        endIcon={<KeyboardArrowDown />}
                    >
                        Clinics
                    </Button>
                    <Button color="inherit" className={classes.button}>
                        Lorem Ipsum
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={baseButtonStyle.base}
                        onClick={() => history.push('/sign-in')}
                    >
                        Sign In
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Home;
