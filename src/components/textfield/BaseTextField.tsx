import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { TextFieldVariants } from '@mui/material/TextField';

interface BaseTextFieldProps {
    label: string;
    color?: string;
    variant?: TextFieldVariants;
    required?: boolean;
    width?: string;
    type?: string;
    fontSize?: string;
    marginBottom?: string;
}

const BaseTextField: React.FC<BaseTextFieldProps> = ({
    label, color = 'white', variant = 'outlined', 
    required = false, width = '100%', type = 'text',
    fontSize = '1.2rem', marginBottom = '5%'
}) => {
    return (
        <Box
            component="form"
            autoComplete="off"
            sx={{ 
                width: width,
                display: 'flex',
                justifyContent: 'center',
                marginBottom: marginBottom,
            }}
        >
            <TextField
                label={label}
                variant={variant}
                required={required}
                type={type}
                sx={{
                    width: width,
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
        </Box>
    );
}

export default BaseTextField