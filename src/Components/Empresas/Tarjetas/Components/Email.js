import React, { Component } from 'react'
import "./Email.scss"

export default class Email extends Component {

    render() {
        const email = this.props.email;

        return (
            <div className="Email botonInfo">
                <a href={'mailto:' + email.correo + '?subject=Contacto por medio de www.mako.guru&body=Mensaje:'} >
                    {email.correo}
                </a>


            </div>
        )
    }
}
