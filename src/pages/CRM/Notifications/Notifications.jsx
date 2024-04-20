import React, { useEffect, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
  Toolbar
} from "@syncfusion/ej2-react-grids";
import { Header, Button } from "../../../components";

import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "contexts/ContextProvider";
import { BASE_URL } from "../../../data/config";
import { FaCheck } from 'react-icons/fa';

const Notifications = () => {
  const navigate = useNavigate();
  const [dataManager, setDataManager] = useState(null);

  useEffect(() => {
    const newDataManager = new DataManager({
      url: `${BASE_URL}/crm/admin-api/templates/list`,
      adaptor: new UrlAdaptor(),
      crossDomain: true,
    });
    setDataManager(newDataManager);
  }, []);

  const { currentColor } = useStateContext();

  const contentTemplate = (props) => <span>{props.content.substring(0, 15) + "..."}</span>;

  const booleanTemplate = (props, field) => (
    <span>
      {props[field] ? <FaCheck/>: ' '}
    </span>
  );

  const titleTemplate = (props) => (
    <p>
      {props.title}
    </p>
  );

  const rowClick = (args) => {
    const selectedRow = args.data;
    navigate(`${selectedRow.id}`);
  };

  return (
    <>
      <Header category="Страница" title="Уведомления" />
      <Button
        color="white"
        bgColor={currentColor}
        text="Создать уведомление"
        borderRadius="10px"
        className="mb-2"
      />
      <GridComponent
        id="gridcomp"
        dataSource={dataManager}
        allowPaging
        allowSorting
        toolbar={["Search"]}
        pageSettings={{ pageSize: 10 }}
        rowSelected={rowClick}
        width="auto"
      >
        <ColumnsDirective>
          <ColumnDirective 
            field="title" 
            headerText="Наименование" 
            width="100" 
            textAlign="Center" 
            template={titleTemplate} 
          />
          <ColumnDirective 
            field="content" 
            headerText="Содержание" 
            width="150" 
            textAlign="Center" 
            template={contentTemplate} 
          />
          <ColumnDirective 
            field="trigger" 
            headerText="Триггер" 
            width="60" 
            textAlign="Center" 
          />
          <ColumnDirective 
            field="is_sms" 
            headerText="SMS" 
            width="30" 
            textAlign="Center" 
            template={(props) => booleanTemplate(props, 'is_sms')} 
          />
          <ColumnDirective 
            field="is_active" 
            headerText="Active" 
            width="30" 
            textAlign="Center" 
            template={(props) => booleanTemplate(props, 'is_active')} 
          />
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar]} />
      </GridComponent>
    </>
  );
};

export default Notifications;
