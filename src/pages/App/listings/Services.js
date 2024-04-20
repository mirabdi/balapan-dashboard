import {
    json,
    defer, 

  } from 'react-router-dom';
import { BASE_URL } from '../../../data/config';



async function loadListingsList(is_archived = false) {
  const token = "token";
  let url = BASE_URL + "/crm/admin-api/listings";
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
      { message: "Failed to load listings" },
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

async function loadListingDetail(id) {
    const response = await fetch(BASE_URL + "/crm/admin-api/listings?id=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token token",
      },
    });
  
    if (!response.ok) {
      throw json(
        { message: "Could not fetch details for selected listing." },
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
export function listingsLoader(is_archived = false) {
  return defer({
    listings: loadListingsList(is_archived),
  });
}


export async function listingDetailLoader({ request, params }) {
  const id = params.id;

  return defer({
    listing: await loadListingDetail(id),
  });
}