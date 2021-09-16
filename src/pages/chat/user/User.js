import {
    Box,
    Grid,
    Typography,
    InputAdornment,
    FormControl,
    OutlinedInput,
    List,
} from '@material-ui/core';
import { SearchRounded, ExpandMoreRounded } from '@material-ui/icons';
import './user.scss';
import RoomPreviewListItem from './components/RoomPreviewListItem';
import Messages from './components/messages/Messages.js';

function User() {
    return (
        <Box className="root">
            <Grid container>
                <Grid item lg={4} xl={3}>
                    <Box className="rooms-holder">
                        <Box mb={2}>
                            <Typography variant="h5">
                                <Box fontWeight="bold">Messages</Box>
                            </Typography>
                        </Box>
                        <Box mb={3}>
                            <FormControl fullWidth variant="outlined">
                                <OutlinedInput
                                    margin="dense"
                                    placeholder="Search Messages"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <SearchRounded />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Box>
                        <Box mb={3}>
                            <Box display="flex" alignItems="center" mb={1}>
                                <Box mr={1}>
                                    <ExpandMoreRounded
                                        fontSize="small"
                                        className="gray--text cursor-pointer"
                                    />
                                </Box>
                                <Typography
                                    variant="caption"
                                    className="gray--text cursor-pointer"
                                >
                                    <Box fontWeight="bold">
                                        JRG Clinic Chats
                                    </Box>
                                </Typography>
                            </Box>
                            <List>
                                <RoomPreviewListItem
                                    isSeen={false}
                                    image="https://qualimed.com.ph/wp-content/uploads/2015/01/QualiMed-Clinic-Makati-Reception1.jpg"
                                    name="Clinic Channel"
                                />
                                <RoomPreviewListItem
                                    isSeen={true}
                                    image="https://qualimed.com.ph/wp-content/uploads/2015/01/QualiMed-Clinic-Makati-Reception1.jpg"
                                    name="Announcements"
                                />
                            </List>
                        </Box>
                        <Box>
                            <Box display="flex" alignItems="center" mb={1}>
                                <Box mr={1}>
                                    <ExpandMoreRounded
                                        fontSize="small"
                                        className="gray--text cursor-pointer"
                                    />
                                </Box>
                                <Typography
                                    variant="caption"
                                    className="gray--text cursor-pointer"
                                >
                                    <Box fontWeight="bold">Patients</Box>
                                </Typography>
                            </Box>
                            <List>
                                <RoomPreviewListItem
                                    isSeen={false}
                                    image="https://avatars.githubusercontent.com/u/24890911?v=4"
                                    name="Sebastian Curtis Lavarias"
                                />
                                <RoomPreviewListItem
                                    isSeen={true}
                                    image="https://avatars.githubusercontent.com/u/499550?v=4"
                                    name="Evan You"
                                />
                                <RoomPreviewListItem
                                    isSeen={true}
                                    image="https://avatars.githubusercontent.com/u/1024025?v=4"
                                    name="Linus Torvalds"
                                />
                            </List>
                        </Box>
                    </Box>
                </Grid>
                <Grid item lg={8} xl={9}>
                    <Messages />
                </Grid>
            </Grid>
        </Box>
    );
}

export default User;
