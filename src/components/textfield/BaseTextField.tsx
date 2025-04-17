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
}

const BaseTextField: React.FC<BaseTextFieldProps> = ({
    label, color = 'white', variant = 'outlined',
    required, type = 'text', className, onChange,
    fontSize
}) => {
    return (
        <TextField
            label={label}
            variant={variant}
            required={required}
            type={type}
            className={className}
            onChange={onChange}
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