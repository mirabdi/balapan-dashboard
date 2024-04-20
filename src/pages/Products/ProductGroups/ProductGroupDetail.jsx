import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from 'data/config';
import {Header, Button} from '../../../components'
import { DataManager, Query, UrlAdaptor } from "@syncfusion/ej2-data";


import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { useStateContext } from 'contexts/ContextProvider';


const ProductGroupDetail = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [productGroup, setProductGroup] = useState({});
  useEffect(() => {
    fetch(`${BASE_URL}/products/admin-api/product-groups/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data['response']);
        setProductGroup(data['response']);
      });
  }, [id]);

  
  const handleDelete = () => {
    fetch(`${BASE_URL}/products/admin-api/product-groups/${id}`, {
      method: 'DELETE',
    }).then(response => response.json()).then(data => {
      console.log('Success:', data);
    }).catch((error) => {
      console.error('Error:', error);
    });
    navigate('/products/groups')
  };


  const productsDataManager = new DataManager({
    url: `${BASE_URL}/products/admin-api/product-groups/${id}/products/list`,
    adaptor: new UrlAdaptor(),
    crossDomain: true,
  });

  const categoriesDataManager = new DataManager({
    url: `${BASE_URL}/products/admin-api/product-groups/${id}/categories/list`,
    adaptor: new UrlAdaptor(),
    crossDomain: true,
  });

  return (
    <>
      <Header category="Группа товаров" title={productGroup.name}/>
      <div className="actions flex justify-between items-center m-4">
      <div>
      <Link to="edit">
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
            type="button"
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
      <Link to="report">
        <Button
          color="white"
          bgColor={currentColor}
          text="Отчеты"
          borderRadius="10px"
          className="m-2"
          />
      </Link>
      </div>
      <h3 className='mt-8 text-xl font-bold'>Товары:</h3>
      <GridComponent
              id="gridcomp"
              dataSource={productsDataManager}
              allowPaging
              allowSorting
              toolbar={["Search"]}
              pageSettings={{ pageSize: 10 }}
              width="auto"
            >
             <ColumnsDirective>
             <ColumnDirective 
                headerText="Наименование"
                field="name" 
                width="150" 
                textAlign="Center" 
              />
              <ColumnDirective 
                field="barcode" 
                headerText="Штрих-код" 
                width="100" 
                textAlign="Center" 
              />
              <ColumnDirective 
                field="updated" 
                headerText="Обновлено" 
                width="135" 
                format="yMd" 
                textAlign="Center" 
              />
              <ColumnDirective 
                field="price" 
                headerText="Цена" 
                width="120" 
                textAlign="Center" 
              />
              <ColumnDirective 
                field="purchase" 
                headerText="Себестоимость" 
                width="125" 
                textAlign="Center" 
              />
            </ColumnsDirective>
              <Inject services={[Page, Search, Toolbar]} />
      </GridComponent>

      <h3 className='mt-8 text-xl font-bold'>Категории:</h3>
      <GridComponent
        id="gridcomp"
        dataSource={categoriesDataManager}
        allowPaging
        allowSorting
        toolbar={["Search"]}
        pageSettings={{ pageSize: 10 }}
        width="auto"
      >
        <ColumnsDirective>
        <ColumnDirective 
                headerText="Наименование"
                field="name" 
                width="150" 
                textAlign="Center" 
              />
              <ColumnDirective 
                field="created" 
                headerText="Создан" 
                width="100" 
                textAlign="Center" 
              />
      </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar]} />
      </GridComponent>
      




    </>
    )
}

export default ProductGroupDetail