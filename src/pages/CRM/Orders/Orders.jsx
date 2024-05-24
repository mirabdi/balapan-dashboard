import { useEffect, useState } from 'react';
import { Suspense} from 'react';
import { RightModal, OrdersList, OrderItem } from 'components';
import { useLoaderData, Await } from 'react-router-dom';
import { useStateContext} from '../../../contexts/ContextProvider';
import { BASE_URL } from 'data/config';
const  statsToRussian = (status) => {
  switch(status){
    case 'all': return 'Все';
    case 'cart': return 'В корзине';
    case 'ordered': return 'Оформлен';
    case 'preparing': return 'Сборка';
    case 'ready': return 'Готов';
    case 'delivering': return 'Доставка';
    case 'completed': return 'Завершен';
    case 'canceled': return 'Отменен';
    default: return 'Статус неизвестен';
  };

};

function Orders({status="ordered"}) {
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [orders, setOrders] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const { rightModal, setRightModal, showToast, token} = useStateContext();
  const title = statsToRussian(status);
  
  
  
  const loadMoreOrders = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    const response = await loadOrdersList(status, token, nextPage, query);
    if(response.status != 0){
      showToast({ title: 'Ошибка!', content: response.message, cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
    }
    else{
      const loadedOrders = response.response;
      if (Array.isArray(loadedOrders)) {
        setOrders((prev) => [...prev, ...loadedOrders]);
      } else {
        console.error('Loaded orders is not an array:', loadedOrders);
      }
    }
  };

  useEffect( () => {
    async function fetchOrders() {
      try {
        setLoading(true);
        const response = await loadOrdersList(status, token, page, query);
        if(response.status != 0){
          throw new Error(response.message || 'Failed to load orders');
        }
        else{
          setOrders(response.response);          
        }
      } catch (err) {
        showToast({ title: 'Ошибка!', content: err.message, cssClass: 'e-toast-danger', icon: 'e-error toast-icons' })
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token, status]);

  const afterStatusUpdate = (orderId, status) => {
    const updatedOrders = orders.map((order) => {
      if(order.id === orderId){
        order.status = status;
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  return (
    <>
      <Suspense fallback={<p className="flex flex-wrap">Loading...</p>}>
        <OrdersList 
          orders={orders} 
          title={title} 
          selectHandler={(order)=>{
            setSelectedOrder(order);  
            setRightModal(true);
          }}/>
          <button onClick={loadMoreOrders}   className="load-more-button mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700" disabled={loading}>
              {loading ? 'Загрузка...' : 'Загрузить еще'}
            </button>
      </Suspense>
      {rightModal && selectedOrder &&
      <RightModal title={"Заказ №" + selectedOrder.id} afterClose={() => setSelectedOrder(null)}>
          <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={selectedOrder}>
              {(loadedOrder) => <OrderItem order={loadedOrder} afterStatusUpdate={afterStatusUpdate}/>}
            </Await>
          </Suspense>
          <h1 className="flex md:flex-row flex-col">Here will be related statistics and more info...</h1>
      </RightModal>
        }
    </>   
  );
}

export default Orders;


const loadOrdersList = async (status='ordered', token, page=1, query="") => {
  let url = `${BASE_URL}/crm/admin-api/orders?status=${status}&page=${page}&query=${query}`;
  
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });

  // if !ok, throw message from response, else return list of orders
  if (!response.ok) {
    let message = 'Failed to load orders';
    try {
      const resData = await response.json();
      message = resData.message;
    } catch (error) {
      console.error('Failed to parse error message:', error);
    }
    throw new Error(message);
  } else{
    const resData = await response.json();
    return resData;
  }
  
  
};
