import { Avatar } from "@mui/material";
import colors from "../../assets/colors/colors";

interface AvatarProps {
    image: string;
    width: number;
    height: number;
    fallback: string;
    tooltip: string;
}

const EditableAvatar: React.FC<AvatarProps> = ({
    image, width, height, fallback, tooltip
}) => {

    return (
        <Avatar
            src={`data:image/png;base64,${image}`}
            sx={{ 
                width: width, 
                height: height,
                bgcolor: colors.lightBlueGreen,
                boxShadow: '0 0 15px 2px rgba(95, 95, 95, 0.3)'
            }}
            alt={tooltip}
        >
            {fallback}
        </Avatar>
    )

}

export default EditableAvatar;