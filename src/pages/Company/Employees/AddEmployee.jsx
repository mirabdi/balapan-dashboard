import React from 'react'
import { EmployeeForm } from 'components'


const AddEmployee = () => {
  return (
    <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-8 pt-5">Добавить Новый Сотрудник</h1>
        <EmployeeForm method="post"/>
        </div>
  )
}

export default AddEmployee