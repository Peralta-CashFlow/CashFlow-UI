import { FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface BaseRadioGroupProps {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    options: Record<string, string>;
    disabled?: boolean;
    color?: string;
    direction?: 'row' | 'column';
    optionColor?: string;
    labelFontSize?: string;
}

const BaseRadioGroup: React.FC<BaseRadioGroupProps> = ({
    label, value, onChange, options, disabled = false, color = 'white',
    direction = 'row', optionColor = 'white', labelFontSize
}) => {
    return (
        <div>
            <FormLabel
                sx={{
                    color: color,
                    fontSize: labelFontSize
                }}>
                {label}
            </FormLabel>
            <RadioGroup
                row={direction === 'row'}
                value={value}
                onChange={onChange}
            >
                {
                    Object.entries(options).map(([optionValue, optionLabel]) => (
                        <FormControlLabel
                            value={optionValue}
                            control={
                                <Radio sx={{
                                    color: optionColor,
                                    '&.Mui-checked': {
                                        color: optionColor
                                    }
                                }} />
                            }
                            label={optionLabel}
                            disabled={disabled}
                            key={optionLabel}
                            color={color}
                            sx={{
                                '&.Mui-disabled': {
                                    color: color
                                },
                                '&.Mui-disabled .MuiFormControlLabel-label': {
                                    color: color
                                }
                            }}
                        />
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default BaseRadioGroup;