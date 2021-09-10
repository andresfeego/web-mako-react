import React, { Component } from 'react'
import "./FondoInfo.scss"
import { Link } from "react-router-dom";


export default class FondoInfo extends Component {
    render() {
        return (
            <Link className="FondoInfo" id="FondoInfo" to="/directorio">
            </Link>
        )
    }
}
