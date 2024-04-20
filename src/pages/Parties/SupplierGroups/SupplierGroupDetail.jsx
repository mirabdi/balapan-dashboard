import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../../../data/config';
import { Header, Button } from '../../../components';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";
import { useStateContext } from '../../../contexts/ContextProvider';

const SupplierGroupDetail = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [supplierGroup, setSupplierGroup] = useState({});

  useEffect(() => {
    fetch(`${BASE_URL}/parties/admin-api/supplier-groups/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSupplierGroup(data['response']);
      });
  }, [id]);

  const handleDelete = () => {
    fetch(`${BASE_URL}/parties/admin-api/supplier-groups/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      navigate('/parties/supplier-groups');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const suppliersDataManager = new DataManager({
    url: `${BASE_URL}/parties/admin-api/supplier-groups/${id}/suppliers/list`,
    adaptor: new UrlAdaptor(),
    crossDomain: true,
  });

  return (
    <>
      <Header category="Группа поставщиков" title={supplierGroup.name || 'Loading...'}/>
      <div className="actions flex justify-between items-center m-4">
        <div>
          <Link to={`/parties/suppliers/groups/${id}/edit`}>
            <Button
              color="white"
              bgColor={currentColor}
              text="Изменить"
              borderRadius="10px"
              className="m-2"
            />
          </Link>
          <Button
            color="white"
            bgColor="red"
            text="Удалить"
            onClick={handleDelete}
            borderRadius="10px"
            className="m-2"
          />
          <Link to="..">
        <Button 
          color="white"
          bgColor="gray"
          text="Назад"
          borderRadius="10px"
          className="m-2"
        />
      </Link>
        </div>
        
        <Link to={`/parties/suppliers/groups/${id}/report`}>
          <Button
            color="white"
            bgColor={currentColor}
            text="Отчеты"
            borderRadius="10px"
            className="m-2"
          />
        </Link>
      </div>
      <h3 className='mt-5 text-xl font-bold'>Поставщики:</h3>
      <GridComponent
        id="suppliersGrid"
        dataSource={suppliersDataManager}
        allowPaging
        allowSorting
        toolbar={["Search"]}
        pageSettings={{ pageSize: 10 }}
        width="auto"
      >
        <ColumnsDirective>
          <ColumnDirective field="name" headerText="Имя" width="150" textAlign="Center" />
          <ColumnDirective field="email" headerText="Электронная почта" width="200" textAlign="Center" />
          <ColumnDirective field="phone" headerText="Телефон" width="150" textAlign="Center" />
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar]} />
      </GridComponent>
    </>
  );
};

export default SupplierGroupDetail;
