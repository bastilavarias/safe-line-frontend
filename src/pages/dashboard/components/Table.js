import { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    AppBar,
    Toolbar,
    Button,
    ListItemText,
    ListItem,
    Box,
    Menu,
    MenuItem,
} from '@material-ui/core';
import { ExpandMoreOutlined } from '@material-ui/icons';
import ConsultationStatusChip from '../../../components/ConsultationStatusChip';

const useStyles = makeStyles({
    paper: {
        paddingTop: '1rem',
    },

    appBar: {
        boxShadow: 'none',

        '& .appBar__toolbar': {
            '& .toolbar__title': {
                flexGrow: 1,
                fontWeight: 'bold',
            },

            '& .toolbar__button': {
                borderRadius: '.6rem',
                textTransform: 'capitalize',
                boxShadow: 'none',
            },
        },
    },

    table: {
        minWidth: 650,
    },

    listItem: {
        paddingLeft: 0,
    },

    button: {
        borderRadius: '.6rem',
    },
});

const rows = [
    {
        doctor: {
            name: 'Ernest Dela Cruz',
            specialty: 'Psychiatrist',
        },
        schedule: 'Aug 28, 2021',
        status: 'To Consult',
    },

    {
        doctor: {
            name: 'Ernest Dela Cruz',
            specialty: 'Psychiatrist',
        },
        schedule: 'Aug 28, 2021',
        status: 'Resched',
    },

    {
        doctor: {
            name: 'Ernest Dela Cruz',
            specialty: 'Psychiatrist',
        },
        schedule: 'Aug 28, 2021',
        status: 'Resched',
    },
];

function BaseTable() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <TableContainer component={Paper} className={classes.paper}>
            <AppBar
                position="static"
                className={classes.appBar}
                color="inherit"
            >
                <Toolbar className="appBar__toolbar">
                    <Typography variant="h5" className="toolbar__title">
                        Consultations
                    </Typography>
                    <Box mr={2}>
                        <Button
                            aria-controls="schedule-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                            endIcon={<ExpandMoreOutlined />}
                            className="toolbar__button"
                            variant="contained"
                        >
                            Schedule
                        </Button>
                        <Menu
                            id="schedule-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>
                                Sample Schedule Filter
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Box>
                        <Button
                            aria-controls="filter-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                            endIcon={<ExpandMoreOutlined />}
                            className="toolbar__button"
                            variant="contained"
                        >
                            Filter
                        </Button>
                        <Menu
                            id="filter-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>
                                Sample Schedule Filter
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Table className={classes.table} aria-label="Consultations Table">
                <TableHead>
                    <TableRow>
                        <TableCell>Doctors</TableCell>
                        <TableCell>Schedule</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                <ListItem className={classes.listItem}>
                                    <ListItemText
                                        primary={
                                            <Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="subtitle1"
                                                >
                                                    <Box fontWeight="bold">
                                                        {row.doctor.name}
                                                    </Box>
                                                </Typography>
                                            </Fragment>
                                        }
                                        secondary={row.doctor.specialty}
                                    />
                                </ListItem>
                            </TableCell>
                            <TableCell>
                                <ListItem className={classes.listItem}>
                                    <ListItemText
                                        primary={
                                            <Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="subtitle1"
                                                >
                                                    {row.schedule}
                                                </Typography>
                                            </Fragment>
                                        }
                                        secondary="In 3 hours"
                                    />
                                </ListItem>
                            </TableCell>
                            <TableCell>
                                <ConsultationStatusChip text={row.status} />
                            </TableCell>
                            <TableCell align="right">
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    className={classes.button}
                                >
                                    Go To Room
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default BaseTable;
