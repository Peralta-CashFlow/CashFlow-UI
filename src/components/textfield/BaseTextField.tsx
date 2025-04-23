import TextField, { TextFieldVariants } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

interface BaseTextFieldProps {
    label: string;
    color?: string;
    variant?: TextFieldVariants;
    required?: boolean;
    type?: string;
    className?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    fontSize?: string;
    fieldName?: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    error?: boolean;
    helperText?: string | boolean;
    value?: string | number;
}

const BaseTextField: React.FC<BaseTextFieldProps> = ({
    label, color = 'white', variant = 'outlined',
    required, type = 'text', className, onChange,
    fontSize, fieldName, onBlur, error = false,
    helperText, value
}) => {

    const [showPassword, setShowPassword] = useState(false);

    const preventDefault = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    return (
        <TextField
            label={label}
            variant={variant}
            required={required}
            type={type === 'password' && showPassword ? 'text' : type}
            className={className}
            onChange={onChange}
            name={fieldName}
            id={fieldName}
            onBlur={onBlur}
            error={error}
            value={value}
            sx={{
                input: { color: color, fontSize: fontSize },
                label: { color: color },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: color },
                    '&:hover fieldset': { borderColor: color },
                    '&.Mui-focused fieldset': { borderColor: color },
                },
            }}
            slotProps={{
                inputLabel: {
                    sx: {
                        color: color,
                        '&.Mui-focused': {
                            color: color,
                        },
                    },
                },
                input: {
                    endAdornment: type === 'password' && (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={showPassword ? 'hide the password' : 'display the password'}
                                onClick={() => setShowPassword(!showPassword)}
                                onMouseDown={preventDefault}
                                onMouseUp={preventDefault}
                                edge="end"
                                sx={{ color: color }}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }
            }}
        />
    );
}

export default BaseTextField