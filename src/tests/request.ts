import axios, { AxiosRequestConfig } from "axios";

const API_URL = "http://localhost:3001/api"; // This should be an env variable.

export async function apiPOST(path: string, body = {}): Promise<any> {
    return await axios
        .post(`${API_URL}${path}`, body, {
            validateStatus: (status) =>
                (status >= 200 && status < 300) || status >= 400,
        })
        .catch((e) => {
            console.log(e.toJSON());
        });
}

export async function apiGET(path: string): Promise<any> {
    return await axios
        .get(`${API_URL}${path}`, {
            validateStatus: (status) =>
                (status >= 200 && status < 300) || status >= 400,
        })
        .catch((e) => {
            console.log(e.toJSON());
        });
}

export async function apiPATCH(path: string, body = {}): Promise<any> {
    return await axios
        .patch(`${API_URL}${path}`, body, {
            validateStatus: (status) =>
                (status >= 200 && status < 300) || status >= 400,
        })
        .catch((e) => {
            console.log(e.toJSON());
        });
}

export async function apiPUT(path: string, body = {}): Promise<any> {
    return await axios
        .put(`${API_URL}${path}`, body, {
            validateStatus: (status) =>
                (status >= 200 && status < 300) || status >= 400,
        })
        .catch((e) => {
            console.log(e.toJSON());
        });
}

export async function apiDELETE(path: string, body = {}): Promise<any> {
    const config: AxiosRequestConfig = {
        data: body,
        validateStatus: (status) =>
            (status >= 200 && status < 300) || status >= 400,
    };
    return await axios.delete(`${API_URL}${path}`, config).catch((e) => {
        console.log(e.toJSON());
    });
}
