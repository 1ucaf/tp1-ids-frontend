import axios from "axios"

import { rootApiRoute } from "./GlobalApiConfs";

export const getAllClientesApiCall = async () => {
    try {
        const response = await axios.get(rootApiRoute + "/clientes");
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getClienteApiCall = async (id) => {
    try {
        const response = await axios.get(rootApiRoute + "/clientes/"+id);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createNewClienteApiCall = async (cliente) => {
    try {
        const response = await axios.post(rootApiRoute + "/clientes", cliente);
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateClienteApiCall = async (id, cliente) => {
    try {
        const response = await axios.put(rootApiRoute + "/clientes/"+id, cliente);
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteClienteApiCall = async (id) => {
    try {
        const response = await axios.delete(rootApiRoute + "/clientes/"+id);
        return response;
    } catch (error) {
        throw error;
    }
}