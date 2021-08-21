import { Box, Container, Grid } from '@material-ui/core';
import SearchToolbar from './SearchToolbar';
import ConsultationsTable from './ConsultationsTable';
import InformationBox from './InformationBox';
import UserToolbar from './UserToolbar';
import ScheduleCalendar from './ScheduleCalendar';
import RemindersBox from './reminders/RemindersBox';

function User() {
    return (
        <Container maxWidth="xl">
            <Grid container spacing={4}>
                <Grid item xs={12} md={7} lg={8} xl={9}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <SearchToolbar />
                        </Grid>
                        <Grid item xs={12}>
                            <ConsultationsTable />
                        </Grid>
                        <Grid item xs={12}>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Grid container spacing={4}>
                                    {[1, 2, 3, 4].map((n) => (
                                        <Grid key={n} item xs={12} md={3}>
                                            <InformationBox />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={5} lg={4} xl={3}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <UserToolbar />
                        </Grid>
                        <Grid item xs={12}>
                            <ScheduleCalendar />
                        </Grid>
                        <Grid item xs={12}>
                            <RemindersBox />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default User;
