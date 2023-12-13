import CategoryItem from '../category-item/category-item.component'
import categoryData from '../../assets/categories.json';
import { DirectoryContainer } from './directory.styles';

const Directory = () => {
    return (
        <DirectoryContainer>
      {
        categoryData.categories.map(categoryProduct => {
          return (
            <CategoryItem categoryProduct={categoryProduct} key={categoryProduct.id}/>
          )
        })
      }
    </DirectoryContainer>
    )
}

export default Directory