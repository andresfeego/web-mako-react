import React, { Component } from 'react'
import "./Filtros.scss"
import "./FiltrosMobile.scss"

import BtnClose from '@material-ui/icons/Close';

import { connect } from 'react-redux';
import { clearCategoria, clearlblCategoria, clearCiudad, clearBusqueda } from '../../Inicialized/Actions';

class Filtros extends Component {

    onClear(caso) {

        switch (caso) {
            case 1:
                this.props.clearBusqueda();
                break;
            case 2:
                this.props.clearCiudad();
                break;

            case 3:
                this.props.clearCategoria();
                this.props.clearlblCategoria();
                break;

            default:
                break;
        }

    }


    render() {
        return (
            <div className="Filtros">

                {this.props.busqueda !== '' ?
                    <div className="Filtro">
                        <span>{this.props.busqueda}</span>
                        <div className="btnCerrar" onClick={() => this.onClear(1)} > <BtnClose style={{ width: '90%', height: '90%' }} /></div>
                    </div>
                    :
                    null
                }

                {this.props.ciudad !== '' ?
                    <div className="Filtro">
                        <span>{this.props.ciudad}</span>
                        <div className="btnCerrar" onClick={() => this.onClear(2)} > <BtnClose style={{ width: '90%', height: '90%' }} /></div>
                    </div>
                    :
                    null
                }

                {this.props.categoria !== '' ?
                    <div className="Filtro">
                        <span>{this.props.lblCategoria}</span>
                        <div className="btnCerrar" onClick={() => this.onClear(3)} > <BtnClose style={{ width: '90%', height: '90%' }} /></div>
                    </div>
                    :
                    null
                }

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
    clearCategoria,
    clearlblCategoria,
    clearCiudad,
    clearBusqueda

}


export default connect(mapStateToProps, mapDispatchToProps)(Filtros);