import React from 'react'
import { AssortmentForm } from 'components'
const AddAssortment = () => {
  return (
    <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-8 pt-5">Создать Новый Ассортимент</h1>
        <AssortmentForm/>
        </div>
  )
}

export default AddAssortment