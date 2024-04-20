const TestPage = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
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
  );
};

export default TestPage;
