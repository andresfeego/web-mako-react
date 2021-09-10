import React, { Component } from 'react'
import "./Empresa.scss"
import "./EmpresaMobile.scss"
import { Link } from 'react-router-dom';


export default class Empresa extends Component {



    MaysPrimera(string){
        var salida = string.toLowerCase();
        return salida.charAt(0).toUpperCase() + salida.slice(1);
    }


    
      
    render() {

        const urllogo = 'https://www.mako.guru/src/'+this.props.empresa.url_logo;


        return (
            <Link className="Empresa" to={"/directorio/empresas/"+this.props.empresa.codigo} title={this.props.empresa.nombre + " - " + this.props.empresa.slogan + " - " + this.props.empresa.descripcion + " - Mako directorio empresarial"}>
                <div className="logoEmpresa" style={{border: '2px solid ',borderColor: this.props.empresa.color}}>
                    <img loading="lazy" src={urllogo} alt={this.props.empresa.nombre + " - " + this.props.empresa.slogan + " - " + this.props.empresa.descripcion} title={this.props.empresa.nombre + " - " + this.props.empresa.slogan + " - " + this.props.empresa.descripcion}/>
                </div>
                <div className="textoEmpresa">
                    <h2 className="razonSocial">{this.props.empresa.nombre.toProperCase()}</h2>
                    <h3 className="ciudad">{this.MaysPrimera(this.props.empresa.nombreDep) + " - " + this.MaysPrimera(this.props.empresa.nombreMun)}</h3>
                    <h3 className="descripcion">{this.MaysPrimera(this.props.empresa.slogan)}</h3>
                </div>
            </Link>
        )
    }
}


String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};