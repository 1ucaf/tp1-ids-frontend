import axios from "axios"

import { rootApiRoute } from "./GlobalApiConfs";


export const initializeProducto = async (codigoDeBarra, descripcion, costo, margenDeGanancia, porcentajeIVA, marca, rubro) => {
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
export const getAllProductos = async () => {
    try {
        const response = await axios.get(rootApiRoute + "/Productos/Lista");
        return response.data;
    } catch (error) {
        throw error;
    }
}