import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const PosRootLayout = () => {
    const inactiveClass = 'mx-2 px-4 py-2 text-gray-600 hover:text-balapanBlue';
    const activeClass = 'mx-2 px-4 py-2 text-balapanBlue font-bold border-b-2 border-balapanBlue';
    return(
        <>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <Outlet/>
            </div>
        </>
    )
};


export default PosRootLayout