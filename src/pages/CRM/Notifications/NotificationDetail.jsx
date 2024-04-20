import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BASE_URL } from '../../../data/config'; // Adjust the import path as necessary
import { Header, Button } from '../../../components';
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { useStateContext } from '../../../contexts/ContextProvider'; // Adjust the import path as necessary

const NotificationDetail = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const { id } = useParams(); // Assuming the route parameter is 'id'
  const [notification, setNotification] = useState({});

  useEffect(() => {
    fetch(`${BASE_URL}/crm/admin-api/templates/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setNotification(data['response']);
      });
  }, [id]);

  const handleDelete = () => {
    const confirmation = window.confirm('Вы действительно хотите удалить уведомление?');
    if (!confirmation) return;
    fetch(`${BASE_URL}/crm/admin-api/templates/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => navigate('/crm/notifications'))
    .catch((error) => console.error('Error:', error));
  };

  // Placeholder for additional data managers if needed
  // const relatedDataManager = new DataManager({
  //   url: `${BASE_URL}/your-endpoint/${id}/related-data`,
  //   adaptor: new UrlAdaptor(),
  //   crossDomain: true,
  // });
  const notificationsDataManager = new DataManager({
    url: `${BASE_URL}/crm/admin-api/templates/${id}/notifications/list`,
    adaptor: new UrlAdaptor(),
    crossDomain: true,
  });

  return (
    <>
      <Header category="Notification" title={notification.title || "Loading..."} />
      <div className="actions flex justify-between items-center m-4">
        <div>
          <Link to="edit">
            <Button
              color="white"
              bgColor={currentColor}
              text="Edit"
              borderRadius="10px"
              className="m-2"
            />
          </Link>
          <Button
            color="white"
            bgColor="red"
            text="Delete"
            onClick={handleDelete}
            borderRadius="10px"
            className="m-2"
          />
          <Link to="/crm/notifications">
            <Button
              color="white"
              bgColor="gray"
              text="Back"
              borderRadius="10px"
              className="m-2"
            />
          </Link>
        </div>
      </div>
      {/* Additional details and potentially related data grids can go here */}
      <GridComponent
        id="gridcomp"
        dataSource={notificationsDataManager}
        allowPaging
        allowSorting
        toolbar={["Search"]}
        pageSettings={{ pageSize: 10 }}
        width="auto"
      >
      <ColumnsDirective>
        <ColumnDirective 
          headerText="Наименование"
          field="client.name" 
          width="150" 
          textAlign="Center" 
        />
        <ColumnDirective 
          headerText="Приложение"
          // field="client.is_token_active" 
          width="150" 
          textAlign="Center" 
          template={(props) => (props.client.is_token_active ? 'Да' : ' ')}
        />
        <ColumnDirective 
          field="sent_time" 
          headerText="Время отправки" 
          width="100" 
          textAlign="Center" 
        />
        <ColumnDirective 
          field="read_time" 
          headerText="Время просмотра" 
          width="100" 
          textAlign="Center" 
        />
      </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar]} />
      </GridComponent>
    </>
  );
};

export default NotificationDetail;
