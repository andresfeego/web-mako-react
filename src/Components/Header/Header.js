import React, { Component } from 'react'
import Slide from './Slide';
import BarraBusqueda from './BarraBusqueda';
import BusquedaCiudad from './BusquedaCiudad';
import BusquedaCategorias from './BusquedaCategorias'


import { withStyles } from '@material-ui/core/styles'
import './Header.scss'
import './HeaderMobile.scss'

class Header extends Component {
    render() {
        return (

            <div className="header">
                <div className="fondoHeader" />
                <div className="tituloMako">
                    <img className="imgMakoLogo" loading="lazy" src={require("../../../src/Images/logo_Mako_Directorio_Comercial_Colombia_512x512.png")} alt="📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆" title="📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆" />
                    <h1 className="makoNombre">.: Mako :. Directorio comercial</h1>
                </div>

                <BarraBusqueda />
                <BusquedaCiudad />
                <BusquedaCategorias />
                <Slide />

            </div>

        )
    }

}

export default withStyles({



})(Header);