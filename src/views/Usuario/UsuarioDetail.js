import { Button, FormControl, Input } from '@mui/material';
import FormGroup from "../../components/Containers/FormGroup";
import React, { useEffect, useState } from 'react';
import FormPageContainer from '../../components/Containers/FormPageContainer';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteUsuarioApiCall, getUsuarioApiCall, saveUsuarioApiCall } from '../../api/UsuariosApiCalls';
import FormButtonsContainer from '../../components/Containers/FormButtonsContainer';
import ModalComponent from '../../components/Modal/ModalComponent';

const UsuarioDetail = props => {
    const navigateTo = useNavigate();

    const { usuarioId } = useParams();

    const [usuario, setUsuario] = useState({});
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
        if(usuarioId) {
            getUsuarioApiCall(usuarioId)
            .then((data)=>{
                console.log(data);
                setUsuario(data);
            });
        }
        else {
            setUsuario({Legajo: 0});
        }
    }, [])

    
    const onDelete = () => {
        deleteUsuarioApiCall(usuario.Id)
        .then(data => {
            console.log(data);
            setModalProps({
                ...modalProps,
                title: "¡Eliminado!",
                show: true,
                type: "",
                message: "El usuario '" + usuario.UserName + "' fue eliminado con éxito",
                afterCloseModal: goBack,
            })
        })
    }

    
    const onConfirmDelete = () => {
        setModalProps({
            ...modalProps,
            title: "Borrar",
            show: true,
            type: "delete",
            message: "¿Está seguro que desea eliminar el usuario'" + usuario.UserName + "'?",
            onDelete: onDelete,
        })
    }

    const onChangeDescripcion = e => {
        setUsuario({...usuario,
            Descripcion: e.target.value,
        })
    }

    const goBack = () => {
        navigateTo("/usuario");
    }

    const onSave = () => {
        saveUsuarioApiCall(usuario.Legajo, usuario)
        .then(response=>{
            setModalProps({
                title: "Guardado",
                show: true,
                message: "Usuario " + usuario.UserName + " guardado con éxito",
                afterCloseModal: goBack
            })
        })
    }

    return (
        <>
            <ModalComponent modalProps={modalProps} onCloseModal={onCloseModal}/>
            <FormPageContainer>
                {
                    !props.isNew?
                    <FormGroup>
                        <Button onClick={onConfirmDelete} variant="contained" aria-label="delete" size="large" color="error">
                            Eliminar
                            <DeleteIcon fontSize="inherit" />
                        </Button>
                    </FormGroup>
                    : <></>
                }
                <FormGroup>
                    <FormControl sx={{ minWidth: "30%" }}>
                        <small> Código </small>
                        <Input id="my-input" aria-describedby="my-helper-text" disabled value={usuario.Legajo ?? ""} />
                    </FormControl>
                    <FormControl sx={{ minWidth: "60%" }}>
                        <small> Descripción </small>
                        <Input onChange={onChangeDescripcion} id="my-input" aria-describedby="my-helper-text" value={usuario.UserName ?? ""} />
                    </FormControl>
                </FormGroup>
                <FormButtonsContainer>
                    <Button variant="outlined" size="large" onClick={goBack}>Cancelar</Button>
                    <Button variant="contained" size="large" onClick={onSave}>Guardar</Button>
                </FormButtonsContainer>
            </FormPageContainer>
        </>
    );
};

export default UsuarioDetail;
