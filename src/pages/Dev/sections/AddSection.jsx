import React from 'react'
import { SectionForm } from 'components'


const AddSection = () => {
  return (
    <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-8 pt-5">Добавить Новую Страницу</h1>
        <SectionForm method="post"/>
        </div>
  )
}

export default AddSection