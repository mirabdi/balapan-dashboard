import { Link } from "react-router-dom";


const TestPage = () => {
  return (
    <>
    {/* Order List 1 */}
    <div className="mx-auto max-w-screen-xl bg-white">
            <h1 className="mt-20 mb-10 ml-5 text-2xl font-bold text-gray-900">Order Management</h1>
            <div className="bg-white py-2 px-3">
                <nav className="flex flex-wrap gap-4">
                    <Link to="/account" className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600">Account</Link>
                    <Link to="/settings" className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600">Settings</Link>
                    <Link to="/orders" className="inline-flex whitespace-nowrap border-b-2 border-transparent border-b-purple-600 py-2 px-3 text-sm font-semibold text-purple-600 transition-all duration-200 ease-in-out">Orders</Link>
                    <Link to="/sales" className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600">Sales</Link>
                    <Link to="/suppliers" className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-purple-600 hover:text-purple-600">Suppliers</Link>
                </nav>
            </div>
            <div className="w-screen bg-gray-50">
                <div className="mx-auto max-w-screen-xl px-2 py-10">
                    <div className="mt-4 w-full">
                        <div className="flex w-full flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
                            <form className="relative flex w-full max-w-2xl items-center">
                                <svg className="absolute left-2 block h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <input type="search" name="search" className="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none focus:border-b-2" placeholder="Search by Order ID, Date, Customer" />
                            </form>

                            <button type="button" className="relative mr-auto inline-flex cursor-pointer items-center rounded-full border border-gray-200 bg-white px-5 py-2 text-center text-sm font-medium text-gray-800 hover:bg-gray-100 focus:shadow sm:mr-0">
                                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                                <svg className="mr-2 h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                Filter
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
                        <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
                            <thead className="border-b lg:table-header-group">
                                <tr>
                                    <td className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">Order Date</td>
                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Order ID</td>
                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Description</td>
                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Shop</td>
                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Customer</td>
                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Dimensions</td>
                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Weight</td>
                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Price</td>
                                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Status</td>
                                </tr>
                            </thead>
                            <tbody className="bg-white lg:border-gray-300">
                                <tr>
                                    <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:px-3">07 February, 2022</td>
                                    <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:px-3">62345231143</td>
                                    <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:px-3">Desktop Computer</td>
                                    <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:px-3"><img className="h-8 w-8 overflow-hidden rounded-full border p-1" src="data:image/png;base64," alt="Shop" /></td>
                                    <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:px-3">Jane Doeson</td>
                                    <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:px-3">24 x 10 x 5 cm</td>
                                    <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:px-3">1.0 Kg</td>
                                    <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:px-3">$59.00</td>
                                    <td className="whitespace-no-wrap py-4 text-sm text-gray-600 sm:px-3">Pending</td>
                                </tr>
                                {/* Additional rows can be added here in the same format */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      

      {/* Filter  */}
      <div className="m-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
          <h2 className="text-stone-700 text-xl font-bold">Apply filters</h2>
          <p className="mt-1 text-sm">Use filters to further refine search</p>
          <form onSubmit={()=>{}} className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-stone-600 text-sm font-medium">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="raspberry juice"
                className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={0}
                onChange={()=>{}}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="manufacturer" className="text-stone-600 text-sm font-medium">Manufacturer</label>
              <input
                type="text"
                id="manufacturer"
                name="manufacturer"
                placeholder="cadbery"
                className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={0}
                onChange={()=>{}}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="date" className="text-stone-600 text-sm font-medium">Date of Entry</label>
              <input
                type="date"
                id="date"
                name="date"
                className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={0}
                onChange={()=>{}}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="status" className="text-stone-600 text-sm font-medium">Status</label>
              <select
                id="status"
                name="status"
                className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={0}
                onChange={()=>{}}
                required
              >
                <option value="">Select Status</option>
                <option value="Dispached Out">Dispached Out</option>
                <option value="In Warehouse">In Warehouse</option>
                <option value="Being Brought In">Being Brought In</option>
              </select>
            </div>

            <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
              <button type="button" onClick={()=>{}} className="active:scale-95 rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-600 outline-none focus:ring hover:opacity-90">Reset</button>
              <button type="submit" className="active:scale-95 rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90">Search</button>
            </div>
          </form>
        </div>
      </div>


        {/* Order List 2 */}
      <div className="container mx-auto p-4">
        <div className="flex flex-col">
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">Orders List</h1>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Create order
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-green-100 p-4 rounded-lg shadow-lg">
                <p className="text-green-800">Active Orders</p>
                <p className="font-bold text-lg">1,046</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg shadow-lg">
                <p className="text-yellow-800">Unfulfilled</p>
                <p className="font-bold text-lg">159</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg shadow-lg">
                <p className="text-purple-800">Pending Receipt</p>
                <p className="font-bold text-lg">624</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg shadow-lg">
                <p className="text-blue-800">Fulfilled</p>
                <p className="font-bold text-lg">263</p>
              </div>
            </div>


              <div className="mt-4 flex space-x-2 mb-4 border-b">
                <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-medium">
                    All orders
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-blue-600 hover:border-blue-600 font-medium">
                    Active
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-blue-600 hover:border-blue-600 font-medium">
                    Unpaid
                </button>
                <button className="px-4 py-2 text-gray-600 hover:text-blue-600 hover:border-blue-600 font-medium">
                    Unfulfilled
                </button>
              </div>
          </div>

          <div className="overflow-x-auto">
            <div className="py-2 align-middle inline-block min-w-full">
              <div className="shadow-lg overflow-hidden border-b border-gray-400 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Order ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Created
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Customer
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Fulfillment
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Profit
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Updated
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        121091
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Aug 1, 2019
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Harriet Santiago
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Unfulfilled
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        $604.50
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        $182.50
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Authorized
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Today
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          
        </div>
      </div>

    </div>
    </>
  );
};

export default TestPage;
