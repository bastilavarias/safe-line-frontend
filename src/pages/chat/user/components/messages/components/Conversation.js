import { Box } from '@material-ui/core';
import './conversation.scss';

function Conversation() {
    return (
        <Box className="conversation" px={3} py={5}>
            {Array.from(Array(100).keys()).map(() => (
                <Box>Conversation</Box>
            ))}
        </Box>
    );
}

export default Conversation;
