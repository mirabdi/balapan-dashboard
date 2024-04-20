import { Outlet } from 'react-router-dom';
import ProductsNavigation from '../../components/Products/ProductsNavigation';

function ProductRootLayout(){
    return(
        <>
        <ProductsNavigation/>
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Outlet/>
        </div>
        </>
    )
};

export default ProductRootLayout;