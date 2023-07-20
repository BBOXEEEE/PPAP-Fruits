import {
    BrowserRouter,
    Route,
    Router,
    Routes,
    useLocation,
} from 'react-router-dom';
import Header from './components/Header';

import Footer from './components/Footer';
import styled from 'styled-components';
import Home from './page/Home';
import Register from './page/Register';
import Login from './page/Login';
import NotFound from './page/NotFound';
import StorePoint from './page/StorePoint';
import Information from './page/Information';
import ProductManagement from './page/Management/ProductManagement';
import OrderManagement from './page/Management/OrderManagement';
import SalesManagement from './page/Management/SalesManagement';
import TestManagement from './page/Management/Test';
import ShopManagement from './page/Management/ShopManagement';
import PurchaseManagement from './page/Management/PurchaseManagement';
import Slider from './page/Slider';
import ConsumptionManagement from './page/Management/ConsumptionManagement';
import PurchaseDetails from './page/PurchaseDetails';
import Mypage from './page/Mypage';

const Wrapper = styled.div``;

export default function App() {
    return (
        <Wrapper>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Slider />}></Route>
                </Routes>

                <Header />
                <Routes>
                    <Route path='/home' element={<Home />}></Route>
                    <Route path='/register' element={<Register />}></Route>
                    <Route path='/login' element={<Login />}></Route>

                    <Route
                        path='/information/:id'
                        element={<Information />}
                    ></Route>
                    <Route
                        path='/information/:id/:pid'
                        element={<PurchaseDetails />}
                    ></Route>

                    <Route path='/storepoint' element={<StorePoint />}></Route>

                    <Route
                        path='/manage/sales'
                        element={<SalesManagement />}
                    ></Route>
                    <Route
                        path='/manage/order'
                        element={<OrderManagement />}
                    ></Route>
                    <Route
                        path='/manage/product'
                        element={<ProductManagement />}
                    ></Route>
                    <Route
                        path='/manage/purchase'
                        element={<PurchaseManagement />}
                    ></Route>
                    <Route
                        path='/manage/ptest'
                        element={<TestManagement />}
                    ></Route>
                    <Route
                        path='/manage/add-shop'
                        element={<ShopManagement />}
                    ></Route>
                    <Route
                        path='/manage/consumption'
                        element={<ConsumptionManagement />}
                    ></Route>

                    <Route path='/mypage' element={<Mypage />}></Route>

                    {/* <Route path='*' element={<NotFound />}></Route> */}
                </Routes>
            </BrowserRouter>
        </Wrapper>
    );
}
