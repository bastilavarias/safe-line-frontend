import { Box } from '@material-ui/core';
import Toolbar from './components/Toolbar';
import './chat.scss';
import ConversationBox from './components/ConversationBox';
import WriterBox from './components/WriterBox';

function Chat() {
    return (
        <Box
            className="chat"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
        >
            <Toolbar />
            <ConversationBox />
            <WriterBox />
        </Box>
    );
}

export default Chat;
