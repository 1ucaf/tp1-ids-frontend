import { Button, CircularProgress, FormControl, FormGroup, Input, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import FlexContainer from '../../components/Containers/FlexContainer';
import FormPageContainer from '../../components/Containers/FormPageContainer';
import ModalComponent from '../../components/Modal/ModalComponent';
import FormButtonsContainer from '../../components/Containers/FormButtonsContainer';
import { Box } from '@mui/system';
import { getAllClientesApiCall } from '../../api/ClientesApiCalls';
import { useNavigate } from 'react-router-dom';
import { getUserName } from '../../utils/Utils';
import CustomizedTables from '../../components/table/Table';
import TableProductos from '../../data-components/TableProductos';

const columns = [
  {
    selector: "Cuit",
    headerText: "CUIT",
  },
  {
    selector: "NombreApellido",
    headerText: "Nombre y Apellido",
  },
]

const productColumns = [
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

const NewVenta = props => {
  const navigateTo = useNavigate();

  const [venta, setVenta] = useState({
    ClienteCUIT: "20000000000",
    User: getUserName(),
    MedioDePago: 1,
    TipoFacturaId: 1,
    LineasDeVenta: []
  });

  const [productsInSale, setProductsInSale] = useState([]/* {
    ClienteCUIT: "20000000000",
    User: getUserName(),
    MedioDePago: 1,
    TipoFacturaId: 1,
    LineasDeVenta: []
  } */);
  const [nombreClienteBuscar, setNombreClienteBuscar] = useState("");
  const [clientes, setClientes] = useState([]);
  const [clientesFiltered, setClientesFiltered] = useState([]);

  const [selectedProducto, setSelectedProducto] = useState([]);

  const [modalProps, setModalProps] = useState({
      title: "",
      message: "",
      type: "",
      show: false,
      afterCloseModal: ()=>{}
  })
    
  const onCloseModal = ()=>{
      console.log("cerrar");
      setModalProps(
          {...modalProps,
              show: false,
          }
      )
  }

  useEffect(()=>{
    getAllClientesApiCall()
    .then((data)=>{
      setClientes(data);
      setClientesFiltered(data);
    })
  }, [])

  const onChangeNombreCliente = e => {
    setNombreClienteBuscar(e.target.value);
    const filtered = clientes.filter( c => c.Cuit.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()) || c.NombreApellido.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()));
    setClientesFiltered(filtered);
    console.log(filtered[0].Cuit);
    setVenta({
      ...venta,
      ClienteCuit: filtered[0].Cuit,
      Cliente: filtered[0],
    })
  }

  const handleChangeCliente = event => {
      var client = clientes.find(cliente => cliente.Cuit === event.target.value);
      console.log(client);
      setVenta({...venta,
          ClienteCUIT: event.target.value,
          Cliente: client,
      });
  }
  const handleChangeClienteSeleccionado = id => {
    var client = clientes.find(cliente => cliente.Cuit === id);
    console.log(client);
    setVenta({...venta,
        ClienteCUIT: id,
        Cliente: client,
    });
  }

  const onProductSelect = (id, producto) =>{
    console.log(id, producto);
    setSelectedProducto(producto);
  }
    
  const goBack = () => {
    navigateTo("/home");
  }

  const onSave = () => {
      // newVentaApiCall(venta)
      // .then(response => {
      //     console.log(response);
      // })
  }

  return(
    <FlexContainer>
        <>
          <h1>Nueva Venta</h1>
          <ModalComponent modalProps={modalProps} onCloseModal={onCloseModal}/>
          <FormPageContainer>
              <FormGroup>
                <FormControl /* sx={{ maxWidth: "30%" }} */>
                  <small> Filtrar </small>
                  <Input onChange={onChangeNombreCliente} id="my-input" aria-describedby="my-helper-text" value={nombreClienteBuscar ?? ""} />
                </FormControl>
                {
                  venta.ClienteCUIT !== undefined && clientesFiltered.length > 0 ?
                  <CustomizedTables
                    rows={clientesFiltered}
                    columns={columns}
                    idColumn="Cuit"
                    onRowClick={id=>{handleChangeClienteSeleccionado(id)}}
                    height={150}
                  /> :
                  <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                  </Box>
                  // <>
                  //   <Box sx={{ maxWidth: "60%" }}>
                  //     <FormControl fullWidth>
                  //       <InputLabel id="demo-simple-select-label">Cliente</InputLabel>
                  //       <Select
                  //         disabled={props.isAssociate}
                  //         labelId="demo-simple-select-label"
                  //         id="demo-simple-select"
                  //         defaultValue={venta.ClienteCuit}
                  //         value={venta.ClienteCuit}
                  //         onChange={handleChangeCliente}
                  //       >
                  //         {
                  //           clientesFiltered.map((cliente, index) => {
                  //             console.log(cliente);
                  //             return <MenuItem key={index} value={cliente.Cuit}>{cliente.NombreApellido}</MenuItem>
                  //           })
                  //         }
                  //       </Select>
                  //     </FormControl>
                  //   </Box>
                  // </> 
                }
                <br/>
                <FormControl disabled /* sx={{ maxWidth: "30%" }} */>
                  <InputLabel> Cliente </InputLabel>
                  <Input onChange={onChangeNombreCliente} id="my-input" aria-describedby="my-helper-text" value={venta?.Cliente?.NombreApellido ?? ""} />
                </FormControl>
              </FormGroup>
              <FlexContainer alignX="space-between">
                <TableProductos onProductSelect={(id, producto)=>onProductSelect(id, producto)} width={400}/>
                <FlexContainer flexDirection="column" alignX="center" alignY="center">
                  <FormControl>
                    Producto
                    <Input value={selectedProducto.Descripcion} disabled/>
                  </FormControl>
                  <br/>
                  <FormControl>
                    <FlexContainer alignX="space-between" style={{maxWidth: 220}}>
                      <Box sx={{maxWidth: 70}}>
                        Cantidad
                        <Input />
                      </Box>
                      <Button variant="outlined" size="small" onClick={()=>{}}>Agregar</Button>
                    </FlexContainer>
                    <br/>
                    <FlexContainer style={{minWidth: 200}} alignX="flex-end">
                      <Box sx={{minWidth: 70}}>
                        <Button variant="outlined" color="error" size="small" onClick={()=>{}}>Quitar</Button>
                      </Box>
                    </FlexContainer>
                  </FormControl>
                </FlexContainer>
                <FlexContainer alignY="start">
                  <CustomizedTables height={600} width={400} columns={productColumns} data={productsInSale}/>
                </FlexContainer>
              </FlexContainer>
              <FormButtonsContainer>
                <Button variant="outlined" size="large" onClick={goBack}>Cancelar</Button>
                <Button variant="contained" size="large" onClick={onSave}>Guardar</Button>
              </FormButtonsContainer>
          </FormPageContainer>
        </>
    </FlexContainer>
  );
};

export default NewVenta;
