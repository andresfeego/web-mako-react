import React, { Component } from 'react'
import "./PasoSeis.scss"
import "./PasoSeis_mobile.scss"
import { Input, FormControl, Select, InputLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import request from 'superagent';
import { tiposAlertas, nuevoMensaje } from '../../Inicialized/Toast';
import CloseIcon from '@material-ui/icons/Close';

class PasoSeis extends Component {

    constructor(props) {
        super(props);
        this.state = {
            web: '',
            tipoRedes: [],
            tipoAccionRedes: 'agregar',

            redes: [],

            red: 0,
            nombreRed: '',
            usuarioRed: ''

        }
    }

    onChange = e => {
        var index = e.nativeEvent.target.selectedIndex;

        this.setState({
            [e.target.name]: e.target.value,
            nombreRed: e.nativeEvent.target[index].text

        });
    }

    onChangeInput = e => {

        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    componentDidMount() {
        this.getTipoRedes();
        this.getRedes();
    }


    getTipoRedes() {

        request
            .get('/response/tiposRedes')
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    console.log(err);

                } else {

                    const respuestaLogin = JSON.parse(res.text);
                    this.setState({
                        tipoRedes: respuestaLogin,
                    })
                }
            });


    }


    getRedes() {

        request
            .get('/response/empresas/redes/' + this.props.codigo.codigo)
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    console.log(err);

                } else {

                    const respuestaLogin = JSON.parse(res.text);
                    this.setState({
                        redes: respuestaLogin,
                    })
                }
            });


    }


    renderBotonAccionRedes() {
        switch (this.state.tipoAccionRedes) {
            case 'agregar':
                return <div className="inputform buttonTres" onClick={() => this.agregarRed()}>Agregar red social</div>
                break;

            case 'editar':
                return <div className="inputform buttonTres" onClick={() => this.editarRed()}>Editar</div>
                break;



            default:
                break;
        }
    }

    renderAyudaRed() {
        if (this.state.nombreRed == 'Youtube') {
            return <span>{"Ve a tu pagina o perfil de usuario en la red social y copia la parte verde de este ejemplo : \n www." + this.state.nombreRed + ".com/channel/"}<span className="nombreUsuario">tunombredeusuario</span> y pegalo en el siguiente campo de texto</span>
        } else {
            return <span>{"Ve a tu pagina o perfil de usuario en la red social y copia la parte verde de este ejemplo : \n www." + this.state.nombreRed + ".com/"}<span className="nombreUsuario">tunombredeusuario</span> y pegalo en el siguiente campo de texto</span>
        }
    }

    validarInfoRedes() {
        if (this.state.red == 0) {
            nuevoMensaje(tiposAlertas.error, "Escoge una red social para agregarla")
        } else {
            if (this.state.usuarioRed == '') {
                nuevoMensaje(tiposAlertas.error, "Ingresa el nombre de tu usuario para la red " + this.state.nombreRed)
            } else {
                return true
            }
        }
    }

    agregarRed() {
        if (this.validarInfoRedes()) {

            nuevoMensaje(tiposAlertas.cargando, "Guardando red social")
            request
                .post('/response/empresas/registro/agregarRed')
                .send({ codigo: this.props.codigo.codigo, red: this.state.red, usuarioRed: this.state.usuarioRed }) // sends a JSON post body
                .set('accept', 'json')
                .end((err, res) => {

                    if (err) {
                        nuevoMensaje(tiposAlertas.cargadoError, "Error al agregar red social, intenta guardar de nuevo en unos minutos por favor");
                    } else {
                        nuevoMensaje(tiposAlertas.cargadoSuccess, "Red social agregada");
                        this.setState({
                            red: 0,
                            usuarioRed: '',
                            nombreRed: '',
                        })
                        this.getRedes();
                    }


                });

        }
    }

    borrarRed(id) {


        nuevoMensaje(tiposAlertas.cargando, "Eliminando red social")
        request
            .post('/response/empresas/registro/borrarRed')
            .send({ idRed: id }) // sends a JSON post body
            .set('accept', 'json')
            .end((err, res) => {

                if (err) {
                    nuevoMensaje(tiposAlertas.cargadoError, "Error al eliminar red social, intenta guardar de nuevo en unos minutos por favor");
                } else {
                    nuevoMensaje(tiposAlertas.cargadoSuccess, "Red social eliminada");

                    this.getRedes();
                }


            });


    }

    actualizaPaso() {

        nuevoMensaje(tiposAlertas.cargando, "Guardando")

        request
            .post('/response/empresas/registro/actualizaPaso')
            .send({ codigo: this.props.codigo.codigo, paso: 7 }) // sends a JSON post body
            .set('accept', 'json')
            .end((err, res) => {

                if (err) {
                    nuevoMensaje(tiposAlertas.cargadoError, "Error al guardar información, intenta guardar de nuevo en unos minutos por favor");
                } else {
                    nuevoMensaje(tiposAlertas.cargadoSuccess, "Información actualizada, sigamos con el paso 7");
                    this.props.fun.setCurrentStep(7);

                }


            });

    }


    agregarWeb() {

        nuevoMensaje(tiposAlertas.cargando, "Actualizando página web")

        request
            .post('/response/empresas/registro/updateWeb')
            .send({ codigo: this.props.codigo.codigo, web: this.state.web }) // sends a JSON post body
            .set('accept', 'json')
            .end((err, res) => {

                if (err) {
                    nuevoMensaje(tiposAlertas.cargadoError, "Error al guardar información, intenta guardar de nuevo en unos minutos por favor");
                } else {
                    nuevoMensaje(tiposAlertas.cargadoSuccess, "Página web actualizada");
                    this.actualizaPaso();

                }


            });

    }

    seguir() {
        if (this.state.redes.length == 0) {
            nuevoMensaje(tiposAlertas.warn, "Debes agregar una red social")
        } else {

            if (this.state.web != '') {
                this.agregarWeb();
            } else {
                this.actualizaPaso();
            }
        }
    }


    render() {
        return (
            <div>
                <form noValidate className="formularioRegistroEmp formWeb">
                    <span>Ve a tu página web y copia el texto de la barra de navegación, podrás probar el link con el tobon " Ir a mi página"</span>
                    <Input className="inputform" type="text" placeholder="Pagina Web oficial ej: www.tuempresa.com" value={this.state.web} name="web" onChange={this.onChangeInput} />
                    <br />
                    {this.state.web != '' ? <a href={this.state.web} target="_black" className="buttonTres"> Ir a mi página </a> : null}

                    {this.state.redes.length > 0 ?
                        [<h2>Lista de redes sociales registradas</h2>,

                        <div className="contRedes">
                            {this.state.redes.map((item) =>
                                <div className="contRedeSocial">

                                    <a className="redSocial" href={item.paginaSocial + item.link} target="_blank" >
                                        <img loading="lazy" className="iconoRedes" src={require("../../Iconos/Redes/" + item.urlicono)} alt={item.descSocial + " " + item.nombre} />
                                        <span>{item.descSocial}</span>
                                    </a>
                                    <div className="contIconosAccionRedes">
                                        <div className="iconoAccion iconoAccionRedes iconoDelete">
                                            <CloseIcon style={{ fontSize: 15 }} onClick={() => this.borrarRed(item.id)} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        ]
                        :
                        null
                    }




                    <form noValidate className="formularioRegistroEmp formWeb">
                        <div className="selectDepertamentos">
                            {this.state.tipoRedes.length > 0 ?
                                <FormControl className={this.props.classes.formControl}>
                                    <InputLabel htmlFor="age-native-simple">Redes sociales</InputLabel>
                                    <Select
                                        native
                                        value={this.state.red}
                                        onChange={(event) => this.onChange(event)}
                                        inputProps={{
                                            name: 'red',
                                            id: 'red',
                                        }}
                                    >
                                        <option aria-label="Sin especificar" value="0" >Elige una red social</option>
                                        {this.state.tipoRedes.map((item) => <option value={item.id}>{item.descripcion}</option>)}
                                    </Select>
                                </FormControl>
                                :
                                <span>Cargando lista de redes sociales...</span>
                            }
                        </div>

                        {this.state.nombreRed != '' ? this.renderAyudaRed() : null}
                        <Input className="inputform" type="text" placeholder="Nombre de usuario" value={this.state.usuarioRed} name="usuarioRed" onChange={this.onChangeInput} />
                        {this.renderBotonAccionRedes()}

                    </form>

                    <div className="inputform buttonUno" onClick={() => this.seguir()}>Guardar</div>

                </form>
            </div>
        )
    }
}


export default (withStyles({


    formControl: {
        width: '100%',
        margin: "0em 0em 1em 0em",
        minWidth: 120,
    },

    formControlInput: {
    },



})(PasoSeis));