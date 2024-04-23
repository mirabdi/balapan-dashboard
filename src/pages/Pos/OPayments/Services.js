import {
    json,
    defer, 

  } from 'react-router-dom';
import { BASE_URL } from '../../../data/config';



async function loadOPaymentsList(is_archived = false) {
  const token = "token";
  let url = BASE_URL + "/money/admin-api/opay";
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
      { message: "Failed to load opayments" },
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

async function loadOPaymentDetail(id) {
    const response = await fetch(BASE_URL + "/money/admin-api/opay?id=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token token",
      },
    });
  
    if (!response.ok) {
      throw json(
        { message: "Could not fetch details for selected opayment." },
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
export function opaymentsLoader(is_archived = false) {
  return defer({
    opayments: loadOPaymentsList(is_archived),
  });
}


export async function opaymentDetailLoader({ request, params }) {
  const id = params.id;

  return defer({
    opayment: await loadOPaymentDetail(id),
  });
}