import { commonApi } from "./CommenApi";
import { BASE_URL } from "./BaseURL";

export const registerApi = async (data,headers) => {
    return await commonApi("POST", `${BASE_URL}/register`, data,headers);
};
export const loginApi = async (data) => {
    return await commonApi("POST", `${BASE_URL}/login`, data);
};

export const AddVisitorApi = async (data, headers) => {
    return await commonApi("POST", `${BASE_URL}/add-visitor`, data, headers);
};

export const getAllvisitorApi = async (headers,search) => {
    return await commonApi("GET", `${BASE_URL}/all-visitor?search=${search}`, null, headers);
};



// export const allUsersApi = async (headers) => {
//     return await commonApi("GET", `${BASE_URL}/all-users`, null, headers);
// };

export const categoryAddApi = async (data,headers) => {
    return await commonApi("POST",`${BASE_URL}/add-category`, data, headers);
  };

export const allCategoryApi = async (headers) => {
    return await commonApi("GET", `${BASE_URL}/all-category`, null, headers);
};

export const AddAttenderApi = async (data,headers) => {
    return await commonApi("POST", `${BASE_URL}/add-attender`, data,headers);
};

export const updateProfileApi = async (data,headers) => {
    return await commonApi("PUT", `${BASE_URL}/update-profile`, data,headers);
};

export const getUserSpecificApi = async (headers) => {
    return await commonApi("GET", `${BASE_URL}/get-user`, null, headers);
};

export const DeleteVistorApi = async (headers,id) => {
    return await commonApi("DELETE", `${BASE_URL}/delete-visitor/${id}`,{}, headers);
};

export const VisitorAllApi = async (headers) => {
    return await commonApi("GET", `${BASE_URL}/get-all-visitor`, null, headers);
};
