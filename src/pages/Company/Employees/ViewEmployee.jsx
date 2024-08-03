import React from 'react'
import { useRouteLoaderData } from 'react-router-dom';
import { EmployeeItem } from 'components'


const ViewEmployee = () => {
  const data = useRouteLoaderData('employee-detail');
  return (
    <EmployeeItem employee={data.employee} />
    
  )
}

export default ViewEmployee