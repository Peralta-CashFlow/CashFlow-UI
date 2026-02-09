import styles from './CategoryModal.module.css'

import { useTranslation } from 'react-i18next'
import { Box, Modal } from "@mui/material"
import BaseTextField from '../../textfield/BaseTextField'
import BaseButton from '../../button/BaseButton'
import colors from '../../../assets/colors/colors'
import { HexColorPicker } from 'react-colorful'
import { useState } from 'react'
import BaseEmojiPicker from '../../pickers/BaseEmojiPicker'


interface CategoryModalProps {
    open: boolean,
    handleClose: () => void
}

const CategoryModal: React.FC<CategoryModalProps> = ({
    open, handleClose
}) => {

    const [color, setColor] = useState("#303030");
    const [emoji, setEmoji] = useState<string>('')

    const { t } = useTranslation();

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box className={styles.modal}>
                <h1>{t('create-categorie')}</h1>
                <form
                    className={styles.form}
                >
                    <BaseTextField
                        label={t('name')}
                        required={true}
                    />

                    <HexColorPicker color={color} onChange={setColor} />
                    <BaseTextField
                        label={t('color')}
                    />
                    <BaseEmojiPicker 
                        emoji={emoji}
                        setEmoji={setEmoji}
                        fontSize={30}
                    />
                    <BaseButton
                        text={t('save')}
                        backGroundColor={colors.lightBlueGreen}
                        type='submit'
                        fontWeight='bolder'
                    />
                </form>
            </Box>
        </Modal>
    );

}

export default CategoryModal;