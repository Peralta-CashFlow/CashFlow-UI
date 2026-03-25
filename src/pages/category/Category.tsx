import pageStyles from '../Page.module.css'
import styles from './Category.module.css'
import colors from '../../assets/colors/colors';

import { useTranslation } from 'react-i18next'
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import BaseTextField from '../../components/textfield/BaseTextField';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import BaseButton from '../../components/button/BaseButton';
import TableHeader from '../../dto/table/TableHeader';
import { useEffect, useState } from 'react';
import { CategoryResponse } from '../../dto/category/CategoryResponse';
import BaseTable from '../../components/table/BaseTable';
import CreateCategoryModal from '../../components/modal/category/create/CreateCategoryModal';
import { useToaster } from '../../components/toaster/ToasterProvider';
import { handleError } from '../../utils/error/ErrorHandler';
import categoryService from '../../service/category/CategoryService';
import { useInternationalizationStore } from '../../stores/internationalization/InternationalizationStore';
import { useUserStore } from '../../stores/user/UserStore';
import { PageResponse } from '../../dto/page/PageResponse';
import CategoryModal from '../../components/modal/category/CategoryModal';

const Category: React.FC = () => {

    const { t } = useTranslation();
    const toaster = useToaster();
    const internationalization = useInternationalizationStore();
    const user = useUserStore().user;

    const pageSize = 10;
    const [page, setPage] = useState(0);

    const [search, setSearch] = useState('');

    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<PageResponse<CategoryResponse>>(new PageResponse<CategoryResponse>([], 0, pageSize, 0, 0));
    
    const [createModalOpen, setCreateModalOpen] = useState(false);

    const [editCategoryId, setEditCategoryId] = useState(0);

    const tableHeaders: TableHeader[] = [
        { label: t('name'), key: 'name' },
        { label: t('color'), key: 'color' },
        { label: t('icon'), key: 'icon' }
    ]

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response: PageResponse<CategoryResponse> = await categoryService.listCategories(
                internationalization.language,
                user.jwt,
                page,
                pageSize,
                search
            );
            setCategories(response);
        } catch (error) {
            toaster(handleError(error), 5000, 'error', 'filled');
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchCategories();
    }, [page]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (page !== 0) {
                setPage(0);
            }
            fetchCategories();
        }, 700);

        return () => clearTimeout(handler);
    }, [search]);

    return (
        <div className={pageStyles.pageBox}>
            <div className={pageStyles.titleBox}>
                <BookmarksRoundedIcon fontSize='large' />
                <h1>{t('categories')}</h1>
            </div>
            <div className={styles.searchRow}>
                <div className={styles.searchField}>
                    <BaseTextField
                        label={t('search-categories')}
                        type='text'
                        initialAdornment={<SearchRoundedIcon />}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <BaseButton
                    text={t('create-categorie')}
                    backGroundColor={colors.lightBlueGreen}
                    type='button'
                    fontWeight='bolder'
                    icon={AddCircleOutlineRoundedIcon}
                    fontSize='15px'
                    onClick={() => setCreateModalOpen(true)}
                />
            </div>
            <div className={styles.table}>
                <BaseTable
                    headers={tableHeaders}
                    rows={categories.response}
                    rowKey={'id'}
                    width='80vw'
                    height='100%'
                    overflow='hidden'
                    noDataFoundText={t('no-category-found')}
                    headerBackGroundColor={colors.lightGray}
                    headerFontColor={colors.white}
                    headerFontSize='20px'
                    rowBackGroundColor={colors.gray}
                    rowFontColor={colors.white}
                    borderColor={colors.white}
                    loading={loading}
                    page={page}
                    changePage={(e, number) => setPage(number)}
                    rowsPerPage={pageSize}
                    pageCount={categories.totalElements}
                    rowFontSize='18px'
                    hasEdition={true}
                    editAction={(row: CategoryResponse) => setEditCategoryId(row.id)}
                />
            </div>
            <CreateCategoryModal
                open={createModalOpen}
                handleClose={() => setCreateModalOpen(false)}
                setPage={setPage}
                fetchCategories={fetchCategories}
                page={page}
            />
            <CategoryModal
                editCategoryId={editCategoryId}
                setEditCategoryId={setEditCategoryId}
                fetchCategories={fetchCategories}
            />
        </div>
    )
}

export default Category;