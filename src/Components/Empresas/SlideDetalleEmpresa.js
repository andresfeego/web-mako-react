import React, { Component } from 'react'
import './SlideDetalleEmpresa.scss'
import './SlideDetalleEmpresaMobile.scss'

import BannerAnim from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import request from 'superagent';

const { Element } = BannerAnim;
const BgElement = Element.BgElement;

export default class Slide extends Component {


    constructor(props) {
        super(props);

        this.state = {
            imageSlider: '',
            categoria: '',
            lblCategoria: ''
        };
    }

    UNSAFE_componentWillMount() {
        this.getSlides();
        this.getCategoria();
    }


    getSlides() {

        request
            .get('/response/empresas/imagenesSlide/' + this.props.id)
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    console.log(err);

                } else {
                    const responseJson = JSON.parse(res.text);

                    this.setState({
                        imageSlider: responseJson,

                    })
                }
            });


    }

    getCategoria() {


        request
            .get('/response/empresas/categoria/' + this.props.id)
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    console.log(err);

                } else {
                    const responseJson = JSON.parse(res.text)[0];

                    this.setState({
                        categoria: responseJson.categoria,
                        lblCategoria: responseJson.nombre

                    })
                }
            });

    }

    Item(props) {
        var urlFondo = "url(https://www.mako.guru/src/imagenes/empresas/" + this.props.id + "/" + props.url + ".jpg)"

        return (
            <Element key={"Elem" + props.id} prefixCls="banner-user-elem">
                <TweenOne animation={{ y: 0, opacity: 0, type: 'from', delay: 200 }} className="degradado" name="TweenOne" id="TweenOne">
                    <div className="degradado" />
                </TweenOne>
                <BgElement key={"bg" + props.id} className="bg" style={{ backgroundImage: urlFondo, backgroundSize: 'cover', backgroundPosition: 'center', }} />
                <div className="textoSlide">
                    <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} name="TweenOne" id="TweenOne">
                        {props.nombre}
                    </TweenOne>
                </div>
            </Element>

        )


    }



    renderSlide() {
        if (this.state.imageSlider.length > 0) {
            return this.state.imageSlider.map((item) => this.Item(item));
        } else {

            if (this.state.categoria !== '') {
                var urlFondo = "url(https://www.mako.guru/src/imgCategoria/" + this.state.categoria + ".jpg)";
                return (
                    <Element key={"fondo1" + this.state.categoria} prefixCls="banner-user-elem">
                        <TweenOne animation={{ y: 0, opacity: 0, type: 'from', delay: 200 }} className="degradado" name="TweenOne" id="TweenOne">
                            <div className="degradado" />
                        </TweenOne>
                        <BgElement key={"bg" + this.state.categoria} className="bg" style={{ backgroundImage: urlFondo, backgroundSize: 'cover', backgroundPosition: 'center', }} />
                        <div className="textoSlide">
                            <TweenOne animation={{ y: 50, opacity: 0, type: 'from', delay: 200 }} name="TweenOne" id="TweenOne">
                                {this.state.lblCategoria}
                            </TweenOne>
                        </div>
                    </Element>
                )
            } else {
                return null;
            }

        }
    }


    createSlides() {
        return (


            <BannerAnim autoPlay type="across" className="contenido">

                {this.renderSlide()}



            </BannerAnim>

        )
    }



    render() {
        return (
            <div className="SlideDetalleEmpresa">
                {this.createSlides()}
            </div>
        )
    }
}


