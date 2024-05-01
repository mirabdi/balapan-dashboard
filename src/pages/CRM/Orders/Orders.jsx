import { useEffect, useState } from 'react';
import { Suspense} from 'react';
import { RightModal, OrdersList, OrderItem } from 'components';
import { useLoaderData, Await } from 'react-router-dom';
import { useStateContext} from '../../../contexts/ContextProvider';

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
  const { rightModal, setRightModal, showToast} = useStateContext();
  const title = statsToRussian(status);

  const loaderId = status + '-orders-list'
  const { orders } = useLoaderData(loaderId);

  useEffect(() => {

  }, [selectedOrder]);

  return (
    <>
      <Suspense fallback={<p className="flex flex-wrap">Loading...</p>}>
        <Await resolve={orders}>
          {orders => 
            <OrdersList 
              orders={orders} 
              title={title} 
              selectHandler={(order)=>{
                setSelectedOrder(order);  
                setRightModal(true);
              }}/>}
        </Await>
      </Suspense>
      {rightModal && selectedOrder &&
      <RightModal title={"Заказ №" + selectedOrder.id} afterClose={() => setSelectedOrder(null)}>
          <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={selectedOrder}>
              {(loadedOrder) => <OrderItem order={loadedOrder} />}
            </Await>
          </Suspense>
          <h1 className="flex md:flex-row flex-col">Here will be related statistics and more info...</h1>
      </RightModal>
        }
    </>   
  );
}

export default Orders;


