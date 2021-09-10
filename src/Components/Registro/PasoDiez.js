import React, { Component } from 'react'
import "./PasoDiez.scss"
import "./PasoDiez_mobile.scss"
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import copy from "copy-to-clipboard";
import { nuevoMensaje, tiposAlertas } from '../../Inicialized/Toast';



export default class PasoDiez extends Component {



    copyToClipboard(text) {
        copy(text);
        nuevoMensaje(tiposAlertas.success, "Link copiado al portapapeles");
    };




    render() {
        return (
            <div className="contPasoDiez">
                <h3>Este es tu link empresarial</h3>
                <div className="contLink">
                    <span className="linkMobile"><a target="_blank" href={"www.mako.guru/directorio/empresas/" + this.props.codigo.codigo}>{"www.mako.guru/directorio/empresas/" + this.props.codigo.codigo}</a></span>
                    <FileCopyOutlinedIcon className="iconoInfo" onClick={() => this.copyToClipboard("www.mako.guru/directorio/empresas/" + this.props.codigo.codigo)} />
                    <br />
                    <span className="info">Al visitar tu perfil cualquier persona podrá compartirlo haciendo click en el boton </span> <br /> <ShareOutlinedIcon className="iconoInfo" />
                </div>

                <br />
                <h3>Recomendaciones:</h3>

                <div className="recomendacion">
                    <div className="numero">1.</div>
                    <div className="contRecomendacion">
                        <div className="textoRecomendacion">
                            Comparte siempres tu link en la descripción de tus publicaciones, esto garantizará que tus clientes siempre encuentren tu informacion actualizada.
                        </div>
                        <img loading="lazy" src={require("../../Images/recomendacionMako1.jpg")} alt="" />
                    </div>
                </div>

                <div className="recomendacion">
                    <div className="numero">2.</div>
                    <div className="contRecomendacion">
                        <div className="textoRecomendacion">
                            A mayor número de links compartidos mayor es el posicionamiento en buscadores.
                        </div>
                        <img loading="lazy" src={require("../../Images/recomendacionMako2.jpg")} alt="" />
                    </div>
                </div>

                <div className="recomendacion">
                    <div className="numero">3.</div>
                    <div className="contRecomendacion">
                        <div className="textoRecomendacion">
                            Busca tu empresa en google por palabras claves constantemente y haz click en tu perfil empresarial, esto dira a los buscadores que eres la mejor respuesta a dicha busqueda.
                        </div>
                        <img loading="lazy" src={require("../../Images/recomendacionMako2.jpg")} alt="" />
                    </div>
                </div>

                <div className="recomendacion">
                    <div className="numero">4.</div>
                    <div className="contRecomendacion">
                        <div className="textoRecomendacion">
                            MUY PRONTO ! Tendrás a tu disposición la <strong>APP MAKO EMPRESARIOS</strong>, donde encontraras promociones en articulos publicitarios, contenido digital para que hagas crecer tu empresa, podrás crear sorteos de articulos entre tus seguidores, promociones, cupones de descuento y mucho más.
                        </div>
                        <img loading="lazy" src={require("../../Images/recomendacionMako4.jpg")} alt="" />
                    </div>
                </div>

                <div className="inputform buttonTres" onClick={() => window.location.href = "/directorio"}>Ir al directorio</div>
                <div className="inputform buttonTres" onClick={() => window.location.href = "/directorio/empresas/" + this.props.codigo.codigo}>Visitar tu perfil</div>

            </div>
        )
    }
}
