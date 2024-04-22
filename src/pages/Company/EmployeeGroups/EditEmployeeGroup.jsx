import React from 'react'
import { useRouteLoaderData } from 'react-router-dom';
import { EmployeeGroupForm } from 'components'


const EditEmployeeGroup = () => {
  const data = useRouteLoaderData('employee-group-detail');
  return (
    <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-8 pt-5">Изменить Группу {data.employeeGroup.name}</h1>
        <EmployeeGroupForm method="post" employeeGroup={data.employeeGroup}/>
        </div>
  )
}

export default EditEmployeeGroup