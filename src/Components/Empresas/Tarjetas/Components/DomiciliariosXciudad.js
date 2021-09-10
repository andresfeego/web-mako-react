import React, { Component } from 'react'
import "./DomiciliariosXciudad.scss"
import request from 'superagent'

export default class DomiciliariosXciudad extends Component {

    constructor(props) {
        super(props)

        this.state = {
            listaDomis: []
        }
    }

    componentDidMount() {
        this.getDomis(this.props.idMun)
    }

    componentWillReceiveProps(nP) {
        this.getDomis(nP.idMun)

    }


    getDomis(idMun) {


        request
            .get('/response/domiciliariosXciudad/' + idMun)
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    console.log(err);

                } else {
                    const responseJson = JSON.parse(res.text);
                    this.setState({
                        listaDomis: responseJson,
                    })
                }
            });


    }

    renderDomi(item) {

        let urllogo = 'https://www.mako.guru/src/' + item.url_logo;

        return (
            <a href={"https://www.mako.guru/directorio/empresas/" + item.codigo} key={item.codigo} target="_blanck" className="empDomicilios">
                <img loading="lazy" src={urllogo} alt={item.nombre + " - " + item.descripcion + " - " + item.nombreMun + " - " + item.nombreDep} title={item.nombre + " - " + item.descripcion + " - " + item.nombreMun + " - " + item.nombreDep} />
            </a>

        )
    }



    render() {

        return (
            <div className="listadomis">

                {this.state.listaDomis.length == 0 ?
                    "Sin empresas de domicilios para esta ciudad"
                    :

                    this.state.listaDomis.map((item) => this.renderDomi(item))
                }

            </div>
        )
    }
}
