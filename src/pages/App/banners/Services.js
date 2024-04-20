import {
    json,
    defer, 

  } from 'react-router-dom';
import { BASE_URL } from '../../../data/config';



async function loadBannersList(is_archived = false) {
  const token = "token";
  let url = BASE_URL + "/crm/admin-api/banners";
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
      { message: "Failed to load banners" },
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

async function loadBannerDetail(id) {
    const response = await fetch(BASE_URL + "/crm/admin-api/banners?id=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token token",
      },
    });
  
    if (!response.ok) {
      throw json(
        { message: "Could not fetch details for selected banner." },
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
export function bannersLoader(is_archived = false) {
  return defer({
    banners: loadBannersList(is_archived),
  });
}


export async function bannerDetailLoader({ request, params }) {
  const id = params.id;

  return defer({
    banner: await loadBannerDetail(id),
  });
}