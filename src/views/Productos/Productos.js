import React, { useEffect, useState } from 'react';
import { getAllProductos } from '../../api/Productos';
import TablePageContainer from '../../components/Containers/TablePageContainer';
import CustomizedTables from '../../components/table/Table';

const columns = [
    {
      headerText: "Codigo de Barra",
      selector: "CodigoDeBarra",
    },
    {
      headerText: "Descripcion",
      selector: "Descripcion",
    },
    {
      headerText: "Precio de Venta",
      selector: "PrecioVenta",
    },
    {
      headerText: "Marca",
      selector: "Marca",
    },
  ]

const Productos = () => {
    const [data, setData] = useState([]);

    useEffect(()=>{
        getAllProductos()
        .then(data=>{
            setData(data.map((row)=>{
                return {
                    ...row,
                    Marca: row.Marca.Descripcion,
                }
            }));
        })
        .catch(e => {
            console.log(e);
        })
    }, [])

  return(
    <TablePageContainer>
        <CustomizedTables rows={data} columns={columns} onRowClick={id=>console.log(id)} idColumn="id"/>
    </TablePageContainer>
  );
};

export default Productos;
