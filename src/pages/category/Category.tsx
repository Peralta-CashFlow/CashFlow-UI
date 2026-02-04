import pageStyles from '../Page.module.css'

import { useTranslation } from 'react-i18next'
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded';

const Category: React.FC = () => {

    const { t } = useTranslation();

    return (
        <div className={pageStyles.pageBox}>
            <div className={pageStyles.titleBox}>
                <BookmarksRoundedIcon fontSize='large' />
                <h1>{t('categories')}</h1>
            </div>
        </div>
    )
}

export default Category;