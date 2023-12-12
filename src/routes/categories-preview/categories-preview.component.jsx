import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/categories.selectors'
import LoadingPage from '../../components/loading-page/loading-page.componet'
import CategoryPreview from '../../components/category-preview/category-preview.component'

const CategoriesPreivew = () => {
    const categoriesMap = useSelector(selectCategoriesMap) 
    const categoriesIsLoading = useSelector(selectCategoriesIsLoading)
 
    return (
        <Fragment>
            <LoadingPage isLoading={categoriesIsLoading} />
            {Object.keys(categoriesMap).map(title => {
                return <CategoryPreview key={title} title={title} products={categoriesMap[title]}/>
            })}
        </Fragment>
    )
}

export default CategoriesPreivew;