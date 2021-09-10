import React, { Component } from 'react'
import './BarraBusqueda.scss'

import BtnSearch from '@material-ui/icons/Search';
import BtnClose from '@material-ui/icons/Close';
import { connect } from 'react-redux'
import { saveBusqueda, clearBusqueda } from '../../Inicialized/Actions';


class BarraBusqueda extends Component {

    constructor(props) {
        super(props);


        this.state = {
            busquedaB: this.props.busqueda
        }
    }


    componentWillReceiveProps(nextProps) {

        this.setState({
            busquedaB: nextProps.busqueda
        })

    }

    onSubmit() {
        this.props.saveBusqueda(this.state.busquedaB);
    }

    onClear() {
        this.props.clearBusqueda();
        this.setState({
            busquedaB: ''
        })
    }

    onChange = e => {

        this.setState({
            busquedaB: (e.target.value)
        })

    }

    handleKeyDown = e => {
        if (e.key === 'Enter') {
            this.onSubmit();
        }
    }




    render() {

        return (
            <div className="barra">
                <input type="text" placeholder="Que buscas ?" className="buscar" onKeyDown={this.handleKeyDown} value={this.state.busquedaB} onChange={this.onChange}></input>
                {this.props.busqueda === '' ?
                    <div className="botonBuscar" onClick={() => this.onSubmit()} > <BtnSearch style={{ width: '95%', height: '95%' }} /></div>
                    :
                    <div className="botonBuscar" onClick={() => this.onClear()} > <BtnClose style={{ width: '90%', height: '90%' }} /></div>
                }

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        busqueda: state.busqueda
    }
}

const mapDispatchToProps = {
    saveBusqueda: saveBusqueda,
    clearBusqueda: clearBusqueda
}


export default connect(mapStateToProps, mapDispatchToProps)(BarraBusqueda);
