import React, { Component } from 'react'
import "./Horario.scss";
import request from 'superagent';

export default class Horario extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jornadas: [],
        }
    }

    componentDidMount() {
        this.getJornadas();
    }

    getJornadas() {


        request
            .get('/response/empresas/horarios/jornadas/' + this.props.item.idhorario)
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    console.log(err);

                } else {
                    const responseJson = JSON.parse(res.text);
                    this.setState({
                        jornadas: responseJson,
                    })
                }
            });


    }

    renderJornada(item) {
        return <div key={item.idjornadas} className="jornada"><span className="descJornada">{item.descJornada + " "}</span> <div><span>{item.de + " a "}</span> <span>{item.a}</span></div></div>
    }


    render() {

        const { descHorario, descJornada, de, a } = this.props.item



        return (
            <div className="horario">
                <span className="txtHorario">{descHorario}</span>
                <div className="jornadas">
                    {this.state.jornadas.map((item) => this.renderJornada(item))}
                </div>
            </div>
        )
    }
}
