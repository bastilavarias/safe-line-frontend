import { Box } from '@material-ui/core';
import './conversation-box.scss';
import MessageBox from '../../MessageBox';

function ConversationBox() {
    return (
        <Box className="conversation-box" px={3} py={5}>
            {Array.from(Array(100).keys()).map((key) => (
                <MessageBox
                    className={![1, 100].includes(key) ? 'space-y' : ''}
                    isSelf={key % 2 !== 0}
                />
            ))}
        </Box>
    );
}

export default ConversationBox;
