import axios from "axios"
import { getToken } from "../utils/Utils";
import { rootApiRoute } from "./GlobalApiConfs";


export const newVentaApiCall = async (venta) => {
    try {
        const headers = {
            headers: {
                'Authorization': getToken()
            }
        }
        const response = await axios.post(rootApiRoute + "/ventas", venta, headers);
        return response;
    } catch (error) {
        throw error;
    }
}