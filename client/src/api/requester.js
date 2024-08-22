export default async function requester(method, url, data, accessToken, adminAccess, signal) {
  const options = {
    method,
    headers: {},
    signal
  };

  if (method != "GET") {
    options.method = method;
  }
  
  if(adminAccess){
    options.headers["X-Admin"] = accessToken;
  }else if (accessToken) {
    options.headers["X-Authorization"] = accessToken;
  }

  if (data != undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  
  if(response.status == 204){
    return response;
  }

  const result = await response.json();
  
  return result;
}

export const get = requester.bind(null, "GET");
export const post = requester.bind(null, "POST");
export const put = requester.bind(null, "PUT");
export const patch = requester.bind(null, "PATCH");
export const del = requester.bind(null, "DELETE");
