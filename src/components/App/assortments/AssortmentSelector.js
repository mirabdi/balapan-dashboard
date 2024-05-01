import { Suspense, useEffect, useState } from "react";
import { Link, useNavigate, useLoaderData, Await } from "react-router-dom";
import { useStateContext } from "contexts/ContextProvider";
import { MyImage } from "components";
import { Button } from 'components';
import { BASE_URL } from "data/config";


function AssortmentSelector({ parent_assortment, title, afterAction }) {
  const [assortments, setAssortments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast, token, currentColor } = useStateContext();

  const handleCheckboxChange = (assortmentId) => {
    setAssortments(prev => prev.map(item => 
      item.id === assortmentId ? { ...item, included: !item.included } : item
    ));
  };

  const localCancelHandler = () => {
    const result = window.confirm('Вы уверены, что хотите отменить изменения? Все несохраненные данные будут потеряны.');
    if(result){
      afterAction();
    }
  }
  useEffect(() => {
    const fetchAssortments = async () => {
      try {
        let url = BASE_URL + "/crm/admin-api/assortments?parent_id=" + parent_assortment.id;
        const response = await fetch(url,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          });
        const data = await response.json();
        setAssortments(data.response);
      } catch (error) {
        showToast({ title: 'Error!', content: error || 'Something.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons'});
      }
    }
    fetchAssortments();
  }, [parent_assortment]);

  const saveChanges = async () => {
    const result = window.confirm('Вы уверены, что хотите сохранить изменения?');
    if (!result) return;
    try {
      let url = `${BASE_URL}/crm/admin-api/assortments/${parent_assortment.id}/edit`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ assortments: assortments })
      });
      if (response.ok) {
        showToast({ title: 'Success!', content: 'All changes saved successfully.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
        afterAction();
      } else {
        const errorData = await response.json();
        showToast({ title: 'Failed to save!', content: errorData.message, cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
      }
    } catch (error) {
      showToast({ title: 'Error!', content: error.toString(), cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
    }
  };
  return (
    <Suspense fallback={<p className="flex flex-wrap">Loading...</p>}>
           <div className="bg-white py-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">{title}</h1>
            <div className="shadow-lg overflow-hidden border-b border-gray-400 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">  
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">CHECKBOX</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Наименование</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ИКОНКА</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assortments.map((assortment) => (
                    <tr 
                      key={assortment.id} 
                      onClick={() => handleCheckboxChange(assortment.id)} 
                      className={`${
                        assortment.included ? 'bg-blue-100' : 'bg-white'
                      } hover:bg-blue-200 cursor-pointer transition duration-150 ease-in-out select-none`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500">
                        <input 
                          type="checkbox" 
                          checked={assortment.included} 
                          onChange={(event) =>{
                            event.stopPropagation();
                            handleCheckboxChange(assortment.id);
                          }}
                          className="checked:bg-blue-500 checked:border-transparent focus:outline-none"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-md text-gray-700">
                        {assortment.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-md text-gray-700">
                        <MyImage src={assortment.icon_url} alt={assortment.title}  height="h-32" width="w-32"/>

                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
            <div className="float-right">
              <button type="button" onClick={localCancelHandler} disabled={isSubmitting} className='mr-3'>
                Cancel
              </button>
              <Button
                color="white"
                bgColor={currentColor}
                disabled={isSubmitting}
                text={isSubmitting ? 'Submitting...' : 'Save'}
                type="button"
                onClick={saveChanges}
                borderRadius="10px"
                className="m-2"
              />
            </div>
          </div>
      </Suspense>
   
  );
}

export default AssortmentSelector;
