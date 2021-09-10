import React, { Component } from 'react'
import "./THorarios.scss";

import WatchLaterIcon from '@material-ui/icons/WatchLater';
import request from 'superagent';
import Horario from './Components/Horario'

export default class THorarios extends Component {


    constructor(props) {
        super(props);
        this.state = {
            horarios: [],
            id: this.props.id
        }
    }

    componentDidMount() {
        this.getHorarios();
    }

    getHorarios() {

        request
            .get('/response/empresas/horarios/' + this.props.id)
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    console.log(err);

                } else {
                    const responseJson = JSON.parse(res.text);
                    this.setState({
                        horarios: responseJson,
                    })
                }
            });
    }


    render() {
        return (
            <div className="tarjetaContenido">
                <WatchLaterIcon className="tarjetaContenidoIcon" style={{ fontSize: 30 }} />
                {this.state.horarios.map((item) => <Horario key={item.idhorario} item={item} />)}
            </div>
        )
    }
}
