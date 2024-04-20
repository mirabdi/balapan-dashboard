import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";

import { ordersData, contextMenuItems } from "../data/dummy";
import { gridOrderImage, gridOrderStatus } from "../data/utils";
import { Header } from "../components";

const OrdersTemplate = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  console.log("ordersData", ordersData)

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="OrdersTemplate" />
      <GridComponent
        id="gridcomp"
        dataSource={ordersData}
        allowPaging
        allowSorting
      >
        <ColumnsDirective>
          <ColumnDirective 
            headerText="Image" 
            template={gridOrderImage} 
            textAlign="Center" 
            width="120" 
          />
          <ColumnDirective 
            field="OrderItems" 
            headerText="Item" 
            width="150" 
            editType="dropdownedit" 
            textAlign="Center" 
          />
          <ColumnDirective 
            field="CustomerName" 
            headerText="Customer Name" 
            width="150" 
            textAlign="Center" 
          />
          <ColumnDirective 
            field="TotalAmount" 
            headerText="Total Amount" 
            format="C2" 
            textAlign="Center" 
            editType="numericedit" 
            width="150" 
          />
          <ColumnDirective 
            headerText="Status" 
            template={gridOrderStatus} 
            field="OrderItems" // This might be an error. It should be a unique field for the status.
            textAlign="Center" 
            width="120" 
          />
          <ColumnDirective 
            field="OrderID" 
            headerText="Order ID" 
            width="120" 
            textAlign="Center" 
          />
          <ColumnDirective 
            field="Location" 
            headerText="Location" 
            width="150" 
            textAlign="Center" 
          />
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            Edit,
            PdfExport,
          ]}
        />
      </GridComponent>
    </div>
  );
};

export default OrdersTemplate;
