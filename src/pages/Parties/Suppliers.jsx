import React from "react";
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
import { BASE_URL } from "../../data/config";
import { Header } from "../../components";

const Suppliers = () => {
  const dataManager = new DataManager({
    url: `${BASE_URL}/parties/admin-api/suppliers/list`,
    adaptor: new UrlAdaptor(),
    crossDomain: true,
  });

  return (
    <>
      <Header category="Страница" title="Поставщики" />
      <GridComponent
        id="supplierGrid"
        dataSource={dataManager}
        allowPaging
        allowSorting
        toolbar={["Search"]}
        pageSettings={{ pageSize: 10 }}
        width="auto"
      >
        <ColumnsDirective>
          <ColumnDirective 
            field="name" 
            headerText="Имя" 
            width="150" 
            textAlign="Center"
          />
          <ColumnDirective 
            field="email" 
            headerText="Электронная почта" 
            width="200" 
            textAlign="Center"
          />
          <ColumnDirective 
            field="phone" 
            headerText="Телефон" 
            width="150" 
            textAlign="Center"
          />
          <ColumnDirective 
            field="address" 
            headerText="Адрес" 
            width="200" 
            textAlign="Center"
          />
          <ColumnDirective 
            field="created_at" 
            headerText="Создан" 
            width="135" 
            format="yMd" 
            textAlign="Center"
          />
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar]} />
      </GridComponent>
    </>
  );
};

export default Suppliers;
