import React, { useEffect, useState } from 'react'
import { AssortmentForm, AssortmentsList, AssortmentSelector, ListingForm, RightModal, ListingsList, Button, ListingSelector } from 'components';
import { useRouteLoaderData, useNavigate } from 'react-router-dom';
import { useStateContext } from 'contexts/ContextProvider';
import { MdEdit, MdDelete, MdAddCircleOutline } from 'react-icons/md';

const EditAssortment = () => {
  const navigate = useNavigate();
  const { assortment } = useRouteLoaderData('assortment-detail');
  const [mode, setMode] = useState(null);
  const { rightModal, setRightModal, showToast, currentColor } = useStateContext();
  const refreshPage = () => {
    setMode(null);
    navigate('/app/assortments/' + assortment.id + '/edit', { replace: true });
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-8 pt-5">Редактировать Ассортимент</h1>
      <AssortmentForm assortment={assortment} afterAction={refreshPage} />
      <div className="flex justify-between items-center w-full">
          <p className="text-3xl font-extrabold tracking-tight text-slate-900">
              Связанные Ассортименты
          </p>
          <div>
              <Button
                  color="white"
                  bgColor={currentColor}
                  icon={<MdAddCircleOutline size={30} />}
                  onClick={() => setMode('add_assortment')}
                  borderRadius="10px"
                  className="m-2 font-bold py-2 px-4 rounded"
              />
              <Button
                  color="white"
                  bgColor={currentColor}
                  icon={<MdEdit size={30} />}
                  onClick={() => setMode('edit_children_assortment')}
                  borderRadius="10px"
                  className="m-2 font-bold py-2 px-4 rounded"
              />
          </div>
      </div>
      <AssortmentsList assortments={assortment.sub_assortments || []} selectHandler={(assortment) => { setRightModal(true); }} />

      <div className="flex justify-between items-center w-full mt-10">
          <p className="text-3xl font-extrabold tracking-tight text-slate-900">
              Связанные Листинги
          </p>
          <div>
            <Button
                  color="white"
                  bgColor={currentColor}
                  icon={<MdAddCircleOutline size={30} />}
                  onClick={() => setMode('add_listing')}
                  borderRadius="10px"
                  className="m-2 font-bold py-2 px-4 rounded"
              />
              <Button
                  color="white"
                  bgColor={currentColor}
                  icon={<MdEdit size={30} />}
                  onClick={() => setMode('edit_children_listing')}
                  borderRadius="10px"
                  className="m-2 font-bold py-2 px-4 rounded"
              />
            </div>
      </div>

      <ListingsList listings={assortment.listings || []} selectHandler={(listing) => { console.log(listing); setRightModal(true); }} />
      { 
        mode === 'add_assortment' 
        && <RightModal title={"Добавить Новый Ассортимент"} afterClose={refreshPage}>
            <AssortmentForm parent_assortment={assortment} afterAction={refreshPage} />
          </RightModal>
      }
      { 
        mode === 'edit_children_assortment' 
        && <RightModal title={"Изменить Список Ассортиментов"} afterClose={refreshPage}>
            <AssortmentSelector parent_assortment={assortment} title="AssortmentSelector" afterAction={refreshPage} />
          </RightModal>
      }
      { 
        mode === 'add_listing' 
        &&
          <RightModal title={"Добавить Новый Листинг"} afterClose={refreshPage}>
            <ListingForm parent_assortment={assortment} afterAction={refreshPage} />
          </RightModal>
      }
      { 
        mode === 'edit_children_listing' 
        && <RightModal title={"Изменить Список Листингов"} afterClose={refreshPage}>
            <ListingSelector parent_assortment={assortment} title="ListingSelector" afterAction={refreshPage} />
          </RightModal>
      }
    </div>
  );
}

export default EditAssortment;
