import React, { Component } from 'react'
import "./PasoDos.scss"
import "./PasoDos_mobile.scss"
import { Input } from '@material-ui/core'
import { nuevoMensaje, tiposAlertas } from '../../Inicialized/Toast';
import request from 'superagent';

export default class PasoDos extends Component {


    constructor(props) {
        super(props);
        this.state = {
            razonSocial: '',
            slogan: '',
            descripcion: '',
            responsable: '',
            codigo: this.props.codigo
        }
    }


    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    validaMail() {
        if (this.state.codigo.registrando == 100) {
            nuevoMensaje(tiposAlertas.error, "Ya se encuentra registrada una empresa bajo este correo");
        } else {

            nuevoMensaje(tiposAlertas.success, "Ok ! Datos correctos, continuemos en el paso " + (this.state.codigo.registrando + 1));
            this.props.fun.setCurrentStep(1);

        }
    }

    actualizaPaso() {


        request
            .post('/response/empresas/registro/actualizaPaso')
            .send({ codigo: this.state.codigo.codigo, paso: 3 }) // sends a JSON post body
            .set('accept', 'json')
            .end((err, res) => {

                if (err) {
                    nuevoMensaje(tiposAlertas.cargadoError, "Error al crear empresa, intenta guardar de nuevo en unos minutos por favor");
                } else {
                    nuevoMensaje(tiposAlertas.cargadoSuccess, "Se ha creado tu perfil para " + this.state.razonSocial);
                    this.props.fun.setCurrentStep(3);

                }


            });

    }

    crearEmpresa() {

        request
            .post('/response/empresas/registro/crearEmpresa')
            .send({ codigo: this.state.codigo.codigo, razon: this.state.razonSocial, slogan: this.state.slogan, descripcion: this.state.descripcion, responsable: this.state.responsable }) // sends a JSON post body
            .set('accept', 'json')
            .end((err, res) => {

                if (err) {
                    nuevoMensaje(tiposAlertas.cargadoError, "Error al crear empresa, intenta guardar de nuevo en unos minutos por favor");
                } else {

                    this.agregarCorreo();
                }


            });

    }


    agregarCorreo() {

        request
            .post('/response/empresas/registro/agregarMail')
            .send({ codigo: this.props.codigo.codigo, correo: this.props.codigo.email, principal: 1 }) // sends a JSON post body
            .set('accept', 'json')
            .end((err, res) => {

                if (err) {
                    nuevoMensaje(tiposAlertas.cargadoError, "Error al agregar correo, intenta guardar de nuevo en unos minutos por favor");
                } else {
                    this.actualizaPaso();
                }


            });


    }


    validarInfo() {

        nuevoMensaje(tiposAlertas.cargando, "Validando")

        if (this.state.razonSocial == "") {
            nuevoMensaje(tiposAlertas.cargadoError, "Ingresa el nombre de tu empresa en el campo razón social");
        } else {
            if (this.state.slogan == "") {
                nuevoMensaje(tiposAlertas.cargadoError, "Cuentanos cual es el slogan o lema de tu empresa");
            } else {

                if (this.state.descripcion == '') {
                    nuevoMensaje(tiposAlertas.cargadoError, "Falta la descripción de tu empresa");
                } else {

                    if (this.state.responsable == '') {
                        nuevoMensaje(tiposAlertas.cargadoError, "Es necesario que ingreses el nombre del funcionario de la empresa o representante legal que se haga responsable de la información aquí presentada");
                    } else {
                        this.crearEmpresa();
                    }

                }

            }
        }

    }


    onSubmit = () => {
        this.validarInfo();
    }


    render() {
        return (
            <div className="PasoDosContainer">
                <form noValidate className="formularioRegistroEmp">
                    <Input className="inputform" type="text" placeholder="Razón social" value={this.state.razonSocial} name="razonSocial" onChange={this.onChange} />
                    <Input className="inputform" type="text" placeholder="Slogan" value={this.state.slogan} name="slogan" onChange={this.onChange} />
                    <Input className="inputform" type="text" placeholder="Descripción" value={this.state.descripcion} name="descripcion" onChange={this.onChange} />
                    <Input className="inputform" type="text" placeholder="Responsable del registro o representante legal" value={this.state.responsable} name="responsable" onChange={this.onChange} />

                    <div className="inputform buttonUno" onClick={this.onSubmit}>Guardar</div>

                </form>
            </div>
        )
    }
}
