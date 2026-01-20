import { Avatar, Box } from "@mui/material";
import colors from "../../assets/colors/colors";
import { CameraAlt } from "@mui/icons-material";
import ClearIcon from '@mui/icons-material/Clear';
import { useRef } from "react";

interface AvatarProps {
    image: string | null;
    width: number;
    height: number;
    fallback: string;
    tooltip: string;
    editing: boolean;
    onChange: (base64: string | null) => void;
}

const EditableAvatar: React.FC<AvatarProps> = ({
    image, width, height, fallback, tooltip, editing, onChange
}) => {

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (editing) {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            const base64 = result.split(",")[1];
            onChange(base64);
        };

        reader.readAsDataURL(file);
    };

    return (
        <>
            <Box
                onClick={handleClick}
                sx={{
                    position: 'relative',
                    width,
                    height,
                    cursor: editing ? 'pointer' : 'default',

                    ...(editing && {
                        '&:hover .avatar-img': {
                            filter: 'blur(2px) brightness(0.75)',
                        },
                        '&:hover .avatar-overlay': {
                            opacity: 1,
                        }
                    })
                }}
            >
                <Avatar
                    src={`data:image/png;base64,${image}`}
                    alt={tooltip}
                    className="avatar-img"
                    sx={{
                        width,
                        height,
                        bgcolor: colors.lightBlueGreen,
                        boxShadow: '0 0 15px 2px rgba(95, 95, 95, 0.3)',
                        transition: 'filter 0.3s ease'
                    }}
                >
                    {fallback}
                </Avatar>

                <Box
                    className="avatar-overlay"
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0, 0, 0, 0.35)',
                        color: '#fff',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        pointerEvents: 'none'
                    }}
                >
                    <CameraAlt fontSize="large" />
                </Box>

                {image && editing && (
                    <ClearIcon
                        onClick={(e) => {
                            e.stopPropagation();
                            onChange(null);
                        }}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            cursor: 'pointer',
                            borderRadius: '50%',
                            padding: '2px',
                            fontSize: '20px'
                        }}
                    />
                )}

            </Box>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/png"
                hidden
                onChange={handleFileChange}
            />
        </>
    );
};

export default EditableAvatar;