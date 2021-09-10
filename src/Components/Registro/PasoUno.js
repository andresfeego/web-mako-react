import React, { Component } from 'react'
import "./PasoUno.scss"
import "./PasoUno_mobile.scss"
import { Input } from '@material-ui/core'
import request from 'superagent';
import { tiposAlertas, nuevoMensaje } from '../../Inicialized/Toast';


export default class PasoUno extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password1: '',
            password2: '',
            codigo: [],
        }
    }


    onChange = e =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    validaMail(){
        if (this.state.codigo.registrando == 99) {
            nuevoMensaje(tiposAlertas.cargadoError,"Ya se encuentra registrada una empresa bajo este correo");
        } else {

            nuevoMensaje(tiposAlertas.cargadoSuccess,"Ok ! Datos correctos, continuemos en el paso " + (this.state.codigo.registrando ));
            this.props.fun.setCodigo(this.state.codigo);
            this.props.fun.setCurrentStep(this.state.codigo.registrando);
            
        }
    }

    inicializaCodigo(){


        request
        .post('/response/empresas/registro/initCode')
        .send({ email: this.state.email,  pass: this.state.password1}) // sends a JSON post body
        .set('accept', 'json')
        .end((err, res) => {
                
            if (err) {
                nuevoMensaje(tiposAlertas.cargadoError,"Error al generar perfil 1, intenta de nuevo por favor");
            } else {
                const responseServer =   JSON.parse(res.text);

               if (responseServer.length > 0) {
                    this.setState({
                        codigo: responseServer[0]
                    })
                    this.validaMail();
               } else {
                    nuevoMensaje(tiposAlertas.cargadoError,"Error al generar perfil 2, intenta de nuevo por favor");
               }

            }


        });

    }

    codXmail(){

        request
            .get('/response/empresas/registro/codXmail/'+this.state.email)
            .set('accept', 'json')
            .end((err, res) => {
                    
                if (err) {
                    nuevoMensaje(tiposAlertas.cargadoError,"Error al consultar email, intenta de nuevo por favor");
                } else {
                    const responseServer =   JSON.parse(res.text);
                   if (responseServer.length > 0) {

                        this.setState({
                            codigo: responseServer[0]
                        })
                        this.validaMail();

                   } else {
                    this.inicializaCodigo();
                   }

                }


            });

    }

    validarInfo(){
       
        nuevoMensaje(tiposAlertas.cargando, "Validando")

        if (this.state.email == "") {
            nuevoMensaje(tiposAlertas.cargadoError,"Ingresa un usuario");
        }else{
            if (this.state.password1 == "") {
                nuevoMensaje(tiposAlertas.cargadoError,"Ingresa una contraseña");
            }else{

                if (this.state.password1  != this.state.password2) {
                    nuevoMensaje(tiposAlertas.cargadoError,"Las contraseñas no coinciden");
                } else {
                    
                    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

                    if (!expr.test(this.state.email)) {
                        nuevoMensaje(tiposAlertas.cargadoError, "formato de correo incorrecto Ej: usuario@plataformadecorreo.com");
                    }else{
                        this.codXmail();
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
            <div className="PasoUnoContainer">
                
                <form noValidate className="formularioRegistroEmp">
                    <Input className="inputform" type="text" placeholder="Correo electrónico" value={this.state.email} name="email" onChange={this.onChange}/>
                    <Input className="inputform" type="password" placeholder="Contraseña" value={this.state.password1} name="password1" onChange={this.onChange}/>
                    <Input className="inputform" type="password" placeholder="Repite la contraseña" value={this.state.password2} name="password2" onChange={this.onChange}/>
                    {this.state.password1 != this.state.password2 && this.state.password1 != '' && this.state.password2 != '' ? <span style={{color: "red"}}>No son identicas !</span> : null}
                    <div className="inputform buttonUno" onClick={this.onSubmit}>Guardar</div>
                </form> 
            </div>
        )
    }
}
