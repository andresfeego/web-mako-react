import React, { Component } from 'react'
import "./TVCHoras.scss";
import AvTimerIcon from '@material-ui/icons/AvTimer';

export default class TVCHoras extends Component {
    render() {
        return (
            <div className="tarjetaContenido"> 
                    <AvTimerIcon className="tarjetaContenidoIcon" style={{ fontSize: 30 }}/>
                    <span>Prestamos servicio las 24 horas</span>
            </div>
        )
    }
}
