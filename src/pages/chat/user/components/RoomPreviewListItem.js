import {
    Typography,
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Box,
    IconButton,
} from '@material-ui/core';
import { CheckRounded, MoreHorizRounded } from '@material-ui/icons';
import { Fragment } from 'react';
import './room-preview-list-item.scss';

function RoomPreviewListItem({ isSeen, image, name }) {
    return (
        <ListItem
            alignItems="flex-start"
            className="cursor-pointer c-border-radius"
            button
        >
            <ListItemAvatar>
                <Avatar src={image} className="avatar" />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Fragment>
                        <Typography variant="h6">
                            <Box
                                fontWeight={
                                    isSeen
                                        ? 'fontWeightRegular'
                                        : 'fontWeightBold'
                                }
                            >
                                {name}
                            </Box>
                        </Typography>
                    </Fragment>
                }
                secondary={
                    <Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className="text-message"
                        >
                            <Box
                                fontWeight={
                                    isSeen
                                        ? 'fontWeightRegular'
                                        : 'fontWeightBold'
                                }
                            >
                                You: Message here
                            </Box>
                        </Typography>
                    </Fragment>
                }
            />
            <ListItemSecondaryAction>
                <IconButton>
                    {isSeen ? <CheckRounded /> : <MoreHorizRounded />}
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default RoomPreviewListItem;
