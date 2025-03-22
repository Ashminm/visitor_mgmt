import { commonApi } from "./CommenApi";
import { BASE_URL } from "./BaseURL";

export const registerApi = async (data) => {
    return await commonApi("POST", `${BASE_URL}/register`, data);
};
export const loginApi = async (data) => {
    return await commonApi("POST", `${BASE_URL}/login`, data);
};
