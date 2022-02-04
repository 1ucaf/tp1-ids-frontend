import React from 'react';
import { token } from '../recoil/atom/atoms';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

const PrivateRoute = ({children}) => {
    const tokenAtom = useRecoilValue(token);
    return tokenAtom ? children : <Navigate to="logout" /> ;
};

export default PrivateRoute;
