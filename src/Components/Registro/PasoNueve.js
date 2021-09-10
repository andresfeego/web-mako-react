import React, { Component } from 'react'
import "./PasoNueve.scss"
import "./PasoNueve_mobile.scss"
import { nuevoMensaje, tiposAlertas } from '../../Inicialized/Toast';
import { Input } from '@material-ui/core';
import request from 'superagent';

export default class PasoNueve extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cuponDescuento: '',
            montoPago: 120000,
            cupon: {},


        }

    }

    onChangeCupon = e => {
        var cupon = e.target.value
        cupon = cupon.toUpperCase()

        this.setState({
            [e.target.name]: cupon
        });
    }



    validarRedimir() {
        if (this.state.cuponDescuento == '') {
            nuevoMensaje(tiposAlertas.error, "No has ingresado aun un cupón de descuento para redimir")
        } else {
            this.redimir(this.state.cuponDescuento);
        }
    }

    pagar() {
        nuevoMensaje(tiposAlertas.info, "En el momento tenemos algunos inconvenientes con el sistema de pagos intenta más tarde")
    }

    generarDescuento() {

        var montoDescuento = ((this.state.montoPago * this.state.cupon.descuento) / 100)
        console.log(montoDescuento)
        this.setState({
            montoPago: this.state.montoPago - montoDescuento
        })
        nuevoMensaje(tiposAlertas.cargadoSuccess, "Cupon redimido con el " + this.state.cupon.descuento + " % de descuento por un año")

    }

    redimir(cupon) {
        nuevoMensaje(tiposAlertas.cargando, "Redimiendo cupón")
        request
            .get('/response/cupones/' + cupon)
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    console.log(err);

                } else {

                    const respuestaLogin = JSON.parse(res.text);
                    if (respuestaLogin.length == 0) {
                        nuevoMensaje(tiposAlertas.cargadoError, "Cupon de descuento no existente")
                    } else {
                        if (respuestaLogin[0].activo == 0) {
                            nuevoMensaje(tiposAlertas.cargadoWarn, "El cupon que ingresaste no se encuentra activo para promoción o descuento")
                        } else {


                            this.setState({
                                cupon: respuestaLogin[0],
                            })

                            this.generarDescuento()

                        }
                    }

                }
            });
    }

    actualizaPaso() {


        request
            .post('/response/empresas/registro/actualizaPaso')
            .send({ codigo: this.props.codigo.codigo, paso: 100 }) // sends a JSON post body
            .set('accept', 'json')
            .end((err, res) => {

                if (err) {
                    nuevoMensaje(tiposAlertas.cargadoError, "Error al guardar información, intenta guardar de nuevo en unos minutos por favor");
                } else {
                    nuevoMensaje(tiposAlertas.cargadoSuccess, "Información actualizada, sigamos con el algunas recomendaciones para posicinar tu perfil en google");
                    this.props.fun.setCurrentStep(100);

                }


            });

    }

    activarEmpresa() {
        nuevoMensaje(tiposAlertas.cargando, "Activando empresa")
        request
            .post('/response/empresas/registro/activarEmpresa')
            .send({ codigo: this.props.codigo.codigo, cupon: this.state.cupon.id }) // sends a JSON post body
            .set('accept', 'json')
            .end((err, res) => {

                if (err) {
                    nuevoMensaje(tiposAlertas.cargadoError, "Error al guardar activar empresa, intenta guardar de nuevo en unos minutos por favor");
                } else {
                    nuevoMensaje(tiposAlertas.cargadoSuccess, "Empresa activada, bienvenido a www.MAKO.guru un directorio para todos");
                    this.actualizaPaso()
                }


            });

    }


    renderBotonAccion() {

        if (this.state.montoPago != 0) {
            return <div className="inputform buttonTres" onClick={() => this.pagar()}>Pagar</div>
        } else {
            return <div className="inputform buttonDos" onClick={() => this.activarEmpresa()}>Activar empresa</div>
        }

    }

    render() {
        return (
            <div className="PasoNueveContainer">
                <form noValidate className="formularioRegistroEmp">

                    <Input className="inputform" type="text" placeholder="Cupón de descuento" value={this.state.cuponDescuento} name="cuponDescuento" onChange={this.onChangeCupon} />
                    <div className="inputform buttonTres" onClick={() => this.validarRedimir()}>Redimir</div>


                    <div className="labelPago">
                        <span className="montoPago">{"$" + this.state.montoPago}</span><span className="periodoPago"> / 1 año</span>
                    </div>

                    {this.renderBotonAccion()}

                </form>


            </div>
        )
    }
}
