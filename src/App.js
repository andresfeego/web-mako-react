import React, { Component } from 'react';
import './App.scss';
import General from './Components/Generals/General';
import RegistroEmpresa from './Components/Registro/RegistroEmpresa'
import FondoInfo from './Components/Generals/FondoInfo';
import DetalleEmpresa from './Components/Empresas/DetalleEmpresa';
import HeaderGeneral from './Components/Generals/HeaderGeneral'
import {BrowserRouter, Route} from 'react-router-dom';


export default class App extends Component {
  render() {

    return (
      <BrowserRouter>
      
      <Route path="/directorio/empresas" component={FondoInfo}/>
      <Route path="/directorio/empresas/:id" component={DetalleEmpresa}/>
      
      <Route path="/directorio/:id" component={FondoInfo}/>
      <Route exact path="/directorio/:id" component={DetalleEmpresa}/>
      
      <Route path="/directorio" component={General}/>
      
      <Route path="/busqueda/:producto/:ciudad" component={General}/>

      <Route path="/registro" component={HeaderGeneral}/>
      <Route path="/registro" component={RegistroEmpresa}/>


      
      </BrowserRouter>
    );
  }
}

