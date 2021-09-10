import React, { Component } from 'react'
import "./ContactoDE.scss"
import "./ContactoDEMobile.scss"
import TUbicacion from './Tarjetas/TUbicacion';
import TTelefono from './Tarjetas/TTelefono';
import TServicio from './Tarjetas/TServicio';
import THorarios from './Tarjetas/THorarios'
import TDomicilio from './Tarjetas/TDomicilio'
import TVCHoras from './Tarjetas/TVCHoras'
import TSocialNet from './Tarjetas/TSocialNet'


import request from 'superagent';

export default class ContactoDE extends Component {

       //.................................CONSTRUICTOR........................  

  constructor(props) {
    super(props);

     this.state = {
      orden: '',
      activo: '',
      codigo: this.props.id,
      nombre: '',
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
      idMun: 0,
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


  
  componentDidMount(){
    this.getInfo();
}


  getInfo(){

    request
        .get('/response/empresas/'+this.props.id)
        .set('accept', 'json')
        .end((err, res) => {
                if (err) {
                    console.log(err);

                } else {
                    
                const responseJson =   JSON.parse(res.text)[0];
                this.setState({
                  id: responseJson.orden,
                  fechaRegistro: responseJson.fechaRegistro,
                  activo: responseJson.activo,
                  codigo: responseJson.codigo,
                  nombre: responseJson.nombre,
                  descripcion: responseJson.descripcion,
                  direccion: responseJson.direccion,
                  VChoras: responseJson.vc_horas,
                  domicilio: responseJson.domicilio,
                  costo_domicilio: responseJson.costo_domicilio,
                  pagina_web: responseJson.pagina_web,
                  url_logo: responseJson.url_logo,
                  categoria: responseJson.categoria,
                  palabras_clave: responseJson.palabras_clave,
                  ubicacion_maps: responseJson.ubicacion_maps,
                  visto: responseJson.visto,
                  listado: responseJson.listado,
                  cantidad_de_votos: responseJson.cantidad_de_votos,
                  numero_de_votantes: responseJson.numero_de_votantes,
                  tipo_comercio: responseJson.tipo_comercio,
                  vip: responseJson.vip,
                  afiliacion_vip: responseJson.afiliacion_vip,
                  lat: responseJson.lat,
                  lng: responseJson.lng,
                  numPromo: responseJson.numPromo,
                  numSort: responseJson.numSort,
                  numInfo: responseJson.numInfo,
                  idMun: responseJson.idMun,
                })
                }
        });

    
    
}

    render() {
        return (
            <div className="ContactoDE">

                <div className="ContactoDELaterales ContactoDEIzquierda">
                    <TServicio servicio={this.state.descripcion}/>
                    <TUbicacion id={this.props.id}/>
                    <TTelefono id={this.props.id}/>                   
                </div>

                <div className="ContactoDELaterales ContactoDEDerecha">
                    <TSocialNet pagina={this.state.pagina_web} id={this.props.id}/>
                    <THorarios id={this.props.id}/>
                    <TDomicilio domicilio={this.state.domicilio} costoDomi={this.state.costo_domicilio} idMun={this.state.idMun}/>
                    {this.state.VChoras == 1? <TVCHoras/> : null}

                </div>

            </div>
        )
    }
}
