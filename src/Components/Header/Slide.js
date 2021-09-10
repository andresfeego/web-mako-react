import React, { Component } from 'react'
import './Slide.scss'

import BannerAnim from 'rc-banner-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import request from 'superagent'

const { Element } = BannerAnim;
const BgElement = Element.BgElement;

export default class Slide extends Component {


    constructor(props) {
        super(props);

        this.state = {
            imageSlider: []
        };
    }

    UNSAFE_componentWillMount() {
        this.getSlides();
    }


    getSlides() {

        request
            .get('/response/slides')
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    console.log(err);

                } else {

                    const respuestaLogin = JSON.parse(res.text);
                    this.setState({
                        imageSlider: respuestaLogin
                    })
                }
            });

    }


    Item(props) {
        var urlFondo = "url(https://www.mako.guru/scrAppServidor/images/slides/" + props.img + ")"
        var urlLogo = "url(https://www.mako.guru/src/logos/" + props.codigo_empresa + ".png)"
        return (
            <Element key={"slideIni_" + props.idSlide} prefixCls="banner-user-elem">
                {props.tipoLink == 1 ?
                    <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} className="iconoEmpresa" style={{ backgroundImage: 'url(https://www.mako.guru/scrAppServidor/images/logo_Mako_Directorio_Comercial_Colombia_512x512.png)', backgroundSize: 'cover', backgroundPosition: 'center', }} />
                    :
                    <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} className="iconoEmpresa" style={{ backgroundImage: urlLogo, backgroundSize: 'cover', backgroundPosition: 'center', }} />
                }
                <div className="degradado" />
                <BgElement key={"bg1" + props.idSlide} className="bg" style={{ backgroundImage: urlFondo, backgroundSize: 'cover', backgroundPosition: 'center', }} />
                <div className="textoSlide">
                    <QueueAnim name="QueueAnim">
                        <h3 key="h1">{props.titulo}</h3>
                    </QueueAnim>
                    <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} name="TweenOne" id="TweenOne">
                        {props.lblCat}
                    </TweenOne>
                </div>
            </Element>
        )
    }



    createSlides() {
        var aleatorio = Math.round(Math.random() * 1000);
        return (
            <BannerAnim autoPlay autoPlaySpeed={4000} type="across" id={"rand" + aleatorio} className="contenido">

                {this.state.imageSlider.length > 0 ?
                    this.state.imageSlider.map((item) => this.Item(item))
                    :
                    null
                }

            </BannerAnim>
        )
    }



    render() {
        console.warn("render slide");
        return (
            <div className="slide">
                {this.createSlides()}
            </div>
        )
    }
}


