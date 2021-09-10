import React, { Component } from 'react'
import "./HeaderEmpresa.scss"
import "./HeaderEmpresaMobile.scss"
import Visibility from '@material-ui/icons/Visibility';
import Loyalty from '@material-ui/icons/Loyalty';
import Info from '@material-ui/icons/Info';
import request from 'superagent';
import { Helmet } from "react-helmet";

export default class HeaderEmpresa extends Component {


    //.................................CONSTRUICTOR........................  

    constructor(props) {
        super(props);

        this.state = {
            codigo: this.props.id,
            nombre: '',
            ciudad: '',
            departamento: '',
            descripcion: '',
            palabras_clave: '',
            slogan: '',
            url_logo: '',
            colorEmp: '',
            visto: '',
            promos: 0,
            infos: 0,
            cantidad_de_votos: '',
            numero_de_votantes: ''

        };


    }

    componentDidMount() {
        this.getInfo();
    }


    getInfo() {

        request
            .get('/response/empresas/' + this.props.id)
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    console.log(err);

                } else {
                    const responseJson = JSON.parse(res.text)[0];

                    this.setState({
                        nombre: responseJson.nombre,
                        descripcion: responseJson.descripcion,
                        slogan: responseJson.slogan,
                        url_logo: responseJson.url_logo,
                        ciudad: responseJson.nombreMun,
                        departamento: responseJson.nombreDep,
                        colorEmp: responseJson.colorPrimario,
                        palabras_clave: responseJson.palabras_clave,
                        visto: responseJson.visto,
                        cantidad_de_votos: responseJson.cantidad_de_votos,
                        numero_de_votantes: responseJson.numero_de_votantes,
                    })
                }
            });



    }

    render() {

        let urllogo = 'https://www.mako.guru/src/' + this.state.url_logo;


        return (
            <div className="headerEmp" style={{ backgroundColor: this.state.colorEmp }}>

                <Helmet>
                    <title>{this.state.nombre + " " + this.state.ciudad + " " + this.state.departamento}</title>
                    <meta name="description" content={"📖✔ " + this.state.descripcion + " 👆"} />
                    <meta name="thumbnail" content={urllogo} />
                    <meta name="keywords" content={this.state.palabras_clave} />
                    <meta name="author" content="Feego System - Desarrolladores de software - Sogamoso - Boyacá - Colombia" />
                    <meta name="robots" content="index,follow,all" data-react-helmet="true" />
                    <meta name="publisher" content="Feego System - Desarrolladores de software - Sogamoso - Boyacá - Colombia (feegosystem.com)" data-react-helmet="true" />


                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={this.state.nombre + "-" + this.state.ciudad + "-" + this.state.departamento} />
                    <meta property="og:description" content={"📖✔ " + this.state.slogan + this.state.descripcion + " 👆 "} />
                    <meta property="og:image" content={urllogo} />
                    <meta property="og:url" content={"https://www.mako.guru/directorio/empresas/" + this.state.codigo} />

                    <link rel="canonical" href={"https://www.mako.guru/directorio/empresas/" + this.state.codigo} />

                </Helmet>

                <img loading="lazy" className="logoDetalleEmp" src={urllogo} alt={this.state.nombre + "-" + this.state.descripcion} title={this.state.nombre + "-" + this.state.ciudad + "-" + this.state.departamento} />

                <div className="descripcionEmp">
                    <h1>{this.state.nombre}</h1>
                    <h2>{this.state.slogan}</h2>
                    <h2>{this.state.descripcion}</h2>
                    <div className="cal_VisDetalleEmp">

                        <div className="calificacionesDetalleEmp">

                        </div>

                        <div className="vistasDetalleEmp">
                            <div className="iconoVistas">
                                <Visibility className="colorVistos" />
                                <span>{this.state.visto}</span>
                            </div>

                            <div className="iconoVistas">
                                <Loyalty className="colorPromos" />
                                <span>{this.state.promos}</span>
                            </div>

                            <div className="iconoVistas">
                                <Info className="colorInfos" />
                                <span>{this.state.infos}</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}
