import { Box } from '@material-ui/core';
import './conversation-box.scss';

function ConversationBox() {
    return (
        <Box className="conversation-box" px={3} py={5}>
            {Array.from(Array(100).keys()).map(() => (
                <Box>Conversation</Box>
            ))}
        </Box>
    );
}

export default ConversationBox;
