import { useState } from 'react';
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@material-ui/core';
import { VisibilityRounded, VisibilityOffRounded } from '@material-ui/icons';

function PasswordField({ label, onChange, value }) {
    const [isPasswordShow, setPasswordShow] = useState(false);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleShowPassword = () => {
        setPasswordShow((show) => !show);
    };

    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
                {label}
            </InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={isPasswordShow ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {isPasswordShow ? (
                                <VisibilityRounded />
                            ) : (
                                <VisibilityOffRounded />
                            )}
                        </IconButton>
                    </InputAdornment>
                }
                labelWidth={70}
            />
        </FormControl>
    );
}

export default PasswordField;
