import React, { Component } from 'react'
import "./DetalleEmpresa.scss"
import "./DetalleEmpresaMobile.scss"
import SlideDetalleEmpresa from './SlideDetalleEmpresa';
import HeaderEmpresa from './HeaderEmpresa';
import { Link } from "react-router-dom";

import Phone from '@material-ui/icons/Phone';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import ContactoDE from './ContactoDE';
import ShareIcon from '@material-ui/icons/Share';
import Clipboard from 'react-clipboard.js';
import { nuevoMensaje, tiposAlertas } from '../../Inicialized/Toast';


export default class Empresa extends Component {


    //.................................CONSTRUICTOR........................  

  constructor(props) {
    super(props);
    let codigoOrigen = this.props.match.params.id;
    
    if (this.props.location.search != '') {
        const search = this.props.location.search;
        var res = search.split("=", 2);
        codigoOrigen = res[1]
      }


     this.state = {
      orden: '',
      activo: '',
      nombre: '',
      codigo: codigoOrigen,
      descripcion: '',
      direccion: '',
      VChoras: '',
      domicilio: '',
      costo_domicilio: '',
      pagina_web: '',
      url_logo: '',
      categoria: '',
      palabras_clave: '',
      ubicacion_maps: '',
      visto: '',
      listado: '',
      cantidad_de_votos: '',
      numero_de_votantes: '',
      tipo_comercio: '',
      vip: '',
      afiliacion_vip: '',
      lat: 0,
      lng: 0,
      numSort: 0,
      numPromo: 0,
      numInfo: 0,
      colorCiudad: '',
      barrio: '',
      ciudad: '',
      idCiudad: '',
      correos:[],
      horarios:[],
      telefonos:[],
      altoMapa: 0,
      abrirMapa: 0,
      delta: 0.005,
      imagenes:[],


      };  

  }

  

  componentDidMount() {    
      document.body.style.overflow = 'hidden';
      
  }
  
  componentWillUnmount() {
      document.body.style.overflow = 'unset';
  }



    render() {
        return (
            <div className="DetalleEmpresa">

                   


                <Link className="cerrarDetalleEmp" to="/directorio" >
                    <span>X</span>
                </Link>
                <div className="shareIcon">
                    <Clipboard data-clipboard-text={"https://www.mako.guru/directorio/empresas/"+this.state.codigo}  onClick={() => nuevoMensaje(tiposAlertas.info, 'Link copiado al portapapeles ' +"https://www.mako.guru/directorio/empresas/"+this.state.codigo)}  className="clipBorad">
                        <ShareIcon style={{fontSize: 30}}/>
                    </Clipboard>
                </div>

                <div className="contDetalleEmpresa">
                    <div className="headerDetalleEmpresa" >
                        <HeaderEmpresa id={this.state.codigo}/>
                        <SlideDetalleEmpresa id={this.state.codigo}/>
                    </div>

                    <div className="InformacionDetalleEmpresa">
                        <ul className="menuIDE">
                            <li className="btnMenuIDE">
                                <span>Contacto</span>
                                <Phone className="iconoBtnMenuIDE"/>
                            </li>

                            <li className="btnMenuIDE">
                                <span>Promociones</span>
                                <LoyaltyIcon className="iconoBtnMenuIDE"/>  
                            </li>

                            <li className="btnMenuIDE">
                                <span>Chat</span>
                                <QuestionAnswerIcon className="iconoBtnMenuIDE"/>    
                            </li>
                        </ul>
                        <div className="contenidoIDE">
                            <ContactoDE id={this.state.codigo}/>
                        </div>
                        
                    </div>


                </div>
            </div>
        )
    }
}
