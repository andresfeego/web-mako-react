import React, { Component } from 'react'
import './BusquedaCiudad.scss'
import { withStyles } from '@material-ui/core/styles'
import BtnSearch from '@material-ui/icons/Search';
import BtnClose from '@material-ui/icons/Close';
import { connect } from 'react-redux'
import { saveCiudad, clearCiudad } from '../../Inicialized/Actions';
import request from 'superagent';


class BusquedaCiudad extends Component {
    state = {
        ds: [],
        busCiudad: this.props.ciudad
    };

    UNSAFE_componentWillMount() {
        this.getCiudades();
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            busCiudad: nextProps.ciudad
        })

    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    getCiudades() {

        request
            .get('/response/listaMunicipios')
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    console.log(err);

                } else {

                    const respuestaLogin = JSON.parse(res.text);
                    this.setState({
                        ds: respuestaLogin,
                    })

                }
            });


    }



    onSubmit() {
        this.props.saveCiudad(this.state.busCiudad);
    }

    onClear() {
        this.props.clearCiudad();
        this.setState({
            busCiudad: ''
        })
    }

    handleKeyDown = e => {
        if (e.key === 'Enter') {
            this.onSubmit();
        }
    }



    render() {
        return (
            <div className="busquedaCiudad">
                <input type="text" placeholder="En que ciudad lo buscas ?" className="buscarCiudad" onKeyDown={this.handleKeyDown} name="busCiudad" value={this.state.busCiudad} onChange={this.onChange}></input>
                {this.props.ciudad === '' ?
                    <div className="botonBuscar" onClick={() => this.onSubmit()} > <BtnSearch style={{ width: '90%', height: '90%' }} /></div>
                    :
                    <div className="botonBuscar" onClick={() => this.onClear()} > <BtnClose style={{ width: '85%', height: '85%' }} /></div>
                }
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        ciudad: state.ciudad
    }
}

const mapDispatchToProps = {
    saveCiudad,
    clearCiudad
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles({

    textField: {
        color: 'red',
        borderRadius: '1.5em',
        marginTop: '0',
        height: '2em',
        bottom: '0.8em',
        position: 'relative'
    }


})(BusquedaCiudad));

