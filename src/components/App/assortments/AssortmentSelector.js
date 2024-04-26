import { Suspense } from "react";
import { Link, useNavigate, useLoaderData, Await } from "react-router-dom";
import { useStateContext } from "contexts/ContextProvider";
import { MyImage } from "components";

function AssortmentSelector({ assortments, title, selectHandler }) {
  const navigate = useNavigate();

  return (
    <Suspense fallback={<p className="flex flex-wrap">Loading...</p>}>
        <Await resolve={assortments}>
          {assortments => 
           <div className="bg-white py-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">{title}</h1>
            <div className="shadow-lg overflow-hidden border-b border-gray-400 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">  
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Наименование</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Описание</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Создан</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Рисунок</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Иконка</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assortments.map((assortment) => (
                    <tr key={assortment.id} onClick={() => selectHandler(assortment)} className="hover:bg-gray-100 hover:cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">{assortment.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">{assortment.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">{new Date(assortment.updated).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <MyImage src={assortment.image_url} alt={assortment.title} height="h-32" width="w-32"/>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <MyImage src={assortment.icon_url} alt={assortment.title} height="h-32" width="w-32"/>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            archiveAssortment(assortment.id, !assortment.is_archived)}}
                          className="text-white bg-red-500 hover:bg-red-700 rounded px-3 py-1 mr-2"
                        >
                          {assortment.is_archived ? "Восстановить" : "В архив"}
                        </button>
                        <Link
                          onClick={(event) => event.stopPropagation()}
                          to={`/app/assortments/${assortment.id}/edit/`}
                          className="text-white bg-blue-500 hover:bg-blue-700 rounded px-3 py-1"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>}
        </Await>
      </Suspense>
   
  );
}

export default AssortmentSelector;
