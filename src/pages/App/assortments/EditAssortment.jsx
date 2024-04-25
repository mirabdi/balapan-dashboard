import React from 'react'
import { AssortmentForm } from 'components';
import { useRouteLoaderData } from 'react-router-dom';


const EditAssortment = () => {
  const data = useRouteLoaderData('assortment-detail');
    return (
        <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-8 pt-5">Edit Assortment</h1>
        <AssortmentForm method="put" assortment={data.assortment}/>
        </div>
    );
}

export default EditAssortment