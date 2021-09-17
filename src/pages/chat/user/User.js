import { Box, Grid } from '@material-ui/core';
import './user.scss';
import Chat from './components/chat/Chat';
import Room from './components/room/Room';

function User() {
    return (
        <Box className="user">
            <Grid container>
                <Grid item md={3}>
                    <Room />
                </Grid>
                <Grid item md={9}>
                    <Chat />
                </Grid>
            </Grid>
        </Box>
    );
}

export default User;
