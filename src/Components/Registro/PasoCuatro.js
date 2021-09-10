import React, { Component } from 'react'
import "./PasoCuatro.scss"
import "./PasoCuatro_mobile.scss"
import request from 'superagent';
import { FormControl, InputLabel, Select, Input } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { nuevoMensaje, tiposAlertas } from '../../Inicialized/Toast';



const marcadorPosicion = () => <div>{"Tu ubicación"}</div>;


class PasoCuatro extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ds: [],
      departamentos: [],
      departamento: '',
      municipios: [],
      municipio: '',
      barrios: [],
      barrio: 0,
      direccion: '',
      lat: '5.669836924661752',
      lng: '-73.1353994121094',
      zoom: 10


    };


  }

  /* componentDidMount() {
      this.getLocation()
  }
   */
  onMarkerDragEnd = (coord, index) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState(prevState => {
      const markers = [...this.state.markers];
      markers[index] = { ...markers[index], position: { lat, lng } };
      return { markers };
    });
  }



  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  UNSAFE_componentWillMount() {
    this.getDerMun();
    this.getdepartamentos();
  }


  getDerMun() {
    request
      .get('/response/departamentosMunicipios')
      .set('accept', 'json')
      .end((err, res) => {
        if (err) {
          console.log(err);

        } else {

          const respuestaLogin = JSON.parse(res.text);
          this.setState({
            ds: respuestaLogin,
          })
        }
      });


  }


  getdepartamentos() {
    nuevoMensaje(tiposAlertas.cargando, "Cargando lista de departamentos, por favor espere...")

    request
      .get('/response/departamentos')
      .set('accept', 'json')
      .end((err, res) => {
        if (err) {
          console.log(err);

        } else {
          nuevoMensaje(tiposAlertas.cargadoSuccess, "Departamentos listados")
          const respuestaLogin = JSON.parse(res.text);
          this.setState({
            departamentos: respuestaLogin,
          })
        }
      });


  }

  getMunicipios(codDep) {
    nuevoMensaje(tiposAlertas.cargando, "Cargando lista de municipios, por favor espere...")

    request
      .get('/response/municipios/' + codDep)
      .set('accept', 'json')
      .end((err, res) => {
        if (err) {
          console.log(err);

        } else {
          nuevoMensaje(tiposAlertas.cargadoSuccess, "Municipios listados")

          const respuestaLogin = JSON.parse(res.text);
          this.setState({
            municipios: respuestaLogin,
          })
        }
      });


  }

  getBarrios(codMun) {
    nuevoMensaje(tiposAlertas.cargando, "Cargando lista de barrios, por favor espere...")

    request
      .get('/response/barrios/' + codMun)
      .set('accept', 'json')
      .end((err, res) => {
        if (err) {
          console.log(err);

        } else {
          nuevoMensaje(tiposAlertas.cargadoSuccess, "Barrios listados")

          const respuestaLogin = JSON.parse(res.text);
          this.setState({
            barrios: respuestaLogin,
          })

        }
      });


  }

  handleChangeDepartamento = (event) => {

    this.setState({ municipio: '', municipios: [] });

    const name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
    this.getMunicipios(event.target.value);
  };

  handleChangeMunicipio = (event) => {

    this.setState({ barrio: 0, barrios: [] });

    const name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
    this.getBarrios(event.target.value);
  };

  handleChangeBarrios = (event) => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
  };

  getLocation = () => {
    nuevoMensaje(tiposAlertas.cargando, "Cargando lista de departamentos, por favor espere...")

    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = pos.coords;

        /*  let newState = Object.assign({}, this.state);
         newState.markers[0].position.lat = coords.latitude;
         newState.markers[0].position.lng = coords.longitude; */

        this.setState({
          lat: coords.latitude,
          lng: coords.longitude,
          zoom: 15
        })
        nuevoMensaje(tiposAlertas.cargadoSuccess, "Hemos obtenido tu ubicación")

      });
    } else {
      nuevoMensaje(tiposAlertas.cargadoError, "Imposible obtener tu ubicación, quiza no tengas configurados los permisos para este navegador")
    }
  }


  onMarkerDragEnd = (coord, index) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState({
      lat: lat,
      lng: lng
    })
  };


  actualizaPaso() {


    request
      .post('/response/empresas/registro/actualizaPaso')
      .send({ codigo: this.props.codigo.codigo, paso: 5 }) // sends a JSON post body
      .set('accept', 'json')
      .end((err, res) => {

        if (err) {
          nuevoMensaje(tiposAlertas.cargadoError, "Error al guardar información, intenta guardar de nuevo en unos minutos por favor");
        } else {
          nuevoMensaje(tiposAlertas.cargadoSuccess, "Información actualizada, sigamos con el paso 5");
          this.props.fun.setCurrentStep(5);

        }


      });

  }

  guardaInfo() {

    request
      .post('/response/empresas/registro/updateUbicacion')
      .send({ codigo: this.props.codigo.codigo, direccion: this.state.direccion, municipio: this.state.municipio, barrio: this.state.barrio, lat: this.state.lat, lng: this.state.lng }) // sends a JSON post body
      .set('accept', 'json')
      .end((err, res) => {

        if (err) {
          nuevoMensaje(tiposAlertas.cargadoError, "Error al guardar información, intenta guardar de nuevo en unos minutos por favor");
        } else {

          this.actualizaPaso();
        }


      });

  }



  validarInfo = () => {

    nuevoMensaje(tiposAlertas.cargando, "Validando")

    if (this.state.departamento == "") {
      nuevoMensaje(tiposAlertas.cargadoError, "Debes escoger un departamento");
    } else {
      if (this.state.municipio == "") {
        nuevoMensaje(tiposAlertas.cargadoError, "Debes escoger un municipio");
      } else {

        if (this.state.direccion == '') {
          nuevoMensaje(tiposAlertas.cargadoError, "Ingresa la dirección de tu empresa");
        } else {

          this.guardaInfo();


        }

      }
    }

  }


  render() {
    return (
      <div className="busquedaDepartamento">

        <form noValidate className="formularioRegistroEmp">
          <div className="selectDepertamentos">
            {this.state.departamentos.length > 0 ?
              <FormControl className={this.props.classes.formControl}>
                <InputLabel className={this.props.classes.formControlInput} htmlFor="age-native-simple">Departamento</InputLabel>
                <Select
                  native
                  value={this.state.departamento}
                  onChange={(event) => this.handleChangeDepartamento(event)}
                  inputProps={{
                    name: 'departamento',
                    id: 'departamento',
                  }}
                >
                  <option aria-label="None" value="" />
                  {this.state.departamentos.map((item) => <option value={item.codigo}>{item.nombre}</option>)}
                </Select>
              </FormControl>
              :
              [<span className="descripcionDos">Cargando lista de departamentos</span>, <br />]
            }

            {this.state.municipios.length > 0 ?
              <FormControl className={this.props.classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Municipio</InputLabel>
                <Select
                  native
                  value={this.state.municipio}
                  onChange={(event) => this.handleChangeMunicipio(event)}
                  inputProps={{
                    name: 'municipio',
                    id: 'municipio',
                  }}
                >
                  <option aria-label="None" value="" />
                  {this.state.municipios.map((item) => <option value={item.id}>{item.nombre.toProperCase()}</option>)}
                </Select>
              </FormControl>
              :
              [<span className="descripcionDos">Escoge un Departamento para listar municipios</span>, <br />]
            }

            {this.state.barrios.length > 0 ?
              <FormControl className={this.props.classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Barrio</InputLabel>
                <Select
                  native
                  value={this.state.barrio}
                  onChange={(event) => this.handleChangeBarrios(event)}
                  inputProps={{
                    name: 'barrio',
                    id: 'barrio',
                  }}
                >
                  <option aria-label="Sin especificar" value="0" />
                  {this.state.barrios.map((item) => <option value={item.idBarrio}>{item.nombreBarrio.toProperCase()}</option>)}
                </Select>
              </FormControl>
              :
              [<span className="descripcionDos">Escoge un Municipio para listar barrios si los hay</span>, <br />]
            }
          </div>

          <Input className="inputform" type="text" placeholder="Dirección" value={this.state.direccion} name="direccion" onChange={this.onChange} />

          <div className="inputform buttonTres" onClick={this.getLocation}>Pedir ubicación</div>

          <span className="descripcionDos">Puedes pedir tu ubicación si estas en tu empresa en este momento d elo contrario, puedes mover el punto en el mapa hasta la ubicacion de tu empresa</span>
          <div className="mapaPasoCuatro">
            <Map
              google={this.props.google}
              style={{
                width: "100%",
                height: "100%"
              }}
              zoom={this.state.zoom}
              center={{ lat: this.state.lat, lng: this.state.lng }}
            >
              <Marker
                key={1}
                position={{ lat: this.state.lat, lng: this.state.lng }}
                draggable={true}
                onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, 1)}
                name={'Mi posición'}
              />
            </Map>
          </div>
          <div className="inputform buttonUno" onClick={this.validarInfo}>Guardar</div>

        </form>

      </div>


    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDh3jyWqBKAx7bhRlB4sJ8d0UYvGGm2Xdg'
})(withStyles({


  formControl: {
    width: '100%',
    margin: "0em 0em 1em 0em",
    minWidth: 120,
  },

  formControlInput: {
  },



})(PasoCuatro));


String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};

