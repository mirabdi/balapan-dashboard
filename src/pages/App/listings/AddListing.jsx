import React from 'react'
import { ListingForm } from 'components'
const AddListing = () => {
  return (
    <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-8 pt-5">Новый Листинг</h1>
        <ListingForm method="post"/>
        </div>);
}

export default AddListing