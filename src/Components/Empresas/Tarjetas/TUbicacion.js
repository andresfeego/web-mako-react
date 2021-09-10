import React, { Component } from 'react'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';
import './TUbicacion.scss'
import './TUbicacionMobile.scss'
import request from 'superagent';

export default class TUbicacion extends Component {

        //.................................CONSTRUICTOR........................  

  constructor(props) {
    super(props);

     this.state = {
      id: this.props.id,
      direccion: '',
      ubicacion_maps: '',
      lat: 0,
      lng: 0,
      colorCiudad: '',
      barrio: '',
      ciudad: '',
      idCiudad: '',
      
      altoMapa: 0,
      abrirMapa: 0,


      };  
  }

  componentDidMount(){
    this.getCiudad();
}


getCiudad(){

  request
  .get('/response/ciudades/barriociudad/'+this.state.id)
  .set('accept', 'json')
  .end((err, res) => {
            if (err) {
              console.log(err);

              } else {
                  
              const responseJson =   JSON.parse(res.text)[0];
              this.setState({
                colorCiudad: responseJson.color,
                barrio: responseJson.nombreBarrio,
                ciudad: responseJson.nombre,
                idCiudad: responseJson.id_ciudad,
                lat: responseJson.lat,
                lng: responseJson.lng,
                direccion: responseJson.direccion,
                ubicacion_maps: responseJson.ubicacion_maps,
              })
              }
  });

}


    render() {
        return (
            <div className="tarjetaContenido">
              <div>
                <LocationOnIcon className="tarjetaContenidoIcon" style={{ fontSize: 30 }} />
                <span >{this.state.direccion}</span>
                <br/>
                <span>{this.state.barrio + " - " }</span> <span style={{color:this.state.colorCiudad}}>{this.state.ciudad}</span>
              </div>
              <div className="botonInfo">
                <MapOutlinedIcon />
                 <span >Ver Mapa</span>
              </div>

            </div>
        )
    }
}
