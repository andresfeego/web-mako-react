import React, { Component } from 'react'
import Empresa from './Empresa'
import "./Contenido.scss"
import "./ContenidoMobile.scss"
import { connect } from 'react-redux'
import request from 'superagent';



class Contenido extends Component {


    constructor(props) {
        super(props);

        this.state = {
            ListaEmpresas: []
        };
    }

    componentDidMount() {
        this.getEmpresas(this.props.ciudad, this.props.busqueda, this.props.categoria);

    }

    componentWillReceiveProps(nextProps) {
        this.getEmpresas(nextProps.ciudad, nextProps.busqueda, nextProps.categoria);

    }

    getEmpresas(ciudad, servicio, categoria) {

        request
            .post('/response/empresas')
            .send({ ciudad: ciudad, busServicios: servicio, busCategoria: categoria }) // sends a JSON post body
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    console.log(err);

                } else {

                    const respuestaLogin = JSON.parse(res.text);
                    this.setState({
                        ListaEmpresas: respuestaLogin,
                    })

                }
            });


    }



    renderLista() {
        return (
            this.state.ListaEmpresas.map((item) => <Empresa key={item.codigo} empresa={item} />)
        )
    }


    render() {
        return (
            <div className="Contenido" id="Contenido">
                {this.renderLista()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        busqueda: state.busqueda,
        ciudad: state.ciudad,
        categoria: state.categoria
    }
}

export default connect(mapStateToProps)(Contenido);
