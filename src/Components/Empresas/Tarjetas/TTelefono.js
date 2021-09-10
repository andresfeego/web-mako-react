import React, { Component } from 'react';
import './TTelefono.scss';
import Telefono from './Components/Telefono.js'
import PhoneIcon from '@material-ui/icons/Phone';
import request from 'superagent';


export default class componentName extends Component {

    constructor(props) {
        super(props);
        this.state = {
            telefonos: [],
            id: this.props.id
        }
    }

    componentDidMount() {
        this.getTelefonos();
    }

    getTelefonos() {


        request
            .get('/response/empresas/telefonos/' + this.props.id)
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    console.log(err);

                } else {
                    const responseJson = JSON.parse(res.text);

                    this.setState({
                        telefonos: responseJson,
                    })
                }
            });


    }



    render() {
        return (
            <div className="tarjetaContenido">
                <PhoneIcon className="tarjetaContenidoIcon" style={{ fontSize: 30 }} />
                {this.state.telefonos.map((item) => <Telefono key={item.telefono} item={item} />)}
            </div>
        );
    }
}
