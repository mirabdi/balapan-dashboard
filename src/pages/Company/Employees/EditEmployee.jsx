import React from 'react'
import { useRouteLoaderData } from 'react-router-dom';
import { EmployeeForm } from 'components'


const EditEmployee = () => {
  const data = useRouteLoaderData('employee-detail');
  return (
    <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-8 pt-5">Изменить Сотрудник {data.employee.username}</h1>
        <EmployeeForm method="post" employee={data.employee}/>
        </div>
  )
}

export default EditEmployee