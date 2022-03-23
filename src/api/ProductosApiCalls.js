import axios from "axios"

import { rootApiRoute } from "./GlobalApiConfs";


export const initializeProductoApiCall = async (codigoDeBarra, descripcion, costo, margenDeGanancia, porcentajeIVA, marca, rubro) => {
    try {
        const body = {
            CodigoDeBarra: codigoDeBarra,
            Descripcion: descripcion,
            Costo: costo,
            MargenDeGanancia: margenDeGanancia,
            PorcentajeIVA: porcentajeIVA,
            Marca: marca,
            Rubro: rubro
          }
        const response = await axios.post(rootApiRoute + "/Productos/Initialize", body);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getAllProductosApiCall = async () => {
    try {
        const response = await axios.get(rootApiRoute + "/Productos");
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getProductoApiCall = async (id) => {
    try {
        const response = await axios.get(rootApiRoute + "/Productos/?CodigoDeBarra="+id);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createNewProductoApiCall = async (producto) => {
    try {
        const response = await axios.post(rootApiRoute + "/Productos/", producto);
        return response;
    } catch (error) {
        throw error;
    }
}
export const updateProductoApiCall = async (producto) => {
    try {
        const response = await axios.put(rootApiRoute + "/Productos/", producto);
        return response;
    } catch (error) {
        throw error;
    }
}
export const deleteProductoApiCall = async (codigoDeBarra) => {
    try {
        const response = await axios.delete(rootApiRoute + "/Productos/?CodigoDeBarra=" + codigoDeBarra);
        return response;
    } catch (error) {
        throw error;
    }
}