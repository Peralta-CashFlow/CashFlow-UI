import styles from './EditCategoryModal.module.css'
import colors from '../../../../assets/colors/colors';

import { Box, Modal } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useCategoryEditionFormik } from "../../../../service/category/form/CategoryEditionForm";
import CategoryService from "../../../../service/category/CategoryService";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../../../../stores/user/UserStore";
import { useInternationalizationStore } from "../../../../stores/internationalization/InternationalizationStore";
import BaseTextField from "../../../textfield/BaseTextField";
import BaseColorPicker from "../../../pickers/color/BaseColorPicker";
import BaseEmojiPicker from "../../../pickers/emoji/BaseEmojiPicker";
import BaseTable from "../../../table/BaseTable";
import TableHeader from "../../../../dto/table/TableHeader";

interface EditCategoryModalProps {
    editCategoryId: number,
    setEditCategoryId: Dispatch<SetStateAction<number>>
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
    editCategoryId, setEditCategoryId
}) => {

    const [loading, setLoading] = useState(false);

    const categorySelected = () => {
        return editCategoryId != 0;
    }

    const editCategoryFormik = useCategoryEditionFormik(setLoading);
    const language = useInternationalizationStore().language;
    const user = useUserStore().user;
    const { t } = useTranslation();

    const tableHeaders: TableHeader[] = [
        { label: 'Tags', key: 'name' }
    ]

    let isTagListFull = editCategoryFormik.values.tags.length < 10;

    const addTag = () => {
        if (isTagListFull) {
            editCategoryFormik.setFieldValue('tags', [
                ...editCategoryFormik.values.tags,
                {
                    id: undefined,
                    name: ''
                }
            ])
        }
    }

    useEffect(() => {
        const fetchCategory = async () => {
            if (categorySelected()) {
                editCategoryFormik.setValues(
                    await CategoryService.getCategory(language, user.jwt, editCategoryId)
                );
            }
        }

        fetchCategory();
    }, [editCategoryId]);

    return (
        <Modal
            open={categorySelected()}
            onClose={() => setEditCategoryId(0)}
        >
            <Box
                className={styles.modal}
            >
                <div className={styles.header}>
                    <h1>{t('edit-category')}</h1>
                </div>
                <form
                    onSubmit={editCategoryFormik.handleSubmit}
                >
                    <div className={styles.container}>
                        <div className={styles.left}>
                            <div className={styles.name}>
                                <BaseTextField
                                    label={t('name')}
                                    fieldName='name'
                                    required={true}
                                    value={editCategoryFormik.values.name}
                                    onBlur={editCategoryFormik.handleBlur}
                                    onChange={editCategoryFormik.handleChange}
                                    error={editCategoryFormik.touched.name && Boolean(editCategoryFormik.errors.name)}
                                    helperText={editCategoryFormik.touched.name && editCategoryFormik.errors.name}
                                />
                            </div>

                            <div className={styles.icon}>
                                <BaseEmojiPicker
                                    emoji={editCategoryFormik.values.icon}
                                    setEmoji={(emoji: string | undefined) => editCategoryFormik.setFieldValue('icon', emoji)}
                                    fontSize={30}
                                />
                            </div>

                            <BaseColorPicker
                                color={editCategoryFormik.values.color}
                                onChange={(newColor: string | undefined) => editCategoryFormik.setFieldValue('color', newColor)}
                                label={t('color')}
                                height='130px'
                                width='130px'
                            />
                        </div>

                        <div className={styles.right}>
                            <div className={styles.tableWrapper}>
                                <BaseTable
                                    headers={tableHeaders}
                                    rows={editCategoryFormik.values.tags}
                                    rowKey={'id'}
                                    width='70%'
                                    height='100%'
                                    overflow='auto'
                                    noDataFoundText={t('category-without-tags')}
                                    pagination={false}
                                    headerBackGroundColor={colors.gray}
                                    headerFontColor={colors.white}
                                    headerFontSize='20px'
                                    rowBackGroundColor={colors.lighterGray}
                                    rowFontColor={colors.white}
                                    rowFontSize='15px'
                                    borderColor='black'
                                    paperBackground={colors.lightGray}
                                    emptyFontSize='9px'
                                    canAddRow={isTagListFull}
                                    addRowAction={addTag}
                                    editableFields={[
                                        {
                                            fieldName: 'name',
                                            fieldMaxLength: 20,
                                            onChange: (e, rowIndex) => {
                                                editCategoryFormik.setFieldValue(
                                                    `tags[${rowIndex}].name`,
                                                    e.target.value
                                                );
                                            },
                                            helperText: t('tag-name-required')
                                        }
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </Box>
        </Modal>
    )
}

export default EditCategoryModal;