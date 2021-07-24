import HomeAppBar from '../parts/app-bars/HomeAppBar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        color: '#000000',
        backgroundColor: theme.palette.primary.light,
    },
}));

function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <HomeAppBar />
        </div>
    );
}

export default Home;
