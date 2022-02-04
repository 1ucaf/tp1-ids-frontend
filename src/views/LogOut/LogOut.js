import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FlexContainer from '../../components/Containers/FlexContainer';

const LogOut = () => {
    const navigateTo = useNavigate();
    return (
        <>
            <FlexContainer margin="20px">
                Se ha cerrado sesión
            </FlexContainer>
            <FlexContainer>
                <Button onClick={()=>{navigateTo("/")}} variant="contained">Continuar</Button>
            </FlexContainer>
        </>
    );
};

export default LogOut;
