import React from 'react'
import { BannerForm } from '../../../components'


const AddBanner = () => {
  return (
    
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-8 pt-5">New Banner</h1>
        <BannerForm method="post"/>
        </div>);

}

export default AddBanner