import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useStateContext } from "contexts/ContextProvider";
import { BASE_URL } from "data/config";

const StoresList = ({ stores, title, selectHandler }) => {
  const formatDate = (date) => new Date(date).toLocaleDateString();

  return (
    <div className="overflow-x-auto">
      <div className="py-2 align-middle inline-block min-w-full">
        <div className="shadow-lg overflow-hidden border-b border-gray-400 sm:rounded-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">{title}</h1>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Название
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Адрес
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Создан
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Обновлен
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stores.map((store) => (
                <tr key={store.id} onClick={() => selectHandler(store)} className="hover:bg-gray-100 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {store.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {store.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {store.address ? store.address.name: " - "}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(store.created)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(store.updated)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link
                      onClick={(event) => event.stopPropagation()}
                      to={`/company/stores/${store.id}/edit/`}
                      className="text-white bg-blue-500 hover:bg-blue-700 rounded px-3 py-1"
                    >
                      Изменить
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StoresList;
