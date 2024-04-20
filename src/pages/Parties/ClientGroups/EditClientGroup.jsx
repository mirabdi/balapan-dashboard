import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header, Button } from '../../../components';
import { BASE_URL } from '../../../data/config';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { useStateContext } from '../../../contexts/ContextProvider';

const EditClientGroup = () => {
  const { currentColor } = useStateContext();
  const { id } = useParams();
  const uploader = useRef(null);
  const navigate = useNavigate();
  
  const actionData = [
    { id: 'add', name: 'Добавить' },
    { id: 'remove', name: 'Удалить' }
  ];
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Retrieve files from the UploaderComponent
    const files = uploader.current.getFilesData();
    const selectedAction = document.getElementById("action").ej2_instances[0].value;

    const formData = new FormData();
    if (files.length > 0) {
      formData.append('file', files[0].rawFile); // Append the first selected file
    }
    formData.append('action', selectedAction);

    try {
      const response = await fetch(`${BASE_URL}/parties/admin-api/client-groups/${id}/edit`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Operation successful');
        navigate(`/parties/clients/groups/${id}`);
      } else {
        alert('Failed to perform the operation. Please try again.');
      }
    } catch (error) {
      console.error('Error during the operation:', error);
      alert('Error during the operation. Please check the console for more information.');
    }
  };

  return (
    <>
      <Header category="Страница" title="Изменить группу клиентов" />
      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-3">
          <label className="form-label">Загрузить Excel файл</label>
          <UploaderComponent 
            ref={uploader}
            allowedExtensions=".xlsx, .xls"
            multiple={false}
            showFileList={true}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Выберите действие</label>
          <DropDownListComponent 
            id="action" 
            dataSource={actionData} 
            fields={{ text: 'name', value: 'id' }} 
            placeholder="Выберите действие"
          />
        </div>
        <Button
          color="white"
          bgColor="gray"
          text="Отмена"
          onClick={() => navigate(-1)}
          borderRadius="10px"
          className="m-2"
          />
        <Button
          color="white"
          bgColor={currentColor}
          text="Отправить"
          type="submit"
          borderRadius="10px"
          className="m-2"
          />
      </form>
    </>
  );
};

export default EditClientGroup;
