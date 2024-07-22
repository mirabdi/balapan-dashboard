import { json, defer } from 'react-router-dom';
import { BASE_URL } from '../../../data/config';

async function loadStoresList(is_archived = false) {
  const token = "token";
  let url = BASE_URL + "/admin-api/stores";
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
      { message: "Failed to load stores" },
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

async function loadStoreDetail(id) {
  const response = await fetch(BASE_URL + "/admin-api/stores?id=" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token token",
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected store." },
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
export function storesLoader(is_archived = false) {
  return defer({
    stores: loadStoresList(is_archived),
  });
}

export async function storeDetailLoader({ request, params }) {
  const id = params.id;

  return defer({
    store: await loadStoreDetail(id),
  });
}
