import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProductosApiCall } from '../../api/ProductosApiCalls';
import FlexContainer from '../../components/Containers/FlexContainer';
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
  const navigateTo = useNavigate();

  useEffect(()=>{
    getAllProductosApiCall()
      .then(data=>{
          setData(data);
      })
      .catch(e => {
          console.log(e);
      })
  }, [])

  return(
    <TablePageContainer>
      <FlexContainer alignX="flex-end" margin="0 0 20px 0">
          <Button variant="contained" size="large" onClick={()=>{navigateTo("/productos/new")}}>Nuevo</Button>
      </FlexContainer>
      <CustomizedTables rows={data} columns={columns} onRowClick={id=>navigateTo("/productos/"+id)} idColumn="CodigoDeBarra"/>
    </TablePageContainer>
  );
};

export default Productos;
