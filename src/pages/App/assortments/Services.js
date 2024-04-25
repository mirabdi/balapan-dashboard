import {
    json,
    defer, 

  } from 'react-router-dom';
import { BASE_URL } from '../../../data/config';



async function loadAssortmentsList(is_archived = false, token) {
  let url = BASE_URL + "/crm/admin-api/assortments";
  if (is_archived) {
    url += "?is_archived=" + is_archived;
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
export function assortmentsLoader(is_archived = false, token) {
  return defer({
    assortments: loadAssortmentsList(is_archived, token),
  });
}


export async function assortmentDetailLoader({ request, params, token }) {
  const id = params.id;

  return defer({
    assortment: await loadAssortmentDetail(id, token),
  });
}