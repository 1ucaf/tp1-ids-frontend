import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from '../views/Home/Home';
import {  useRecoilState } from 'recoil';
import { token, userName, userType } from "../recoil/atom/atoms";
import { getToken, getUserName, getUserType, setToken, setUserNameCookie, setUserTypeCookie } from '../utils/Utils';
import NavBar from '../components/NavBar/NavBar';
import Login from '../views/Login/Login';
import LogOut from '../views/LogOut/LogOut';
import Productos from '../views/Productos/Productos';
import { ProductoDetail } from '../views/Productos/ProductoDetail';
import Marcas from '../views/Marca/Marcas';
import MarcaDetail from '../views/Marca/MarcaDetail';


const routesAdmin = [
  {
      text: "Home",
      path: "/"
  },
  {
      text: "Productos",
      path: "/productos"
  },
  {
      text: "Marcas",
      path: "/marcas"
  },
];

const routesSalesMan = [
  {
      text: "Home",
      path: "/"
  },
  {
      text: "Ventas",
      path: "/ventas"
  },
]
const Main = () => {
  const [routes, setRoutes] = useState();

  const [tokenAtom, setTokenAtom] = useRecoilState(token);
  const [userTypeState, setUserTypeState] = useRecoilState(userType);
  const [userNameState, setUserNameState] = useRecoilState(userName);

  useEffect(()=>{
      setTokenAtom( getToken() );
      setUserTypeState( getUserType() );
      setUserNameState( getUserName() );

      setRoutes(userTypeState === "Administrador" ? routesAdmin : routesSalesMan);
      console.log(userTypeState);
  }, [setTokenAtom, setUserNameState, setUserTypeState, userTypeState]);

  const closeSession = ()=>{
    setTokenAtom("");
    setToken("");
    setUserTypeState("");
    setUserTypeCookie("");
    setUserNameState("");
    setUserNameCookie("");
  }

  return (
    <Router>
        <NavBar userName={userNameState} closeSession={closeSession} thereIsAnyToken={tokenAtom} routes={routes}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/logout" element={<LogOut />}/>
          <Route path="/productos">
            <Route path="" element={<Productos />}/>
            <Route path=":productoId" element={<ProductoDetail />}/>
            <Route path="new" element={ <ProductoDetail isNew={true} /> }/>
          </Route>
          <Route path="/marcas">
            <Route path="" element={<Marcas />}/>
            <Route path=":marcaId" element={<MarcaDetail />}/>
            <Route path="new" element={<MarcaDetail isNew={true} />}/>
          </Route>
          <Route path="/ventas">
            {/* <Route path="" element={<Productos />}/>
            <Route path=":productoId" element={<ProductoDetail />}/>
            <Route path="new" element={<ProductoDetail isNew={true} />}/> */}
          </Route>
        </Routes>
    </Router>
  );
};

export default Main;
