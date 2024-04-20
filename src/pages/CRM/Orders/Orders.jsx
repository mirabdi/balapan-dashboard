import React, { useState, useEffect, useRef } from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
  Toolbar
} from "@syncfusion/ej2-react-grids";
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import axios from 'axios';
import { RightModal, Header } from '../../../components';
import { BASE_URL } from "../../../data/config";
import { OrderDetail } from '../../../pages';
import { useStateContext } from '../../../contexts/ContextProvider';
import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";



const Orders = ({status='ordered'}) => {
  console.log("Orders", Math.random()) 
  const grid = useRef(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { rightModal, setRightModal, showToast} = useStateContext();
  
  const toasts = [
    { title: 'Warning!', content: 'There was a problem with your network connection.', cssClass: 'e-toast-warning', icon: 'e-warning toast-icons' },
    { title: 'Success!', content: 'Your message has been sent successfully.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' },
    { title: 'Error!', content: 'A problem has been occurred while submitting your data.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' },
    { title: 'Information!', content: 'Please read the comments carefully.', cssClass: 'e-toast-info', icon: 'e-info toast-icons' }
];
  // data handling for grid
  class CustomAdaptor extends UrlAdaptor {
    processResponse(data, ds, query, xhr, request, changes) {
      if (xhr && xhr.status !== 200) {
        // Handle HTTP errors
        console.log('Data fetch error:', xhr.status, xhr.statusText);
      }
      // Continue with the default processResponse implementation
      return super.processResponse(data, ds, query, xhr, request, changes);
    }

    beforeSend(dm, request, settings) {
      // Preserve the existing beforeSend if any
      if (this.pvt && this.pvt.beforeSend) {
        this.pvt.beforeSend.apply(this, arguments);
      }
      request.onloadend = () => {
        if (request.status < 200 || request.status >= 300) {
          // Handle HTTP errors
          showToast(toasts[2]);
        }
      };
    }
  }
  const dataManager = new DataManager({
    url: `${BASE_URL}/crm/admin-api/orders/status-${status}`,
    adaptor: new CustomAdaptor(),
    crossDomain: true,
  });
  // useEffect(() => {
  //   const query = new Query();
  //   query.addParams('status', status);
  //   const newDataManager = new DataManager({
  //     url: `${BASE_URL}/crm/admin-api/orders/status-${status}`,
  //     adaptor: new CustomAdaptor(),
  //     crossDomain: true,
  //     query: query,
  //   });
  //   setDataManager(newDataManager);
  // }, [status]);
  useEffect(() => {
    if (grid.current) {
      grid.current.refresh();
    }
  }, [dataManager]);

  // open modal upon row selection
  const handleRowSelected = ({ data }) => {
    setSelectedOrder(data);
    setRightModal(true);
  };



  // handle status
  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`${BASE_URL}/crm/admin-api/orders/${orderId}`, {status});
      if (grid.current) {
        grid.current.refresh();
      }
      showToast({ title: 'Success!', content: 'Your message has been sent successfully.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };
  const statusToRussian = {
    cart: 'Корзина',
    ordered: 'Оформлен',
    preparing: 'Сборка',
    ready: 'Готов',
    delivering: 'Доставка',
    completed: 'Завершен',
    canceled: 'Отменен',
  };
  const statusTemplate = (props) => {
    return (
      <select
        defaultValue={props.status}
        onChange={(e) => {
          e.stopPropagation();
          updateOrderStatus(props.id, e.target.value);
        }}
        className="form-select block w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {Object.entries(statusToRussian).map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    );
  };
  return (
    <>
    <Header category="Страница" title={"Заказы - " + statusToRussian[status]} />
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg text-lg">
        <GridComponent dataSource={dataManager}
                      allowPaging={true}
                      allowSorting={true}
                      toolbar={['Search']}
                      rowSelected={handleRowSelected}
                      ref={grid}>
          <ColumnsDirective>
            <ColumnDirective field='id' headerText='ID' width='100' textAlign='Center' />
            <ColumnDirective field='client.name' headerText='Клиент' width='100' />
            <ColumnDirective field='store.name' headerText='Магазин' width='100' />
            <ColumnDirective field='address.name' headerText='Адрес' width='100' />
            <ColumnDirective field='ordered' headerText='Дата' width='100' format='yMd' textAlign='Center' />
            <ColumnDirective field='quantity' headerText='Количество' width='100' textAlign='Center' />
            <ColumnDirective field='sum' headerText='Сумма' width='130' format='C2' textAlign='Center' />
            <ColumnDirective field='payment_option' headerText='Способ оплаты' width='100' />
            <ColumnDirective field='delivery_option' headerText='Способ доставки' width='100' />
            <ColumnDirective
              field='status'
              headerText='Статус'
              width='100'
              textAlign='Center'
              template={statusTemplate}
              type='string'
            />
          </ColumnsDirective>
          <Inject services={[Page, Search, Toolbar]} />
        </GridComponent>
      
        {rightModal && selectedOrder &&
        <RightModal title={"Заказ №" + selectedOrder.id} afterClose={() => setSelectedOrder(null)}>
           <OrderDetail order={selectedOrder} />
        </RightModal>
        }
    </div>
    </>
  );
};

export default Orders
