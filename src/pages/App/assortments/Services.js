import {
    json,
    defer, 

  } from 'react-router-dom';
import { BASE_URL } from '../../../data/config';



async function loadAssortmentsList(status='active', token) {
  let url = BASE_URL + "/crm/admin-api/assortments" + "?status=" + status;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
  });
  if (!response.ok) {
    throw json(
      { message: "Failed to load assortments" },
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

async function loadAssortmentDetail(id, token) {
    const response = await fetch(BASE_URL + "/crm/admin-api/assortments?id=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
    });
  
    if (!response.ok) {
      throw json(
        { message: "Could not fetch details for selected assortment." },
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
export function assortmentsLoader(status='active', token) {
  return defer({
    assortments: loadAssortmentsList(status, token),
  });
}


export async function assortmentDetailLoader({ request, params, token }) {
  const id = params.id;

  return defer({
    assortment: await loadAssortmentDetail(id, token),
  });
}