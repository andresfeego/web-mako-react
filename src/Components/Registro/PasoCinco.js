import React, { Component } from 'react'
import request from 'superagent';
import "./PasoCinco.scss"
import "./PasoCinco_mobile.scss"
import Telefono from '../Empresas/Tarjetas/Components/Telefono'
import Email from '../Empresas/Tarjetas/Components/Email'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { nuevoMensaje, tiposAlertas } from '../../Inicialized/Toast';
import { Input, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

export default class PasoCinco extends Component {

    constructor(props) {
        super(props);
        this.state = {
            telefonos: [],
            emails: [],

            idTelefono: 0,
            telefono: '',
            dependencia: '',
            tipo: '0',
            wp: '0',

            idCorreo: 0,
            correo: '',
            principalCorreo: 0,

            tipoAccionCorreo: 'agregar',
            tipoAccionTelefono: 'agregar',
        }
    }


    componentDidMount() {
        this.getTelefonos();
        this.getEmails();
    }



    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onChangeTipo = e => {
        this.setState({
            tipo: e.target.value
        });
    }



    getTelefonos() {


        request
            .get('/response/empresas/telefonos/' + this.props.codigo.codigo)
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    console.log(err);

                } else {
                    const responseJson = JSON.parse(res.text);

                    this.setState({
                        telefonos: responseJson,
                    })
                }
            });


    }

    getEmails() {


        request
            .get('/response/empresas/emails/' + this.props.codigo.codigo)
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    console.log(err);

                } else {
                    const responseJson = JSON.parse(res.text);

                    this.setState({
                        emails: responseJson,
                    })
                }
            });


    }


    validarFormatoCorreo() {
        var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!expr.test(this.state.correo)) {
            nuevoMensaje(tiposAlertas.error, "formato de correo incorrecto Ej: usuario@plataformadecorreo.com");
        } else {
            return true
        }
    }

    procesarMail(id, correo, principalCorreo, accion) {

        if (principalCorreo == 1 && (accion == 'editar' || accion == 'borrar')) {
            nuevoMensaje(tiposAlertas.warn, "Este es el correo principal de la cuenta, no es posible editarlo o borrarlo")
        } else {
            if (accion == 'borrar') {
                this.borrarCorreo(id);
            } else {

                this.setState({
                    idCorreo: id,
                    correo: correo,
                    principalCorreo: principalCorreo,
                    tipoAccionCorreo: accion
                })

            }
        }

    }

    agregarCorreo() {
        if (this.validarFormatoCorreo()) {

            nuevoMensaje(tiposAlertas.cargando, "Guardando correo")
            request
                .post('/response/empresas/registro/agregarMail')
                .send({ codigo: this.props.codigo.codigo, correo: this.state.correo, principal: 0 }) // sends a JSON post body
                .set('accept', 'json')
                .end((err, res) => {

                    if (err) {
                        nuevoMensaje(tiposAlertas.cargadoError, "Error al agregar correo, intenta guardar de nuevo en unos minutos por favor");
                    } else {
                        nuevoMensaje(tiposAlertas.cargadoSuccess, "Correo agregado");
                        this.setState({
                            idcorreo: 0,
                            correo: '',
                            principalCorreo: 0
                        })
                        this.getEmails();
                    }


                });

        }
    }

    editarCorreo() {
        if (this.validarFormatoCorreo()) {

            nuevoMensaje(tiposAlertas.cargando, "Editando correo")
            request
                .post('/response/empresas/registro/editarMail')
                .send({ idCorreo: this.state.idCorreo, correo: this.state.correo }) // sends a JSON post body
                .set('accept', 'json')
                .end((err, res) => {

                    if (err) {
                        nuevoMensaje(tiposAlertas.cargadoError, "Error al editar correo, intenta guardar de nuevo en unos minutos por favor");
                    } else {
                        nuevoMensaje(tiposAlertas.cargadoSuccess, "Correo editado");
                        this.setState({
                            idcorreo: 0,
                            correo: '',
                            principalCorreo: 0
                        })
                        this.getEmails();
                    }


                });

        }
    }

    borrarCorreo(id) {


        nuevoMensaje(tiposAlertas.cargando, "Eliminando correo")
        request
            .post('/response/empresas/registro/borrarMail')
            .send({ idCorreo: id }) // sends a JSON post body
            .set('accept', 'json')
            .end((err, res) => {

                if (err) {
                    nuevoMensaje(tiposAlertas.cargadoError, "Error al eliminar correo, intenta guardar de nuevo en unos minutos por favor");
                } else {
                    nuevoMensaje(tiposAlertas.cargadoSuccess, "Correo eliminado");
                    this.setState({
                        idcorreo: 0,
                        correo: '',
                        principalCorreo: 0
                    })
                    this.getEmails();
                }


            });


    }

    validarInfoTelefono() {
        if (this.state.telefono == '') {
            nuevoMensaje(tiposAlertas.error, "No has ingresado ningún telefono aun")
        } else {
            if (this.state.dependencia == '') {
                nuevoMensaje(tiposAlertas.error, "No has ingresado ninguna dependencia aun")
            } else {
                return true;
            }

        }
    }

    procesarTelefono(idTelefono, telefono, dependencia, tipo, wp, accion) {
        if (accion == 'borrar') {
            this.borrarTelefono(idTelefono);

        } else {

            this.setState({
                idTelefono: idTelefono,
                telefono: telefono,
                dependencia: dependencia,
                tipo: "" + tipo,
                wp: "" + wp,
                tipoAccionTelefono: accion
            })

        }
    }


    agregarTelefono() {
        if (this.validarInfoTelefono()) {
            nuevoMensaje(tiposAlertas.cargando, "Guardando telefono")
            request
                .post('/response/empresas/registro/agregarTelefono')
                .send({ codigo: this.props.codigo.codigo, telefono: this.state.telefono, dependencia: this.state.dependencia, tipo: this.state.tipo, wp: this.state.wp }) // sends a JSON post body
                .set('accept', 'json')
                .end((err, res) => {

                    if (err) {
                        nuevoMensaje(tiposAlertas.cargadoError, "Error al agregar telefono, intenta guardar de nuevo en unos minutos por favor");
                    } else {
                        nuevoMensaje(tiposAlertas.cargadoSuccess, "Telefono agregado");
                        this.setState({
                            telefono: '',
                            dependencia: '',
                            tipo: '0',
                            wp: '0'
                        })
                        this.getTelefonos();
                    }


                });
        }
    }

    editarTelefono() {
        if (this.validarInfoTelefono()) {

            nuevoMensaje(tiposAlertas.cargando, "Editando telefono")
            request
                .post('/response/empresas/registro/editarTelefono')
                .send({ idTelefono: this.state.idTelefono, telefono: this.state.telefono, dependencia: this.state.dependencia, tipo: this.state.tipo, wp: this.state.wp }) // sends a JSON post body
                .set('accept', 'json')
                .end((err, res) => {

                    if (err) {
                        nuevoMensaje(tiposAlertas.cargadoError, "Error al editar telefono, intenta guardar de nuevo en unos minutos por favor");
                    } else {
                        nuevoMensaje(tiposAlertas.cargadoSuccess, "Telefono editado");
                        this.setState({
                            idTelefono: '',
                            telefono: '',
                            dependencia: '',
                            tipo: '0',
                            wp: '0',
                            tipoAccionTelefono: 'agregar'
                        })
                        this.getTelefonos();
                    }


                });

        }
    }


    borrarTelefono(id) {


        nuevoMensaje(tiposAlertas.cargando, "Eliminando telefono")
        request
            .post('/response/empresas/registro/borrarTelefono')
            .send({ idTelefono: id }) // sends a JSON post body
            .set('accept', 'json')
            .end((err, res) => {

                if (err) {
                    nuevoMensaje(tiposAlertas.cargadoError, "Error al eliminar telefono, intenta guardar de nuevo en unos minutos por favor");
                } else {
                    nuevoMensaje(tiposAlertas.cargadoSuccess, "Telefono eliminado");
                    this.setState({
                        idTelefono: '',
                        telefono: '',
                        dependencia: '',
                        tipo: '0',
                        wp: '0'
                    })
                    this.getTelefonos();
                }


            });


    }

    renderBotonAccionCorreo() {
        switch (this.state.tipoAccionCorreo) {
            case 'agregar':
                return <div className="inputform buttonTres" onClick={() => this.agregarCorreo()}>Agregar correo</div>
                break;

            case 'editar':
                return <div className="inputform buttonTres" onClick={() => this.editarCorreo()}>Editar</div>
                break;



            default:
                break;
        }
    }

    renderBotonAccionTelefono() {
        switch (this.state.tipoAccionTelefono) {
            case 'agregar':
                return <div className="inputform buttonTres" onClick={() => this.agregarTelefono()}>Agregar telefono</div>
                break;

            case 'editar':
                return <div className="inputform buttonTres" onClick={() => this.editarTelefono()}>Editar</div>
                break;



            default:
                break;
        }
    }

    actualizaPaso() {

        nuevoMensaje(tiposAlertas.cargando, "Guardando")

        request
            .post('/response/empresas/registro/actualizaPaso')
            .send({ codigo: this.props.codigo.codigo, paso: 6 }) // sends a JSON post body
            .set('accept', 'json')
            .end((err, res) => {

                if (err) {
                    nuevoMensaje(tiposAlertas.cargadoError, "Error al guardar información, intenta guardar de nuevo en unos minutos por favor");
                } else {
                    nuevoMensaje(tiposAlertas.cargadoSuccess, "Información actualizada, sigamos con el paso 6");
                    this.props.fun.setCurrentStep(6);

                }


            });

    }

    seguir() {
        if (this.state.telefonos.length == 0) {
            nuevoMensaje(tiposAlertas.warn, "Debes agregar un telefono")
        } else {
            if (this.state.emails.length == 0) {
                nuevoMensaje(tiposAlertas.warn, "Debes agregar un correo")
            } else {
                this.actualizaPaso();
            }
        }
    }

    render() {
        return (
            <div className="PasoUnoContainer PasoCincoContainer">

                <form noValidate className="formularioRegistroEmp formCorreoTel">
                    <Input className="inputform" type="phone" placeholder="Número telefónico" value={this.state.telefono} name="telefono" onChange={this.onChange} />
                    <Input className="inputform" type="text" placeholder="Dependencia ej: ventas, gerencia, soporte" value={this.state.dependencia} name="dependencia" onChange={this.onChange} />
                    <br />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Tipo de telefono</FormLabel>
                        <RadioGroup aria-label="tipo" className="radioGroup" name="tipo" value={this.state.tipo} onChange={this.onChange}>
                            <FormControlLabel
                                value='0'
                                control={<Radio color="primary" />}
                                label="Es telefono celular"
                            />
                            <FormControlLabel
                                value='1'
                                control={<Radio color="primary" />}
                                label="Es telefono fijo"
                            />

                        </RadioGroup>
                    </FormControl>

                    <br />
                    {this.state.tipo == '0' ?
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Tienes WhatsApp en este número</FormLabel>
                            <RadioGroup aria-label="tipo" className="radioGroup" name="wp" value={this.state.wp} onChange={this.onChange}>
                                <FormControlLabel
                                    value='0'
                                    control={<Radio color="primary" />}
                                    label="No"
                                />
                                <FormControlLabel
                                    value='1'
                                    control={<Radio color="primary" />}
                                    label="Si"
                                />

                            </RadioGroup>
                        </FormControl>
                        :
                        null
                    }

                    {this.renderBotonAccionTelefono()}
                </form>

                {this.state.telefonos.length > 0 ?
                    [

                        <h2>Lista de telefonos registrados</h2>,
                        this.state.telefonos.map((item) =>
                            <div className="contEmail">
                                <Telefono key={item.id_telefono} item={item} />
                                <div className="iconoAccion iconoEdit">
                                    <EditIcon onClick={() => this.procesarTelefono(item.id_telefono, item.telefono, item.dependencia, item.tipo, item.wp, 'editar')} />
                                </div>

                                <div className="iconoAccion iconoDelete">
                                    <DeleteIcon onClick={() => this.procesarTelefono(item.id_telefono, item.telefono, item.dependencia, item.tipo, item.wp, 'borrar')} />
                                </div>
                            </div>
                        )

                    ]
                    :
                    null
                }

                <form noValidate className="formularioRegistroEmp formCorreoTel">
                    <Input className="inputform" type="text" placeholder="Correo electrónico" value={this.state.correo} name="correo" onChange={this.onChange} />
                    {this.renderBotonAccionCorreo()}
                </form>










                {this.state.emails.length > 0 ?
                    [
                        <h2>Lista de correos registrados</h2>,

                        this.state.emails.map((item) =>
                            <div className="contEmail">
                                <Email key={item.idcorreo} email={item} />
                                <div className="iconoAccion iconoEdit">
                                    <EditIcon onClick={() => this.procesarMail(item.idcorreo, item.correo, item.principal, 'editar')} />
                                </div>

                                <div className="iconoAccion iconoDelete">
                                    <DeleteIcon onClick={() => this.procesarMail(item.idcorreo, item.correo, item.principal, 'borrar')} />
                                </div>
                            </div>
                        )
                    ]
                    :
                    null
                }

                <div className="inputform buttonUno" onClick={() => this.seguir()}>Guardar</div>
            </div>
        )
    }
}
