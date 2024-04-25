import React from 'react'
import { AssortmentForm } from 'components'
const AddAssortment = () => {
  return (
    <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-8 pt-5">Новый Ассортимент</h1>
        <AssortmentForm method="post"/>
        </div>
  )
}

export default AddAssortment