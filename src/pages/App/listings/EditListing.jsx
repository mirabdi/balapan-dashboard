import React from 'react'
import { ListingForm } from 'components';
import { useRouteLoaderData } from 'react-router-dom';


const EditListing = () => {
  const data = useRouteLoaderData('listing-detail');
    return (
        <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-8 pt-5">Редактировать листинг</h1>
        <ListingForm method="put" currentListing={data.listing}/>
        </div>
    );
}

export default EditListing