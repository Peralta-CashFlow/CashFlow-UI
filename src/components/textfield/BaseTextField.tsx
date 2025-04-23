import TextField, { TextFieldVariants } from '@mui/material/TextField';

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
    return (
        <TextField
            label={label}
            variant={variant}
            required={required}
            type={type}
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
            }}
        />
    );
}

export default BaseTextField