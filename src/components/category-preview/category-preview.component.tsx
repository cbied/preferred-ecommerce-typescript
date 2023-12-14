import ProductCard from '../product-card/product-card.component';
import { Link } from 'react-router-dom';
import { CategoryPreviewContainer,
         Title, Preview, ViewMore } from './category-preview.styles';
import { CategoryItem } from '../../store/categories/categories.types'


type CategoryPreviewProps = {
    title: string,
    products: CategoryItem[]
}

const CategoryPreview = ({ title, products }: CategoryPreviewProps) => {

    return(
        <CategoryPreviewContainer>
            
                <h2>
                    <Title>
                        <Link to={title}>{ title.toUpperCase() }</Link>
                    </Title>
                </h2>
            
            <Preview>
                {
                    products
                    .slice(0,4)
                    .map((product) => <ProductCard key={product.id} product={product}/>)
                }
            </Preview>
            <ViewMore>
                <Link to={title}>View More</Link>
            </ViewMore>
        </CategoryPreviewContainer>
    )
}


export default CategoryPreview