import React, {useEffect, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
  Toolbar,
  RowDD,
  RowDragEventArgs
} from "@syncfusion/ej2-react-grids";
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { Header, Button } from "../../../components";

import { useStateContext } from "contexts/ContextProvider";
import { BASE_URL } from "../../../data/config";



const ProductGroups = () => {
  const navigate = useNavigate()
  const [dataManager, setDataManager] = useState(null);
  useEffect(() => {
    const newDataManager = new DataManager({
      url: `${BASE_URL}/products/admin-api/product-groups/list`,
      adaptor: new UrlAdaptor(),
      crossDomain: true,
    });
    setDataManager(newDataManager);
  }, []); 

  const rowClick = (args) => {
    const selectedRow = args.data;
    navigate(`${selectedRow.id}`);
  };
  const {currentColor} = useStateContext();
  return (
    <>
    
    <Header category="Страница" title="Группы товаров" />
    <Link to="new/">
      <Button
        color="white"
        bgColor={currentColor}
        text="Добавить группу"
        borderRadius="10px"
        className="mb-2"
      />
    </Link>

    <GridComponent
      id="gridcomp"
      dataSource={dataManager}
      allowPaging
      allowSorting
      toolbar={["Search", "Delete"]}
      pageSettings={{ pageSize: 10 }}
      width="auto"
      rowSelected={rowClick}
    >
    <ColumnsDirective>
      <ColumnDirective 
        field="id" 
        headerText="ID"
        width="20" 
        textAlign="Center" 
      />
      <ColumnDirective 
        field="name" 
        headerText="Наименование" 
        width="100" 
        textAlign="Center" 
      />
      <ColumnDirective 
        field="created" 
        headerText="Создан" 
        width="100" 
        format="yMd" 
        textAlign="Center" 
      />
    </ColumnsDirective>
      <Inject services={[Page, Search, Toolbar]} />
    </GridComponent>
      </>
  );
};

export default ProductGroups;

