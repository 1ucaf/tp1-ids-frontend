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

    const onChangeLegajo = e => {
        setUsuario({...usuario,
            Legajo: e.target.value,
        })
    }
    const onChangeEmail = e => {
        setUsuario({...usuario,
            Email: e.target.value,
        })
    }
    const onChangeNombre = e => {
        setUsuario({...usuario,
            Nombre: e.target.value,
        })
    }
    const onChangeApellido = e => {
        setUsuario({...usuario,
            Apellido: e.target.value,
        })
    }
    const onChangeTipoUsuario = e => {
        setUsuario({...usuario,
            tipoUsuario: e.target.value,
        })
    }

    const goBack = () => {
        navigateTo("/usuarios");
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
                    <FormControl sx={{ minWidth: "40%" }}>
                        <small> Legajo </small>
                        <Input onChange={onChangeLegajo} id="my-input" aria-describedby="my-helper-text"/>
                    </FormControl>
                    <FormControl sx={{ minWidth: "40%" }}>
                        <small> Email </small>
                        <Input onChange={onChangeEmail} id="my-input" aria-describedby="my-helper-text"/>
                    </FormControl>
                    <FormControl sx={{ minWidth: "40%" }}>
                        <small> Nombre </small>
                        <Input onChange={onChangeNombre} id="my-input" aria-describedby="my-helper-text"/>
                    </FormControl>
                    <FormControl sx={{ minWidth: "40%" }}>
                        <small> Apellido </small>
                        <Input onChange={onChangeApellido} id="my-input" aria-describedby="my-helper-text"/>
                    </FormControl>
                    <FormControl sx={{ minWidth: "40%" }}>
                        <small> Tipo de Usuario </small>
                        {/* <Input onChange={onChangeTipoUsuario} id="my-input" aria-describedby="my-helper-text"/> */}
                        <form>
                        <select> 
                            <option>Vendedor</option>
                            <option>Administrador</option> 
                        </select>
                        </form>
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
