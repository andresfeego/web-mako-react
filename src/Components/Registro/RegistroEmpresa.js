import React, { Component } from 'react'
import "./RegistroEmpresa.scss";
import "./RegistroEmpresa_mobile.scss";
import PasoUno from './PasoUno'
import PasoDos from './PasoDos'
import PasoTres from './PasoTres';
import PasoCuatro from './PasoCuatro';
import PasoCinco from './PasoCinco';
import PasoSeis from './PasoSeis';
import PasoSiete from './PasoSiete';
import PasoOcho from './PasoOcho';
import PasoNueve from './PasoNueve';
import PasoDiez from './PasoDiez';


export default class RegistroEmpresa extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showNavigation: false,
            currentStep: 1,
            title: '',
            codigo: []
        }

    }

    setCurrentStep(step) {

        this.setState({
            currentStep: step
        })

    }



    setCodigo(codigo) {

        this.setState({
            codigo: codigo
        })

    }

    renderPasos(currentStep) {

        switch (currentStep) {
            case 1:
                return <PasoUno fun={this} />
                break;

            case 2:
                return <PasoDos fun={this} codigo={this.state.codigo} />
                break;

            case 3:
                return <PasoTres fun={this} codigo={this.state.codigo} />
                break;

            case 4:
                return <PasoCuatro fun={this} codigo={this.state.codigo} />
                break;

            case 5:
                return <PasoCinco fun={this} codigo={this.state.codigo} />
                break;

            case 6:
                return <PasoSeis fun={this} codigo={this.state.codigo} />
                break;

            case 7:
                return <PasoSiete fun={this} codigo={this.state.codigo} />
                break;

            case 8:
                return <PasoOcho fun={this} codigo={this.state.codigo} />
                break;

            case 9:
                return <PasoNueve fun={this} codigo={this.state.codigo} />
                break;

            case 100:
                return <PasoDiez fun={this} codigo={this.state.codigo} />
                break;

            default:
                break;
        }
    }

    generaTitulo(currentStep) {
        switch (currentStep) {

            case 1:
                return 'Datos de ingreso'
                break;

            case 2:
                return 'Describe tu empresa'
                break;


            case 3:
                return 'Cual es tu logo'
                break;

            case 4:
                return 'Hablanos de la ubicación de tu negocio'
                break;

            case 5:
                return 'Donde te podrán contactar tus clientes'
                break;

            case 6:
                return 'Pagina Web y redes sociales'
                break;

            case 7:
                return 'Horiarios de atención'
                break;

            case 8:
                return 'Información adicional'
                break;

            case 9:
                return 'Ahora solo queda activar tu empresa'
                break;

            case 100:
                return 'Bienvenido, algunas recomendaciones'
                break;

            default:
                break;
        }
    }


    generaDescripcion(currentStep) {
        switch (currentStep) {

            case 0:
                return 'Ingresa el correo y contraseña bajo el cual deseas registrar tu empresa en nuestra plataforma'
                break;

            case 1:
                return 'Importante, en el espacio descripción incluye un parrafo de presentacion de tu empresa, informando a los usuarios que servicios prestas o que productos vendes, pero calma, mas adelante tendras espacio para incluir tags o palabras clave por las cuales te encontraran en google o cualquier otro buscador'
                break;

            case 3:
                return 'Selecciona un logo en formato de imagen como foto de tu perfil'
                break;

            case 4:
                return ''
                break;

            case 5:
                return 'Agrega los telefonos y correos de contacto'
                break;

            case 6:
                return 'Agrega los link de tu página web oficial y los links de tus redes sociales'
                break;


            case 7:
                return ''
                break;

            case 8:
                return ''
                break;

            case 9:
                return 'Si cuentas con un cupon de descuento MAKO ingresalo en la casilla cupón de descuento y haz click en redimir antes de realizar el pago'
                break;

            case 100:
                return 'Estas son algunas recomendaciones para posicionar tu perfil empresarial en los motores de busqueda como google y en las redes sociales'
                break;

            default:
                break;
        }
    }

    render() {

        let titulo = this.generaTitulo(this.state.currentStep);
        let descripcionVentana = this.generaDescripcion(this.state.currentStep);


        return (
            <div className="registroContainer">


                <h2>Registro de empresas</h2> <br />
                <span>{titulo}</span>
                <span className="descripcion" >{descripcionVentana}</span>
                {this.renderPasos(this.state.currentStep)}
            </div>
        )
    }
}
