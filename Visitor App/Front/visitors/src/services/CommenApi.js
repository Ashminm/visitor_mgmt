import axios from "axios";

export const commonApi = async (method, url, body, headers) => {
    const config = {
        method,
        url,
        data: body,
        headers: body instanceof FormData ? headers : { "Content-Type": "application/json" }, 
    };

    try {
        const response = await axios(config);
        return response; // Return the actual response
    } catch (error) {
        return error.response ? error.response : error; // Return error response if available
    }
};
