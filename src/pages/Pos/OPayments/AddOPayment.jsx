import React, { useState } from 'react';
import { Header } from '../../../components';
import { BASE_URL } from 'data/config';
import { useStateContext } from 'contexts/ContextProvider';


const AddOPayment = () => {
  const { showToast, token, user } = useStateContext();
  const [formData, setFormData] = useState({
    order_id: '',
    desc: '',
    amount: ''
  });
  const [paymentResponse, setPaymentResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/money/admin-api/opay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const data = await response.json();
        showToast({ title: 'Error!', content: data.detail, cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
        return;
      }
      const data = await response.json();
      if (data.status === 0) {
        showToast({ title: 'Success!', content: 'Payment submitted successfully.', cssClass: 'e-toast-success', icon: 'e-success toast-icons' });
        setFormData({
          order_id: '',
          desc: '',
          amount: ''
        });
        setPaymentResponse(data.response);
      }
    } catch (error) {
      showToast({ title: 'Error!', content: 'Failed to submit payment.', cssClass: 'e-toast-danger', icon: 'e-error toast-icons' });
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Payment" />
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="order_id" className="block text-sm font-medium text-gray-700">Order ID</label>
          <input
            type="text"
            name="order_id"
            id="order_id"
            value={formData.order_id}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="desc" className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            name="desc"
            id="desc"
            value={formData.desc}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={formData.amount}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit Payment
        </button>
      </form>
      {paymentResponse && (
        <div className="flex flex-col items-center mt-5">
          <p className="text-lg font-medium mb-2">Scan QR Code to Pay</p>
          <img src={paymentResponse.qr} alt="QR Code" className="w-56 h-56 border border-gray-300 p-2" />
        </div>
      )}
    </div>
  );
}

export default AddOPayment;
