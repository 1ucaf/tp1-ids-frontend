import axios from "axios"

import { rootApiRoute } from "./GlobalApiConfs";

export const getAllUsuariosApiCall = async () => {
    try {
        const response = await axios.get(rootApiRoute + "/usuarios");
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getUsuarioApiCall = async (id) => {
    try {
        const response = await axios.get(rootApiRoute + "/usuarios/"+id);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const saveUsuarioApiCall = async (id, usuario) => {
    try {
        const response = await axios.post(rootApiRoute + "/usuarios/", {...usuario, Password: "asdf"});
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteUsuarioApiCall = async (id) => {
    try {
        const response = await axios.delete(rootApiRoute + "/usuarios/"+id);
        return response;
    } catch (error) {
        throw error;
    }
}