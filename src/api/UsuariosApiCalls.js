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
export const getUsuarioApiCall = async (Legajo) => {
    try {
        const response = await axios.get(rootApiRoute + "/usuarios/?legajo="+Legajo);
        return response.data;
    } catch (error) {
        throw error;
    }
}

<<<<<<< HEAD
export const saveUsuarioApiCall = async (id, usuario) => {
    try {
        const response = await axios.post(rootApiRoute + "/usuarios/", {...usuario, Password: "asdf"});
=======
export const createNewUsuarioApiCall = async (usuario) => {
    try {
        const response = await axios.post(rootApiRoute + "/usuarios/", usuario);
>>>>>>> 0d7372a03e92bd5a30bcc0ef5abeb8c307b18557
        return response;
    } catch (error) {
        throw error;
    }
}

export const saveUsuarioApiCall = async (legajo, usuario) => {
    try {
        const response = await axios.put(rootApiRoute + "/usuarios/"+legajo, usuario);
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteUsuarioApiCall = async (Legajo) => {
    try {
        const response = await axios.delete(rootApiRoute + "/usuarios/"+Legajo);
        return response;
    } catch (error) {
        throw error;
    }
}