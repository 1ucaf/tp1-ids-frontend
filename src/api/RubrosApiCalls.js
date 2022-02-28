import axios from "axios"

import { rootApiRoute } from "./GlobalApiConfs";

export const getAllRubrosApiCall = async () => {
    try {
        const response = await axios.get(rootApiRoute + "/Rubros");
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getRubrosApiCall = async (id) => {
    try {
        const response = await axios.get(rootApiRoute + "/Rubros/"+id);
        return response.data;
    } catch (error) {
        throw error;
    }
}
