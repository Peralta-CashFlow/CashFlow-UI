import { Box, Tooltip, Avatar, Menu, MenuItem, Typography } from "@mui/material";
import colors from "../../assets/colors/colors";
import React from "react";

interface AvatarProps {
    image: string;
    width: number;
    height: number;
    fallback: string;
    tooltip: string;
    cursor?: string;
    options?: string[];
}

const BaseAvatar: React.FC<AvatarProps> = ({
    image, width, height, fallback,
    tooltip, cursor, options = []
}) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={tooltip}>
                <Avatar
                    alt={tooltip}
                    src={image}
                    sx={{
                        width: width,
                        height: height,
                        cursor: cursor,
                        bgcolor: colors.lightBlueGreen,
                        boxShadow: '0 0 15px 2px rgba(95, 95, 95, 0.3)'
                    }}
                    onClick={options.length > 0 ? handleOpenMenu : undefined}
                >
                    {fallback}
                </Avatar>
            </Tooltip>
            <Menu
                sx={{ mt: '55px' }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: colors.lightGray,
                        }
                    }
                }}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option}
                        onClick={handleCloseMenu}
                        sx={{
                            backgroundColor: colors.lightGray,
                            '&:hover': {
                                backgroundColor: colors.gray
                            }
                        }}
                    >
                        <Typography sx={{ textAlign: 'center', color: 'white' }}>{option}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}

export default BaseAvatar;