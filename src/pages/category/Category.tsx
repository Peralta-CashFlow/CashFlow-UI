import pageStyles from '../Page.module.css'
import styles from './Category.module.css'
import colors from '../../assets/colors/colors';

import { useTranslation } from 'react-i18next'
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import BaseTextField from '../../components/textfield/BaseTextField';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import BaseButton from '../../components/button/BaseButton';

const Category: React.FC = () => {

    const { t } = useTranslation();

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
                    />
                </div>
                <BaseButton
                    text={t('create-categorie')}
                    backGroundColor={colors.lightBlueGreen}
                    type='button'
                    fontWeight='bolder'
                    icon={AddCircleOutlineRoundedIcon}
                    fontSize='15px'
                />
            </div>
        </div>
    )
}

export default Category;