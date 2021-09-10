import React, { Component } from 'react'
import "./TDomicilio.scss"
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DomiciliariosXciudad from './Components/DomiciliariosXciudad';

export default class TDomicilio extends Component {


    render() {
        return (
            <div className="tarjetaContenido">
                <DirectionsBikeIcon className="tarjetaContenidoIcon" style={{ fontSize: 30 }} />
                {this.props.domicilio == 1 ?
                    [<span key="1" className="txtListaDomi">Domicilio directamente con nosotros</span>,
                    <span key="2" >{this.props.costoDomi == 0 ? "Domicilio gratis" : "Costo domicilio: " + this.props.costoDomi + " Aprox."}</span>
                    ]
                    :
                    null
                }
                <br />
                <div className="listaDomiciliarios">
                    <span className="txtListaDomi">Necesitas algo de esta empresa? quiza ellos te puedan ayudar</span>
                    <DomiciliariosXciudad idMun={this.props.idMun} />
                </div>
            </div>
        )
    }
}
