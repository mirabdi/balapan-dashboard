import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from 'contexts/ContextProvider';
import { Button } from 'components';
import { BASE_URL } from 'data/config';

function EmployeeGroupForm({ method = 'POST', employeeGroup }) {
  const navigate = useNavigate();
  const { showToast, currentColor, token } = useStateContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sections, setSections] = useState(employeeGroup ? employeeGroup.sections : null);
  
  if(sections === null){
    const loadSections = async () => {
      try {
        const response = await fetch(`${BASE_URL}/dashboard/admin-api/sections`, {
          headers: {
            Authorization: `Token ${token}`, 
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSections(data.response.map(section => ({ ...section, included: section.included || false })));
      } catch (error) {
        showToast({ title: 'Error!', content: error.message || 'Failed to load sections.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
      }
    };
    if(!sections){
      loadSections();
    }
  }

  const handleCheckboxChange = (sectionId) => {
    setSections(sections.map(section => 
      section.id === sectionId ? { ...section, included: !section.included } : section
    ));
  };


  const cancelHandler = () => {
    navigate('/company/employee-groups/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
  
    // Gather form fields other than sections into a simple object
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData.entries());
  
    // Create the payload with form data and sections
    const payload = {
      ...formProps,
      id: employeeGroup ? employeeGroup.id : '',
      sections: sections.map(section => ({
        sectionId: section.id,
        included: section.included
      }))
    };
  
    try {
      const response = await fetch(`${BASE_URL}/admin-api/employee-groups`, {
        method: employeeGroup ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token token', // Correct authentication scheme
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        showToast({ title: 'Error!', content: errorData.message || 'Failed to save employeeGroup.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
        setIsSubmitting(false);
        return;
      }
  
      showToast({ title: 'Success!', content: 'Employee saved successfully.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
      navigate('/company/employee-groups/');
    } catch (error) {
      showToast({ title: 'Error!', content: 'Network error or invalid response.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
      console.error('Fetch error:', error);
      setIsSubmitting(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl px-8" encType="multipart/form-data">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Название</label>
        <input
          id="name"
          type="text"
          name="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          defaultValue={employeeGroup ? employeeGroup.name : ''}
        />
      </div>


      <div className="mb-4">
        {/* Map through sections to create checkboxes */}
        {sections && sections.map((section) => (
          <div key={section.id} onClick={()=>handleCheckboxChange(section.id)} className={(section.included ? "bg-gray-200 "  : "bg-white  ") + "p-4 mb-2 shadow-md rounded-lg hover:bg-gray-300"}>
            <label className="flex items-center text-gray-800 text-md font-semibold mb-2 cursor-pointer" >
              <input
                type="checkbox"
                checked={section.included}
                onChange={() => handleCheckboxChange(section.id)}
                className="form-checkbox h-5 w-5 text-blue-600 mr-2"
              />
              {section.name}
            </label>
            <div className="ml-6">
              {/* Display sub-sections */}
              {section.sub_sections.map((subSection) => (
                <p key={subSection.url} className="text-gray-600 text-sm my-1 transition-colors duration-200">
                  {subSection.name}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>



      <div className="float-right">
        <button type="button" onClick={cancelHandler} disabled={isSubmitting} className='mr-3'>
          Cancel
        </button>
        <Button
          color="white"
          bgColor={currentColor}
          disabled={isSubmitting}
          text={isSubmitting ? 'Submitting...' : 'Save'}
          type="submit"
          borderRadius="10px"
          className="m-2"
        />
      </div>
    </form>
  );
}

export default EmployeeGroupForm;
