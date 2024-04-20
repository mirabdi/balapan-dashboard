import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header, Button } from '../../../components';
import { BASE_URL } from 'data/config';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { useStateContext } from 'contexts/ContextProvider';


const EditProductGroup = () => {
  const { currentColor } = useStateContext();
  const { id } = useParams();
  const uploader = useRef(null);
  const navigate = useNavigate();
  const typeData = [
    { id: 'product', name: 'Товар' },
    { id: 'category', name: 'Категория' }
  ];
  
  const actionData = [
    { id: 'add', name: 'Добавить' },
    { id: 'remove', name: 'Удалить' }
  ];
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Retrieve files from the UploaderComponent
    const files = uploader.current.getFilesData();
    const selectedType = document.getElementById("type").ej2_instances[0].value;

    const formData = new FormData();
    if (files.length > 0) {
      formData.append('file', files[0].rawFile); // Append the first selected file
    }
    formData.append('type', selectedType);

    try {
      const response = await fetch(`${BASE_URL}/products/admin-api/product-groups/${id}/edit`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Upload successful');
        navigate(`/products/groups/${id}`);
      } else {
        alert('Failed to upload the file. Please try again.');
      }
    } catch (error) {
      console.error('Error during file upload:', error);
      alert('Error during file upload. Please check the console for more information.');
    }
  };

  return (
    <>
  <Header category="Страница" title="Изменить группу товаров" />
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
      <label className="form-label">Выберите тип</label>
      <DropDownListComponent 
        id="type" 
        dataSource={typeData} 
        fields={{ text: 'name', value: 'id' }} 
        placeholder="Выберите тип"
      />
    </div>
    <div className="mb-3">
      <label className="form-label">Выберите действие</label>
      <DropDownListComponent 
        id="type" 
        dataSource={actionData} 
        fields={{ text: 'name', value: 'id' }} 
        placeholder="Выберите действие"
      />
    </div>
    <Button
      color="white"
      bgColor="gray"
      text="Отмена"
      onClick={() => window.history.back()}
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

export default EditProductGroup;
