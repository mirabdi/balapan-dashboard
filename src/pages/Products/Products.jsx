import React, { Suspense } from "react";
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




const Products = () => {
  const dataManager = new DataManager({
    url: `${BASE_URL}/products/admin-api/products/list`,
    adaptor: new UrlAdaptor(),
    crossDomain: true,
  });

  return (
    <>
    <Header category="Страница" title="Товары" />
    {/* <Suspense fallback={<p className="flex flex-wrap">Loading...</p>}>
        <Await resolve={products}> */}
        {/* {products => ( */}
            <GridComponent
              id="gridcomp"
              dataSource={dataManager}
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
          {/* ) */}
      {/* }
    </Await>
      </Suspense> */}
      </>
  );
};

export default Products;
