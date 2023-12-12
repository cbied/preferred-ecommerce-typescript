import { BackgroungImage,
         CategoryBodyContainer,
         CategoryItemContainer} from './category-item.styles';

const CategoryItem = ({ categoryProduct }) => {
    const { title, imageUrl } = categoryProduct
    const categoryLink = `/shop/${title.toLowerCase()}`
    return(
        <CategoryItemContainer>
            <BackgroungImage $imageUrl={imageUrl} />
            <CategoryBodyContainer to={categoryLink}>
                <h2>{ title }</h2>
                <p>Shop Now</p>
            </CategoryBodyContainer>
        </CategoryItemContainer>
    )
}

export default CategoryItem