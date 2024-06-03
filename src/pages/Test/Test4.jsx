import React from 'react';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';


const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
];

const Test4 = () => {
  return (
    <div className="flex flex-col">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
        <form>
          <div className="relative mb-10 w-full flex items-center justify-between rounded-md">
            <svg className="absolute left-2 block h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="name" name="search" className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pr-40 pl-12 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder="Search by name, type, manufacturer, etc" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-medium text-stone-600">Name</label>
              <input type="text" id="name" placeholder="Raspberry juice" className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="manufacturer" className="text-sm font-medium text-stone-600">Manufacturer</label>
              <select id="manufacturer" className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                <option>Cadberry</option>
                <option>Starbucks</option>
                <option>Hilti</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="date" className="text-sm font-medium text-stone-600">Date of Entry</label>
              <input type="date" id="date" className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="status" className="text-sm font-medium text-stone-600">Status</label>
              <select id="status" className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                <option>Dispached Out</option>
                <option>In Warehouse</option>
                <option>Being Brought In</option>
              </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor="multiSelect" className="text-sm font-medium text-stone-600">Multi Select</label>
                <div className="mt-2">
                    <MultiSelectComponent
                    id="multiSelect"
                    placeholder="Select options"
                    dataSource={['Option 1', 'Option 2', 'Option 3']}
                    className="block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="dateRange" className="text-sm font-medium text-stone-600">Date Range</label>
              <div className="mt-2">
                <DateRangePickerComponent
                  id="dateRange"
                  placeholder="Select a date range"
                  className="block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
            </div>


          </div>

          <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
            <button type="button" className="rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-700 outline-none hover:opacity-80 focus:ring">Reset</button>
            <button type="submit" className="rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none hover:opacity-80 focus:ring">Search</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Test4;
