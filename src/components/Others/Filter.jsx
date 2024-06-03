import React, { useState, useEffect } from 'react';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { BASE_URL } from 'data/config';


const Filter = ({onSubmit}) => {
  const [storesData, setStoresData] = useState([]);

  useEffect(() => {
    const fetchStoresData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin-api/stores/list`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStoresData(data.map(store => store.name)); // Assuming the backend returns an array of objects with a name property
      } catch (error) {
        console.error('Error fetching stores data:', error);
      }
    };

    fetchStoresData();
  }, [BASE_URL]);

  const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const filterData = {
        dateRange: formData.getAll('dateRange'), 
        selectedStores: formData.getAll('store'), 
      };
      onSubmit(filterData);
  };

  

  return (
    <>
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateRange">
        Дата*
      </label>
      <DateRangePickerComponent id="dateRange" placeholder="Выберите даты" format="dd/MM/yyyy" name="dateRange"/>
    </div>
    
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="store">
        Магазины*
      </label>
      <MultiSelectComponent 
        id="store" 
        dataSource={storesData}
        placeholder="Выберите магазины" 
        name="store"
        fields={{ text: 'name', value: 'id' }}
      />
    </div>

    
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Отправить
      </button>
    </div>
  </form> 
    </>
  );
};

export default Filter;
