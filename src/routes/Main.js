import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from '../views/Home/Home';
import {  useRecoilState, useRecoilValue } from 'recoil';
import { token, userName } from "../recoil/atom/atoms";
import { getToken, setToken } from '../utils/Utils';
import NavBar from '../components/NavBar/NavBar';
import Login from '../views/Login/Login';
import LogOut from '../views/LogOut/LogOut';
import Productos from '../views/Productos/Productos';


const routes = [
  {
      text: "Home",
      path: "/"
  },
  {
      text: "Productos",
      path: "/productos"
  },
]
const Main = () => {
  const userNameState = useRecoilValue(userName);
  const [tokenAtom, setTokenAtom] = useRecoilState(token);
  useEffect(()=>{
      setTokenAtom( getToken() );
  }, [setTokenAtom])
  const closeSession = ()=>{
    setTokenAtom("");
    setToken("");
  }
  return (
    <Router>
        <NavBar userName={userNameState} closeSession={closeSession} thereIsAnyToken={tokenAtom} routes={routes}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/logout" element={<LogOut />}/>
          <Route exact path="/productos" element={<Productos />}/>
        </Routes>
    </Router>
  );
};

export default Main;
