import React, { useState, useEffect } from 'react';
import { BASE_URL } from 'data/config';
import { useStateContext } from 'contexts/ContextProvider';

const ContactLinks = () => {
  const { showToast, token } = useStateContext();
  const [contactLinks, setContactLinks] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [updatedContactLinks, setUpdatedContactLinks] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const url = `${BASE_URL}/crm/admin-api/contact-links`;
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
      setContactLinks(data.response);
      setUpdatedContactLinks(data.response);
    };

    fetchData();
  }, [token, showToast]);

  const handleSave = async () => {
    const url = `${BASE_URL}/crm/admin-api/contact-links`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ response: updatedContactLinks }),
    });

    if (!response.ok) {
      showToast({ title: 'Ошибка!', content: 'Error saving data', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
      return;
    }

    const data = await response.json();
    setContactLinks(data.response);
    setEditMode(false);
    showToast({ title: 'Успех!', content: 'Data updated successfully', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Links</h1>
      <div className="space-y-4">
        {Object.keys(contactLinks).map((key) => (
          <div key={key} className="flex items-center space-x-4">
            <label className="w-24 capitalize">{key}:</label>
            {editMode ? (
              <input
                type="text"
                value={updatedContactLinks[key]}
                onChange={(e) => setUpdatedContactLinks({ ...updatedContactLinks, [key]: e.target.value })}
                className="flex-1 p-2 border border-gray-300 rounded"
              />
            ) : (
              <span className="flex-1">{contactLinks[key]}</span>
            )}
          </div>
        ))}
      </div>
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
  );
};

export default ContactLinks;
