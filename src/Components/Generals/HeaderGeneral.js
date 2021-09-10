import React, { Component } from 'react'
import "./HeaderGeneral.scss"
import "./HeaderGeneral_mobile.scss"


export default class HeaderGeneral extends Component {
    render() {
        return (
            <div className="HeaderGeneralContainer">
                <h1>Mako - Directorio comercial</h1>
                <img loading="lazy"  src={require("../../../src/Images/logo_Mako_Directorio_Comercial_Colombia_512x512.png")} alt="📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆" title="📖✔ Directorio con súper poderes para empresas.👦 ↔ 🏭 Conectamos usuarios con el comercio en general de forma interactiva y eficaz. 🔍 Busca productos y servicios de tus tiendas favoritas, síguelas, chatea con ellos, cotiza tus productos y guarda en tus contactos para que puedas consultarlos sin conexión a internet.👆"/>
            </div>
        )
    }
}
