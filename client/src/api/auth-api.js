import * as request from "./requester";

const BASE_URL = "http://localhost:3030/users";

export async function login(email, password) {

  const authLoginData = await request.post(`${BASE_URL}/login`, { email, password });

  return authLoginData;
};


export async function register(userData) {

  const authRegisterData = await request.post(`${BASE_URL}/register`, userData);

  return authRegisterData;
};

export async function logout(accessToken){
  const authLogoutData = await request.get(`${BASE_URL}/logout`, undefined, accessToken)

  return authLogoutData;
}
