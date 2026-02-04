import TextField, { TextFieldVariants } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Tooltip from '@mui/material/Tooltip';

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
    value?: string | number | null;
    disabled?: boolean;
    initialAdornment?: React.ReactNode
    width?: string;
}

const BaseTextField: React.FC<BaseTextFieldProps> = ({
    label, color = 'white', variant = 'outlined',
    required, type = 'text', className, onChange,
    fontSize, fieldName, onBlur, error = false,
    helperText, value, disabled = false, initialAdornment,
    width = '100%'
}) => {

    const [showPassword, setShowPassword] = useState(false);

    const preventDefault = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
                label={label}
                variant={variant}
                required={required && !disabled}
                type={type === 'password' && showPassword ? 'text' : type}
                className={className}
                onChange={onChange}
                name={fieldName}
                id={fieldName}
                onBlur={onBlur}
                error={error}
                value={value}
                disabled={disabled}
                sx={{
                    input: {
                        color: color,
                        fontSize: fontSize,
                        '&:-webkit-autofill': {
                            WebkitTextFillColor: color,
                            boxShadow: '0 0 0 1000px transparent inset',
                            transition: 'background-color 9999s ease-in-out 0s',
                        },
                        width: width,
                    },
                    label: { color: color },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: color },
                        '&:hover fieldset': { borderColor: color },
                        '&.Mui-focused fieldset': { borderColor: color },
                        '&.Mui-disabled fieldset': { borderColor: color, opacity: 1 }
                    },
                    '& .MuiFormLabel-root.Mui-disabled': { color: color, opacity: 1 },
                    '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: color, color: color, opacity: 1 }
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
                        startAdornment: initialAdornment ?
                            <InputAdornment position='start'><p style={{ color: color }}>{initialAdornment}</p></InputAdornment>
                            : null,
                        endAdornment: (
                            <InputAdornment position="end">
                                {type === 'password' &&
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
                                }
                                {error &&
                                    <Tooltip title={helperText}>
                                        <ErrorOutlineIcon
                                            sx={{
                                                width: '0.8vw',
                                                marginBottom: '3.5vh',
                                                marginLeft: '1vw',
                                                marginRight: '-0.5vw',
                                                position: 'relative',
                                                color: 'red',
                                            }}
                                        />
                                    </Tooltip>
                                }
                            </InputAdornment>
                        )
                    }
                }}
            />
        </div>
    );
}

export default BaseTextField