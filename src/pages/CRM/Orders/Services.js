import {
    json,
    defer, 

  } from 'react-router-dom';
import { BASE_URL } from '../../../data/config';



async function loadOrdersList(status = "ordered", token) {
  let url = BASE_URL + "/crm/admin-api/orders";
  if (status) {
    url += "?status=" + status;
  }
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
  });
  if (!response.ok) {
    throw json(
      { message: "Failed to load orders" },
      {
        status: response.status,
        statusText: response.statusText,
      }
    );
  } else {
    const resData = await response.json();
    return resData.response;
  }
}

async function loadOrderDetail(id, token) {
    const response = await fetch(BASE_URL + "/crm/admin-api/orders?id=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
    });
  
    if (!response.ok) {
      throw json(
        { message: "Could not fetch details for selected order." },
        {
          status: 500,
        }
      );
    } else {
      const resData = await response.json();
      return resData.response;
    }
  }

// Loaders
export function ordersLoader(status = "ordered", token) {
  return defer({
    orders: loadOrdersList(status, token),
  });
}


export async function orderDetailLoader({ request, params, token }) {
  const id = params.id;

  return defer({
    order: await loadOrderDetail(id, token),
  });
}