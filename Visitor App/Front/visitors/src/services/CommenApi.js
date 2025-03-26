import axios from "axios";

export const commonApi = async (method, url, body, headers) => {
    try {
        const config = {
            method,
            url,
            data: body,
            headers: {
                ...headers,
                "Content-Type": body instanceof FormData ? headers["Content-Type"] : "application/json",
            },
        };
        const response = await axios(config);
        return response;
    } catch (error) {
        console.error("API Error:", error);
        return error.response ? error.response : { error: "Unknown error occurred" };
    }
};
