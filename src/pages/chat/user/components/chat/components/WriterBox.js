import {
    Box,
    Grid,
    FormControl,
    IconButton,
    OutlinedInput,
    InputAdornment,
    Fab,
} from '@material-ui/core';
import { AttachFileRounded, SendRounded } from '@material-ui/icons';
import './writer-box.scss';

function WriterBox() {
    return (
        <Box className="writer-box" display="flex" alignItems="center">
            <Grid container>
                <Grid item md={10} xl={11}>
                    <FormControl fullWidth>
                        <OutlinedInput
                            className="writer-box__input"
                            id="outlined-adornment-amount"
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconButton size="small">
                                        <AttachFileRounded fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            }
                            placeholder="Type your messages..."
                        />
                    </FormControl>
                </Grid>
                <Grid item md={2} xl={1} className="writer-box__right-grid">
                    <Box
                        display="flex"
                        alignItems="center"
                        alignSelf="stretch"
                        justifyContent="center"
                        width="100%"
                    >
                        <Fab color="primary" className="send-button">
                            <SendRounded />
                        </Fab>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default WriterBox;
