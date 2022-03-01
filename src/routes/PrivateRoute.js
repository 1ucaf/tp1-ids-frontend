import React from 'react';
import { token } from '../recoil/atom/atoms';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { getToken, getUserType } from '../utils/Utils';

const PrivateRoute = ({userTypeRequired, children}) => {
    const userType = getUserType();
    console.log(userTypeRequired, userType);
    const tokenAtom = getToken();
    return (tokenAtom && userType === userTypeRequired) ? children : <Navigate to="/login" /> ;
};

export default PrivateRoute;
