import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardArrowDown } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.light,
        color: '#000000',
        boxShadow: 'none',
        paddingTop: '1rem',
    },
    toolbar: {
        padding: '0',
    },
    logo: {
        width: '2.5rem',
        height: 'auto',
        fill: theme.palette.primary.main,
        marginRight: theme.spacing(1),
    },
    title: { fontWeight: '500', flexGrow: 1 },
    navigations: { flexGrow: 0 },
    button: {
        textTransform: 'capitalize',
        marginRight: theme.spacing(1),
    },
    signInButton: {
        textTransform: 'capitalize',
        borderRadius: '.5rem',
    },
}));

function HomeAppBar() {
    const classes = useStyles();

    const Logo = () => {
        return (
            <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 142.657 142.657"
                className={classes.logo}
            >
                <g>
                    <path
                        d="M142.657,51.487c0,4.277-0.67,8.513-2.01,12.602c-6.612,29.724-63.753,65.918-66.18,67.435
		c-0.506,0.322-1.084,0.475-1.659,0.475c-0.579,0-1.154-0.152-1.663-0.475c-1.159-0.725-28.564-18.043-48-38.562
		c-1.178-1.248-1.129-3.228,0.125-4.402c1.254-1.176,3.224-1.127,4.409,0.127c16.224,17.135,38.864,32.4,45.13,36.499
		c9.456-6.187,56.3-37.923,61.835-62.74c1.206-3.754,1.778-7.334,1.778-10.952c0-12.589-6.856-24.198-17.891-30.314
		c-5.103-2.801-10.875-4.29-16.696-4.29c-10.327,0-20.033,4.558-26.634,12.52c-0.597,0.712-1.471,1.129-2.399,1.129l0,0
		c-0.922,0-1.808-0.405-2.398-1.129c-6.616-7.956-16.332-12.52-26.656-12.52c-5.812,0-11.587,1.483-16.706,4.29
		C16.012,27.283,9.158,38.904,9.158,51.487c0,3.611,0.576,7.191,1.711,10.656c0.728,3.242,2.18,6.558,4.144,10.028h20.871
		l6.68-11.183c0.548-0.922,1.538-1.495,2.618-1.513c0.965-0.125,2.083,0.511,2.673,1.422l10.93,16.833l12.178-32.915
		c0.451-1.224,1.617-2.04,2.92-2.04h0.006c1.301,0,2.47,0.81,2.92,2.034l10.199,27.361h18.055c1.724,0,3.117,1.4,3.117,3.118
		c0,1.729-1.394,3.117-3.117,3.117H84.834c-1.303,0-2.466-0.804-2.929-2.021l-8.004-21.525L62.49,85.738
		c-0.405,1.103-1.41,1.889-2.582,2.01c-0.119,0.013-0.231,0.024-0.344,0.024c-1.047,0-2.037-0.536-2.618-1.425L45.355,68.494
		l-5.021,8.403c-0.561,0.938-1.577,1.522-2.673,1.522H3.118C1.397,78.42,0,77.02,0,75.302c0-1.729,1.397-3.117,3.118-3.117h4.801
		c-1.416-2.911-2.469-5.727-3.057-8.388c-1.257-3.791-1.939-8.032-1.939-12.304c0-14.851,8.09-28.555,21.108-35.771
		c6.046-3.318,12.857-5.063,19.716-5.063c10.991,0,21.391,4.378,29.048,12.121c7.654-7.743,18.042-12.121,29.033-12.121
		c6.875,0,13.67,1.745,19.717,5.063C134.589,22.929,142.657,36.642,142.657,51.487z"
                    />
                </g>
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
                <g />
            </svg>
        );
    };

    return (
        <AppBar className={classes.root} position="fixed">
            <Container maxWidth="lg">
                <Toolbar className={classes.toolbar}>
                    <Logo />
                    <Typography className={classes.title}>Safe Line</Typography>
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
                        className={classes.signInButton}
                    >
                        Sign In
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default HomeAppBar;
