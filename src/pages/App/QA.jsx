import React, { useState, useEffect } from 'react';
import { BASE_URL } from 'data/config';
import { useStateContext } from 'contexts/ContextProvider';

const QA = () => {
  const { showToast, token } = useStateContext();
  const [qas, setQas] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [updatedQas, setUpdatedQas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${BASE_URL}/crm/admin-api/qas`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          authorization: `Token ${token}`,
        },
      });
      if (!response.ok) {
        showToast({ title: 'Ошибка!', content: 'Error fetching data', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
        return;
      }
      const data = await response.json();
      setQas(data.response);
      setUpdatedQas(data.response);
    };

    fetchData();
  }, [token, showToast]);

  const handleSave = async () => {
    const url = `${BASE_URL}/crm/admin-api/qas`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ response: updatedQas }),
    });

    if (!response.ok) {
      showToast({ title: 'Ошибка!', content: 'Error saving data', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
      return;
    }

    const data = await response.json();
    setQas(data.response);
    setEditMode(false);
    showToast({ title: 'Успех!', content: 'Data updated successfully', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
        {qas.length > 0 ? (
          <div className="grid pt-8 text-left border-t border-gray-200 dark:border-gray-700 md:gap-8 md:grid-cols-1">
            {updatedQas.map((section, sIndex) => (
              <div key={sIndex} className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{section.section}</h3>
                {section.QAs.map((qa, qIndex) => (
                  <div key={qIndex} className="mb-10">
                    {editMode ? (
                      <>
                        <input
                          type="text"
                          value={qa.question}
                          onChange={(e) => {
                            const newQas = [...updatedQas];
                            newQas[sIndex].QAs[qIndex].question = e.target.value;
                            setUpdatedQas(newQas);
                          }}
                          className="flex-1 p-2 border border-gray-300 rounded mb-2 w-full"
                        />
                        <textarea
                          value={qa.answer}
                          onChange={(e) => {
                            const newQas = [...updatedQas];
                            newQas[sIndex].QAs[qIndex].answer = e.target.value;
                            setUpdatedQas(newQas);
                          }}
                          className="flex-1 p-2 border border-gray-300 rounded w-full"
                        />
                      </>
                    ) : (
                      <>
                        <h4 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
                          <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                          </svg>
                          {qa.question}
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400">{qa.answer}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 col-span-full">Loading...</p>
        )}
        <div className="mt-4">
          {editMode ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default QA;
