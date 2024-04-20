import React, {useState } from 'react'
import {Header, Button} from '../../../components'
import { BASE_URL } from '../../../data/config';
import { useNavigate, Link } from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';

const AddSupplierGroup = () => {

  const [supplierGroupName, setSupplierGroupName] = useState('');
  const {currentColor} = useStateContext();

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: supplierGroupName
    }
    fetch(`${BASE_URL}/parties/admin-api/supplier-groups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
      console.log('Success:', data);
    }).catch((error) => {
      console.error('Error:', error);
    });
    navigate('/parties/suppliers/groups/')
  };

  const handleChange = (event) => {
    setSupplierGroupName(event.target.value);
  };

  return (
    <>
    <Header category="Страница" title="Добавить Группу поставщиков" />
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Добавить Группу поставщиков</h2>
      <form onSubmit={handleSubmit}>
        {/* SupplierGroup Name Input */}
        <div className="mb-4">
          <label htmlFor="supplierGroupName" className="block text-sm font-medium text-gray-700">Наименование</label>
          <input 
              type="text" 
              id="supplierGroupName" 
              name="supplierGroupName" 
              value={supplierGroupName} 
              onChange={handleChange} 
              style={{ color: currentColor, borderWidth: '1px', borderStyle: 'solid', borderColor: `${currentColor} !important`, borderRadius: '10px' }}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 hover:border-current"
              required
          />
        </div>
        {/* Submit Button */}
        <div>
        <Button
            color="white"
            bgColor={currentColor}
            text="Отправить"
            type="submit"
            borderRadius="10px"
            className="m-2"
          />
        <Link to="../">
          <Button
            color="white"
            bgColor="gray"
            text="Отмена"
            borderRadius="10px"
          />
        </Link>
        </div>
      </form>
    </div>
    </>
  ) 
}

export default AddSupplierGroup
