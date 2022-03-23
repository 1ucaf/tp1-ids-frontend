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
<<<<<<< HEAD
export const getClienteApiCall = async (id) => {
    try {
        const response = await axios.get(rootApiRoute + "/clientes/"+id);
=======
export const getClienteApiCall = async (cuit) => {
    try {
        const response = await axios.get(rootApiRoute + "/clientes/?cuit="+cuit);
>>>>>>> sebi
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createNewClienteApiCall = async (cliente) => {
    try {
<<<<<<< HEAD
        const response = await axios.post(rootApiRoute + "/clientes", cliente);
=======
        const response = await axios.post(rootApiRoute + "/clientes/", cliente);
>>>>>>> sebi
        return response;
    } catch (error) {
        throw error;
    }
}

<<<<<<< HEAD
export const updateClienteApiCall = async (id, cliente) => {
    try {
        const response = await axios.put(rootApiRoute + "/clientes/"+id, cliente);
=======
export const saveClienteApiCall = async (cliente) => {
    try {
        const response = await axios.put(rootApiRoute + "/clientes/", cliente);
>>>>>>> sebi
        return response;
    } catch (error) {
        throw error;
    }
}

<<<<<<< HEAD
export const deleteClienteApiCall = async (id) => {
    try {
        const response = await axios.delete(rootApiRoute + "/clientes/"+id);
=======
export const deleteClienteApiCall = async (cuit) => {
    try {
        const response = await axios.delete(rootApiRoute + "/clientes/"+ cuit);
>>>>>>> sebi
        return response;
    } catch (error) {
        throw error;
    }
}