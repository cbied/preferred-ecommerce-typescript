import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom'
import { checkUserSession } from './store/user/user.action';

import LoadingPage from './components/loading-page/loading-page.componet';
import Navigation from './routes/navigation/navigation.component';

const Home = lazy(() => import('./routes/home/home.component'));
const Shop = lazy(() => import('./routes/shop/shop.component'));
const Checkout = lazy(() => import('./routes/checkout/checkout.component'));
const Authenication = lazy(() => import('./routes/authentication/authentication.component'));


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
        dispatch(checkUserSession())
    }, [dispatch])

  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path='/' element={ <Navigation /> }>
          <Route index element={ <Home /> } />
          <Route path='/shop/*' element={ <Shop /> } />
          <Route path='/contact' element={ <Shop /> } />
          <Route path='/auth' element={ <Authenication /> } />
          <Route path='/checkout' element={ <Checkout /> } />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App;
