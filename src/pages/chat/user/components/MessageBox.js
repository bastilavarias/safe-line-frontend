import { Box, Avatar, Typography } from '@material-ui/core';
import './message-box.scss';

function MessageBox({ isSelf, className }) {
    return (
        <Box className={className}>
            {isSelf ? (
                <Box />
            ) : (
                <Box display="flex" alignItems="start" maxWidth="30rem">
                    <Box mr={2}>
                        <Avatar
                            alt="Remy Sharp"
                            src="https://avatars.githubusercontent.com/u/1024025?v=4"
                        />
                    </Box>
                    <Box>
                        <Box className="message-content">
                            <Box
                                mb={1}
                                display="flex"
                                justifyContent="space-between"
                            >
                                <Typography variant="caption">
                                    <Box fontWeight="bold">Linus Torvalds</Box>
                                </Typography>
                                <Typography variant="caption">
                                    Yesterday
                                </Typography>
                            </Box>
                            <Box>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Ad aspernatur beatae cumque
                                deleniti deserunt, ex, fugit, harum illum itaque
                                maiores optio placeat quae quisquam quo quod
                                reiciendis sunt unde voluptatibus? At atque
                                dignissimos dolor, dolore, ducimus eligendi
                                laborum magnam natus numquam odit optio
                                praesentium quam, reiciendis repellendus
                                similique vel voluptates.
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default MessageBox;
