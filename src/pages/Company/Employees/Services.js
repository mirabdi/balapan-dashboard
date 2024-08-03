import {
    json,
    defer, 

  } from 'react-router-dom';
import { BASE_URL } from '../../../data/config';



export async function loadEmployeesList(is_archived = false) {
  const token = "token";
  let url = BASE_URL + "/admin-api/employees";
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
      { message: "Failed to load employees" },
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
    const response = await fetch(BASE_URL + "/admin-api/employees?id=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token token",
      },
    });
  
    if (!response.ok) {
      throw json(
        { message: "Could not fetch details for selected employee." },
        {
          status: 500,
        }
      );
    } else {
      const resData = await response.json();
      return resData.response;
    }
  }



export async function employeeDetailLoader({ request, params }) {
  const id = params.id;

  return defer({
    employee: await loadEmployeeDetail(id),
  });
}