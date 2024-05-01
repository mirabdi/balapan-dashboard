import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AssortmentSelector, AssortmentForm, AssortmentsList } from 'components';


const AssortmentEdit = ({assortment}) => {
  return (
    <AssortmentSelector assortments={assortment.assortments}/>
  )
}

export default AssortmentEdit