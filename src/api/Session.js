import axios from "axios"

import { sessionApiRoute } from "./GlobalApiConfs";


export const loginApiCall = async (userName, password) => {
    try {
        const body = {
            UserName: userName,
            Password: password,
        }
        const response = await axios.post(sessionApiRoute + "/Login/", body);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const renewTokenApiCall = async (token) => {
    try {
        const body = {
            Token: token,
        }
        const response = await axios.post(sessionApiRoute + "/RenewToken/", body);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getUserNameApiCall = async (token) => {
    try {
        const response = await axios.get(sessionApiRoute + "/GetUser/?token=" + token);
        return response.data;
    } catch (error) {
        throw error;
    }
}