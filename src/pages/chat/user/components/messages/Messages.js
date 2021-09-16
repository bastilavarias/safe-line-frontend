import { Box } from '@material-ui/core';
import Toolbar from './components/Toolbar';
import './messages.scss';

function Messages() {
    return (
        <Box
            className="messages"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
        >
            <Toolbar />
        </Box>
    );
}

export default Messages;
