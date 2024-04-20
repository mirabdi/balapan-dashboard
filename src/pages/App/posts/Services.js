import {
    json,
    defer, 

  } from 'react-router-dom';
import { BASE_URL } from '../../../data/config';



async function loadPostsList(is_archived = false) {
  const token = "token";
  let url = BASE_URL + "/crm/admin-api/posts";
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
      { message: "Failed to load posts" },
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

async function loadPostDetail(id) {
    const response = await fetch(BASE_URL + "/crm/admin-api/posts?id=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token token",
      },
    });
  
    if (!response.ok) {
      throw json(
        { message: "Could not fetch details for selected post." },
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
export function postsLoader(is_archived = false) {
  return defer({
    posts: loadPostsList(is_archived),
  });
}


export async function postDetailLoader({ request, params }) {
  const id = params.id;

  return defer({
    post: await loadPostDetail(id),
  });
}

// functions 
// export async function updatePostsOrder(newItems) {
//   const token = "token";
//   const response = await fetch(BASE_URL + "/crm/admin-api/posts/update-order", {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Token " + token,
//     },
//     body: JSON.stringify({ posts: newItems }),
//   });
// }

// export async function deletePost(id){
//   const token = "token";
//   const response = await fetch(BASE_URL + "/crm/admin-api/posts", {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Token " + token,
//     },
//     body: JSON.stringify({ id: id }),
//   });

//   if (!response.ok) {
//     throw json(
//       { message: "Could not delete selected post." },
//       {
//         status: 500,
//       }
//     );
//   } 
// }





// Actions
// export async function deletePostAction({ request, params }) {
//   const id = params.id;
//   deletePost(id);
//   return redirect("/app/posts/");
// }


// export async function updatePostAction({ request, params }) {
//     console.log("updatePostAction", params, request);
//     const post_id = params.id;
//     const method = request.method;
//     const data = await request.formData();
//     const is_archived = data.get("is_archived") === "true" ? true : false;
//     const formData = new FormData();
//     formData.append("id", post_id);
//     formData.append("title", data.get("title"));
//     formData.append("description", data.get("description"));
//     formData.append("is_archived", data.get("is_archived"));
//     formData.append("image", data.get("image"));
//     let url = BASE_URL + "/crm/admin-api/posts";
//     const token = "token";
//     const response = await fetch(url, {
//       method: method,
//       headers: {
//         Authorization: "Token " + token,
//       },
//       body: formData,
//     });
  
//     if (response.status === 422) {
//       return response;
//     }
  
//     if (!response.ok) {
//       throw json({ message: "Could not save post." }, { status: 500 });
//     }
//     if(is_archived){
//       return redirect("/app/posts/archived");
//     }
//     else{
//       return redirect("/app/posts/");
//     }
//     // return response;
//   }