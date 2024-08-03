import {
    json,
    defer, 

  } from 'react-router-dom';
import { BASE_URL } from '../../../data/config';



export async function loadEmployeeGroupsList(is_archived = false) {
  const token = "token";
  let url = BASE_URL + "/admin-api/employee-groups";
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
      { message: "Failed to load employee-groups" },
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

async function loadEmployeeDetail(id) {
    const response = await fetch(BASE_URL + "/admin-api/employee-groups?id=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token token",
      },
    });
  
    if (!response.ok) {
      throw json(
        { message: "Could not fetch details for selected employeeGroup." },
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
export function employeeGroupsLoader(is_archived = false) {
  return defer({
    employeeGroups: loadEmployeeGroupsList(is_archived),
  });
}


export async function employeeGroupDetailLoader({ request, params }) {
  const id = params.id;

  return defer({
    employeeGroup: await loadEmployeeDetail(id),
  });
}