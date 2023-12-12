import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutUserStart } from "../../store/user/user.action"
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { NaviagtionContainer,
         LogoContainer,
         NavLinks,
         NavLink } from './navigation.styles'

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)
    const dispatch = useDispatch()

    const handleUserSignOut = () => {
        dispatch(signOutUserStart())
    }

    return (
        <Fragment>
            <NaviagtionContainer>
                <LogoContainer to="/">
                    <div><CrwnLogo /></div>
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">
                        SHOP
                    </NavLink>
                    { currentUser ?
                    <NavLink as='span' onClick={handleUserSignOut}>
                        SIGN OUT
                    </NavLink>
                    :
                    <NavLink to="/auth">
                        SIGN IN
                    </NavLink>
                    }
                    <CartIcon />
                </NavLinks>
                    {
                        isCartOpen && <CartDropdown />
                    }
            </NaviagtionContainer>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;