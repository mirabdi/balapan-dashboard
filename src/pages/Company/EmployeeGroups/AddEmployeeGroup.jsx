import React from 'react'
import { EmployeeGroupForm } from 'components'


const AddEmployeeGroup = () => {
  return (
    <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-8 pt-5">Добавить Группу Сотрудников</h1>
        <EmployeeGroupForm method="post"/>
        </div>
  )
}

export default AddEmployeeGroup