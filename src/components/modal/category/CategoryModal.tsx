import styles from './CategoryModal.module.css'

import { useTranslation } from 'react-i18next'
import { Box, Modal } from "@mui/material"
import BaseTextField from '../../textfield/BaseTextField'
import BaseButton from '../../button/BaseButton'
import colors from '../../../assets/colors/colors'
import BaseEmojiPicker from '../../pickers/emoji/BaseEmojiPicker'
import { useCategoryCreationFormik } from '../../../service/category/form/CategoryCreationForm'
import { useState } from 'react'
import BaseColorPicker from '../../pickers/color/BaseColorPicker'


interface CategoryModalProps {
    open: boolean,
    handleClose: () => void,
    page: number,
    setPage: (page: number) => void
    fetchCategories: () => void
}

const CategoryModal: React.FC<CategoryModalProps> = ({
    open, handleClose, page, setPage, fetchCategories
}) => {

    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const createCategoryFormik = useCategoryCreationFormik(setLoading, handleClose, page, setPage, fetchCategories);

    return (
        <Modal
            open={open}
            onClose={() => {
                handleClose();
                createCategoryFormik.resetForm();
            }}
        >
            <Box className={styles.modal}>
                <h1>{t('create-categorie')}</h1>
                <form
                    className={styles.form}
                    onSubmit={createCategoryFormik.handleSubmit}
                >
                    <BaseTextField
                        label={t('name')}
                        fieldName='name'
                        required={true}
                        value={createCategoryFormik.values.name}
                        onBlur={createCategoryFormik.handleBlur}
                        onChange={createCategoryFormik.handleChange}
                        error={createCategoryFormik.touched.name && Boolean(createCategoryFormik.errors.name)}
                        helperText={createCategoryFormik.touched.name && createCategoryFormik.errors.name}
                    />

                    <BaseColorPicker
                        color={createCategoryFormik.values.color}
                        onChange={(newColor: string | undefined) => createCategoryFormik.setFieldValue('color', newColor)}
                        label={t('color')}
                    />

                    <BaseEmojiPicker
                        emoji={createCategoryFormik.values.icon}
                        setEmoji={(emoji: string | undefined) => createCategoryFormik.setFieldValue('icon', emoji)}
                        fontSize={30}
                    />
                    <BaseButton
                        text={t('save')}
                        backGroundColor={colors.lightBlueGreen}
                        type='submit'
                        fontWeight='bolder'
                        loading={loading}
                        spinnerSize={20}
                    />
                </form>
            </Box>
        </Modal>
    );

}

export default CategoryModal;