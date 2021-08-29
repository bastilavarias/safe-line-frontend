import { Box } from '@material-ui/core';
import ImageGirl1 from '../../../../../assets/images/girl-1.jpg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    image: {
        width: '20rem',
        height: '20rem',
        borderRadius: '50%',
        objectFit: 'cover',
    },

    sparkle1: {
        width: '4rem',
        height: '4rem',
        borderRadius: '50%',
        backgroundColor: 'rgba(241,196,15, .7)',
        position: 'absolute',
        left: '30%',
        bottom: '-20%',
        transform: 'translate(-30%, 20%)',
    },

    sparkle2: {
        width: '3rem',
        height: '3rem',
        borderRadius: '50%',
        backgroundColor: 'rgba(26,188,156, .7)',
        position: 'absolute',
        left: '15%',
        top: '0',
        transform: 'translate(-15%, 0)',
    },

    sparkle3: {
        width: '2rem',
        height: '2rem',
        borderRadius: '50%',
        backgroundColor: 'rgba(231,76,60, .7)',
        position: 'absolute',
        right: '25%',
        top: '-15%',
        transform: 'translate(-25%, 15%)',
    },
}));

function ImageBox() {
    const classes = useStyles();

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="relative"
        >
            <img alt="Girl 1" src={ImageGirl1} className={classes.image} />
            <Box className={classes.sparkle1} />
            <Box className={classes.sparkle2} />
            <Box className={classes.sparkle3} />
        </Box>
    );
}

export default ImageBox;
