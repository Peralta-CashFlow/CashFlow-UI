import styles from './BaseEmojiPicker.module.css';

import { IconButton, Popover } from "@mui/material"
import EmojiPicker, { Theme } from 'emoji-picker-react'
import { useState } from "react";

interface BaseEmojiPickerProps {
    emoji: string;
    setEmoji: (emoji: string) => void
    fontSize?: number
    width?: number
    height?: number
}

const BaseEmojiPicker: React.FC<BaseEmojiPickerProps> = ({
    emoji, setEmoji, fontSize = 24, width = 48,
    height = 48
}) => {

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    return (
        <div className={styles.emojiContainer}>
            {emoji != '' &&
                <button className={styles.emojiRemove} onClick={() => setEmoji('')}>
                    x
                </button>
            }
            <p>Emoji</p>
            <IconButton
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                    fontSize: fontSize,
                    width: width,
                    height: height,
                    background: 'radial-gradient(circle, #888888ff 0%, #666666ff 65%)',
                    transition: 'background .2s ease',

                    '&:hover': {
                        background: 'radial-gradient(circle, #888888ff 0%, #666666ff 75%)',
                    }
                }}
                disableFocusRipple
                disableRipple
            >
                <span>{emoji}</span>
            </IconButton>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <EmojiPicker
                    onEmojiClick={(emojiData) => {
                        setEmoji(emojiData.emoji)
                        setAnchorEl(null)
                    }}
                    searchDisabled={false}
                    skinTonesDisabled
                    theme={Theme.DARK}
                />
            </Popover>
        </div>
    )
}

export default BaseEmojiPicker;