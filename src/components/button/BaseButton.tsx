import { ButtonProps, Button } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";
import CircularProgress from "@mui/material/CircularProgress";
import Box from '@mui/material/Box';

interface BaseButtonProps {
    text: string;
    variant?: ButtonProps['variant'];
    icon?: OverridableComponent<SvgIconTypeMap>
    backGroundColor?: string;
    loading?: boolean;
    color?: string;
    className?: string;
    fontSize?: string;
    fontWeight?: string;
    spinnerSize?: number;
    onClick?: () => void;
}

const BaseButton: React.FC<BaseButtonProps> = ({
    text, variant = 'contained', icon: Icon,
    backGroundColor, loading, color = 'white',
    className, fontSize, fontWeight, spinnerSize,
    onClick
}) => {
    return (
        <div className={className}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
            }}
        >
            <Button
                variant={variant}
                endIcon={Icon && !loading ? <Icon /> : null}
                onClick={onClick}
                sx={{
                    fontSize: fontSize,
                    fontWeight: fontWeight,
                    backgroundColor: backGroundColor,
                    width: '100%',
                    height: '100%',
                }}
            >
                {
                    loading ?
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%',
                            }}
                        >
                            <CircularProgress
                                size={spinnerSize}
                                sx={{
                                    color: color
                                }} />
                        </Box>
                        :
                        text
                }
            </Button>
            {loading && (
                <div
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0)',
                        cursor: 'wait',
                        zIndex: 2,
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                    }}
                />
            )}
        </div>
    )
}

export default BaseButton;