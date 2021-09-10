import React, { Component } from 'react';
import './TServicio.scss'
import StoreIcon from '@material-ui/icons/Store';

export default class componentName extends Component {

  render() {
    return (
      <div className="tarjetaContenido">
        <StoreIcon className="tarjetaContenidoIcon" style={{ fontSize: 30 }} />
        <span style={{ fontSize: 20 }} >{this.props.servicio}</span>
      </div>
    );
  }
}
