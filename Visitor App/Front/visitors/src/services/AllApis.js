import { commonApi } from "./CommenApi";
import { BASE_URL } from "./BaseURL";

export const registerApi = async (data) => {
    return await commonApi("POST", `${BASE_URL}/register`, data);
};
export const loginApi = async (data) => {
    return await commonApi("POST", `${BASE_URL}/login`, data);
};

export const AddVisitorApi = async (data, headers) => {
    return await commonApi("POST", `${BASE_URL}/add-visitor`, data, headers);
};
export const allUsersApi = async (headers) => {
    return await commonApi("GET", `${BASE_URL}/all-users`, null, headers);
};


