import React, { Component } from 'react'
import Header from '../Header/Header';
import Contenido from '../Contenido/Contenido';
import Filtros from './Filtros';
import './General.scss'
import { connect } from 'react-redux'
import ReactZenDeskChat from '@inlightmedia/react-zendesk-chat';
import { saveBusqueda, saveCiudad } from '../../Inicialized/Actions';



class General extends Component {

    constructor(props) {
        super(props)



        if (this.props.match.params.producto) {
            this.props.saveBusqueda(this.props.match.params.producto + "");
        }

        if (this.props.match.params.ciudad) {
            this.props.saveCiudad(this.props.match.params.ciudad + "");
        }

    }




    render() {
        return (
            <div className="General">

                <Header />
                <Filtros />
                <Contenido />
                <ReactZenDeskChat appID="5OP2PCcPZDja7g44akj5jAYVPFDZqITP" />
            </div>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        busqueda: state.busqueda,
        ciudad: state.ciudad,
        categoria: state.categoria,
        lblCategoria: state.lblCategoria
    }
}


const mapDispatchToProps = {
    saveBusqueda: saveBusqueda,
    saveCiudad: saveCiudad
}


export default connect(mapStateToProps, mapDispatchToProps)(General);
