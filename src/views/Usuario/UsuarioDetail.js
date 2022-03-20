import { Box, Button, FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material';
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
    const onChangeApellidoYNombre = e => {
        setUsuario({...usuario,
            ApellidoYNombre: e.target.value,
        })
    }
    const onChangeUserName = e => {
        setUsuario({...usuario,
            UserName: e.target.value,
        })
    }
    const onChangePassword = e => {
        setUsuario({...usuario,
            Password: e.target.value,
        })
    }
    const onChangeTipoUsuario = e => {
        setUsuario({...usuario,
            TipoUsuario: e.target.value,
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
                    <FormControl sx={{ minWidth: "45%" }}>
                        <small> Legajo </small>
                        <Input onChange={onChangeLegajo} id="my-input" aria-describedby="my-helper-text"/>
                    </FormControl>
                    <FormControl sx={{ minWidth: "45%" }}>
                        <small> Email </small>
                        <Input onChange={onChangeEmail} id="my-input" aria-describedby="my-helper-text"/>
                    </FormControl>
                    <FormControl sx={{ minWidth: "45%" }}>
                        <small> Apellido y Nombre </small>
                        <Input onChange={onChangeApellidoYNombre} id="my-input" aria-describedby="my-helper-text"/>
                    </FormControl>
                    <FormControl sx={{ minWidth: "45%" }}>
                        <small> Username </small>
                        <Input onChange={onChangeUserName} id="my-input" aria-describedby="my-helper-text"/>
                    </FormControl>
                    <FormControl sx={{ minWidth: "45%" }}>
                        <small> Contraseña </small>
                        <Input onChange={onChangePassword} id="my-input" aria-describedby="my-helper-text"  type='password'/>
                    </FormControl>
                    
                        <Box sx={{ minWidth: "45%" }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Tipo de Usuario</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={usuario.TipoUsuario}
                                    label="Tipo de Usuario"
                                    onChange={onChangeTipoUsuario}
                                >
                                    <MenuItem value={0}>Vendedor</MenuItem>
                                    <MenuItem value={1}>Administrador</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
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
