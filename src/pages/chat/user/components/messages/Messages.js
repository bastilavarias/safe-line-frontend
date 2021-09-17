import { Box } from '@material-ui/core';
import Toolbar from './components/Toolbar';
import './messages.scss';
import Conversation from './components/Conversation';
import WriterBox from './components/WriterBox';

function Messages() {
    return (
        <Box
            className="messages"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
        >
            <Toolbar />
            <Conversation />
            <WriterBox />
        </Box>
    );
}

export default Messages;
