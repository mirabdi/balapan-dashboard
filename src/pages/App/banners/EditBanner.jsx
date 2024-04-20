import React from 'react'
import { BannerForm } from 'components';
import { useRouteLoaderData } from 'react-router-dom';


const EditBanner = () => {
  const data = useRouteLoaderData('banner-detail');
    return (
        <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-8 pt-5">Edit Banner</h1>
        <BannerForm method="put" banner={data.banner}/>
        </div>
    );
}

export default EditBanner