import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom'
import { checkUserSession } from './store/user/user.action';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authenication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component'
import Checkout from './routes/checkout/checkout.component';


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
        dispatch(checkUserSession())
    }, [dispatch])

  return (
    <Routes>
      <Route path='/' element={ <Navigation /> }>
        <Route index element={ <Home /> } />
        <Route path='/shop/*' element={ <Shop /> } />
        <Route path='/contact' element={ <Shop /> } />
        <Route path='/auth' element={ <Authenication /> } />
        <Route path='/checkout' element={ <Checkout /> } />
      </Route>
    </Routes>
  )
}

export default App;