import React, { useState, useEffect } from 'react';
import { Button } from 'components';
import { BASE_URL } from 'data/config';
import { useStateContext } from 'contexts/ContextProvider';

const ProductSelector = ({ product, onSelect }) => {
  const [loading, setLoading] = useState(false);
  const [barcodeOrTitle, setBarcodeOrTitle] = useState('');
  const { showToast, currentColor, token } = useStateContext();


  const loadProduct = async () => {
    setLoading(true);
    let isMounted = true;

    try {
      const response = await fetch(`${BASE_URL}/crm/admin-api/listings/get-product?query=${barcodeOrTitle}`, {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        if (isMounted) {
          onSelect(data);
          showToast({
            title: 'Товар загружен',
            content: 'Информация о товаре успешно загружена.',
            cssClass: 'e-toast-success',
            icon: 'e-success toast-icons',
          });
        }
      } else {
        throw new Error(data.message || 'Не удалось загрузить товар.');
      }
    } catch (error) {
      if (isMounted) {
        showToast({
          title: 'Ошибка',
          content: error.message,
          cssClass: 'e-toast-danger',
          icon: 'e-error toast-icons',
        });
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }

    return () => {
      isMounted = false; // Cleanup function to set isMounted to false when component unmounts
    };
  };

  console.log('product selector:', product);

  return (
    product ? (
      <div className="max-w-md mx-auto bg-gray-200 rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-8">
        <div className="md:flex">
          <div className="p-8">
            <div className="text-lg leading-tight font-medium text-black mt-2">
              <p className="uppercase tracking-wide text-xl font-bold" style={{ color: currentColor }}>Выбранный товар:</p>
              <span className="uppercase tracking-wide text-lg font-semibold" style={{ color: currentColor }}>
                {product.name}
              </span>
            </div>
            <p className="mt-1 text-gray-500">{product.description || "Описание отсутствует."}</p>
            <div className="mt-4">
              <div className="text-gray-600">Штрих-код: {product.barcode}</div>
              <div className="text-gray-600">Цена: {product.price} сом.</div>
              <div className="text-gray-600">Себестоимость: {product.cost} сом.</div>
            </div>
            <Button
              color="white"
              bgColor={currentColor}
              text={'Изменить'}
              onClick={() => onSelect(null)}
              borderRadius="10px"
              className="m-2"
            />
          </div>
        </div>
      </div>
    ) : (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Штрих-код или Название</label>
        <input
          type="text"
          value={barcodeOrTitle}
          onChange={(e) => setBarcodeOrTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Введите штрих-код или название"
        />
        <Button
          color="white"
          bgColor={currentColor}
          disabled={loading}
          text={loading ? 'Загрузка...' : 'Загрузить товар'}
          type="submit"
          onClick={loadProduct}
          borderRadius="10px"
          className="m-2"
        />
      </div>
    )
  );
};

export default ProductSelector;
