import React, { Component } from 'react'
import "./TSocialNet.scss"


import LanguageIcon from '@material-ui/icons/Language';
import request from 'superagent';

export default class TSocialNet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redes: []
        }
    }

    componentDidMount() {
        this.getRedes();
    }


    getRedes() {
        request
            .get('/response/empresas/redes/' + this.props.id)
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    console.log(err);

                } else {
                    const responseJson = JSON.parse(res.text);

                    this.setState({
                        redes: responseJson,
                    })
                }
            });
    }


    rederListaRedes() {


        return this.state.redes.map((item) =>
            <a className="redSocial" href={item.paginaSocial + item.link} key={item.id} target="_blank" >
                <img loading="lazy" className="iconoRedes" src={require("../../../Iconos/Redes/" + item.urlicono)} alt={item.descSocial + " " + item.nombre} title={item.descSocial + " " + item.nombre} />
                <span>{item.descSocial}</span>
            </a>

        )

    }

    render() {

        if (this.props.pagina != null && this.props.pagina != 'sin web' || this.state.redes.length > 0) {
            return (

                <div className="tarjetaContenido listaRedes">
                    <LanguageIcon className="tarjetaContenidoIcon" style={{ fontSize: 30 }} />
                    {this.props.pagina != null && this.props.pagina != 'sin web' ?
                        <a href={this.props.pagina} target="_blank" className="redSocial" style={{ fontSize: 20 }} >
                            <LanguageIcon className="iconoRedes" style={{ fontSize: 30 }} />
                            <span>Pagina Web Oficial</span>
                        </a>
                        :
                        null
                    }

                    {this.state.redes.length > 0 ?
                        this.rederListaRedes()
                        :
                        null
                    }

                </div>
            )
        } else {
            return null;
        }

    }
}
