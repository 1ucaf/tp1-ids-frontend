import React, { useEffect, useState } from 'react'
import { getAllVentasApiCall } from '../../api/VentasApiCalls';
import TablePageContainer from '../../components/Containers/TablePageContainer';
import Modal from '../../components/Modal/ModalComponent';
import CustomizedTables from '../../components/table/Table';

const columns = [
    {
      headerText: "Id",
      selector: "Id",
      hidden: true
    },
    {
      headerText: "Cliente",
      selector: "Cliente",
    },
    {
      headerText: "Vendedor",
      selector: "Vendedor",
    },
    {
      headerText: "Fecha",
      selector: "Fecha",
    },
    {
      headerText: "Monto",
      selector: "Monto",
    },
];

const Ventas = () => {
    const [ventas, setVentas] = useState([]);

    const [modalProps, setModalProps] = useState({
        title: "",
        message: "",
        type: "",
        show: false,
        afterCloseModal: ()=>{}
    })

    const onError = e => {
        console.log(e.response.data);
        if(e.response?.status === 401) {
            setModalProps({
                ...modalProps,
                title: "No Autorizado!",
                show: true,
                type: "error",
                message: "Usuario o Contraseña Incorrectos!",
            })
        } else {
            setModalProps({
                ...modalProps,
                title: "ERROR!",
                show: true,
                type: "error",
                message: e.response.data.ExceptionMessage ?? e.message,
            })
        }
    }

    const onCloseModal = ()=>{
        console.log("cerrar");
        setModalProps(
            {...modalProps,
                show: false,
            }
        )
    }

    useEffect(()=>{
        getAllVentasApiCall()
        .then(data=>{
            setVentas(data);
        })
        .catch(onError)
    },[])
    return (
        <>
            <Modal modalProps={modalProps} onCloseModal={onCloseModal}/>
            <TablePageContainer>
                <h1 align="center">Ventas</h1>
                <CustomizedTables
                    rows={ventas}
                    columns={columns}
                />
            </TablePageContainer>
        </>
    )
}

export default Ventas