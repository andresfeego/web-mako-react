import React, { Component } from 'react'
import "./PasoSiete.scss"
import "./PasoSiete_mobile.scss"
import { FormControl, Select, InputLabel, FormLabel, Radio, FormControlLabel, RadioGroup } from '@material-ui/core';
import request from 'superagent';
import { withStyles } from '@material-ui/core/styles'
import { nuevoMensaje, tiposAlertas } from '../../Inicialized/Toast';
import Horario from "../Empresas/Tarjetas/Components/Horario"
import DeleteIcon from '@material-ui/icons/Delete';

class PasoSiete extends Component {


    constructor(props) {
        super(props);
        this.state = {
            horarios: [],

            tipoHorarios: [],

            tipoHorario: '0',
            tipoJornada: '0',

            mananaDe: '8:00 am',
            mananaA: '12:00 pm',
            tardeDe: '2:00 pm',
            tardeA: '6:00 pm',
            continuaDe: '8:00 am',
            continuaA: '6:00 pm',
        }
    }

    componentDidMount() {
        this.getTipoHorarios();
        this.getHorarios();
    }



    onChangeInput = e => {

        this.setState({
            [e.target.name]: e.target.value,
        });
    }


    getHorarios() {

        request
            .get('/response/empresas/horarios/' + this.props.codigo.codigo)
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    console.log(err);

                } else {

                    const respuestaLogin = JSON.parse(res.text);
                    this.setState({
                        horarios: respuestaLogin,
                    })
                }
            });


    }

    getTipoHorarios() {

        request
            .get('/response/tiposHorarios')
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    console.log(err);

                } else {

                    const respuestaLogin = JSON.parse(res.text);
                    this.setState({
                        tipoHorarios: respuestaLogin,
                    })
                }
            });


    }


    renderHoras = () => {
        return (
            [
                <option value="12:00 am">12:00 am</option>,
                <option value="12:30 am">12:30 am</option>,
                <option value="1:00 am">1:00 am</option>,
                <option value="1:30 am">1:30 am</option>,
                <option value="2:00 am">2:00 am</option>,
                <option value="2:30 am">2:30 am</option>,
                <option value="3:00 am">3:00 am</option>,
                <option value="3:30 am">3:30 am</option>,
                <option value="4:00 am">4:00 am</option>,
                <option value="4:30 am">4:30 am</option>,
                <option value="5:00 am">5:00 am</option>,
                <option value="5:30 am">5:30 am</option>,
                <option value="6:00 am">6:00 am</option>,
                <option value="6:30 am">6:30 am</option>,
                <option value="7:00 am">7:00 am</option>,
                <option value="7:30 am">7:30 am</option>,
                <option value="8:00 am">8:00 am</option>,
                <option value="8:30 am">8:30 am</option>,
                <option value="9:00 am">9:00 am</option>,
                <option value="9:30 am">9:30 am</option>,
                <option value="10:00 am">10:00 am</option>,
                <option value="10:30 am">10:30 am</option>,
                <option value="11:00 am">11:00 am</option>,
                <option value="11:30 am">11:30 am</option>,
                <option value="12:00 pm">12:00 pm</option>,
                <option value="12:30 pm">12:30 pm</option>,
                <option value="1:00 pm">1:00 pm</option>,
                <option value="1:30 pm">1:30 pm</option>,
                <option value="2:00 pm">2:00 pm</option>,
                <option value="2:30 pm">2:30 pm</option>,
                <option value="3:00 pm">3:00 pm</option>,
                <option value="3:30 pm">3:30 pm</option>,
                <option value="4:00 pm">4:00 pm</option>,
                <option value="4:30 pm">4:30 pm</option>,
                <option value="5:00 pm">5:00 pm</option>,
                <option value="5:30 pm">5:30 pm</option>,
                <option value="6:00 pm">6:00 pm</option>,
                <option value="6:30 pm">6:30 pm</option>,
                <option value="7:00 pm">7:00 pm</option>,
                <option value="7:30 pm">7:30 pm</option>,
                <option value="8:00 pm">8:00 pm</option>,
                <option value="8:30 pm">8:30 pm</option>,
                <option value="9:00 pm">9:00 pm</option>,
                <option value="9:30 pm">9:30 pm</option>,
                <option value="10:00 pm">10:00 pm</option>,
                <option value="10:30 pm">10:30 pm</option>,
                <option value="11:00 pm">11:00 pm</option>,
                <option value="11:30 pm">11:30 pm</option>
            ]
        )
    }

    renderJornadaDividida = () => {
        return (

            <div className="contJornadas">
                <div className="contManana contManTar">
                    <h3>Mañana: </h3>

                    <div className="selectDepertamentos selectJornadas">
                        <FormControl className={this.props.classes.formControl}>
                            <InputLabel htmlFor="age-native-simple">De: </InputLabel>
                            <Select
                                native
                                value={this.state.mananaDe}
                                onChange={(event) => this.onChangeInput(event)}
                                inputProps={{
                                    name: 'mananaDe',
                                    id: 'mananaDe',
                                }}
                            >
                                {this.renderHoras()}
                            </Select>
                        </FormControl>
                    </div>


                    <div className="selectDepertamentos selectJornadas">
                        <FormControl className={this.props.classes.formControl}>
                            <InputLabel htmlFor="age-native-simple">A: </InputLabel>
                            <Select
                                native
                                value={this.state.mananaA}
                                onChange={(event) => this.onChangeInput(event)}
                                inputProps={{
                                    name: 'mananaA',
                                    id: 'mananaA',
                                }}
                            >
                                {this.renderHoras()}
                            </Select>
                        </FormControl>
                    </div>




                </div>

                <div className="contTarde contManTar">
                    <h3>Tarde:</h3>

                    <div className="selectDepertamentos selectJornadas">
                        <FormControl className={this.props.classes.formControl}>
                            <InputLabel htmlFor="age-native-simple">A: </InputLabel>
                            <Select
                                native
                                value={this.state.tardeDe}
                                onChange={(event) => this.onChangeInput(event)}
                                inputProps={{
                                    name: 'tardeDe',
                                    id: 'tardeDe',
                                }}
                            >
                                {this.renderHoras()}
                            </Select>
                        </FormControl>
                    </div>

                    <div className="selectDepertamentos selectJornadas">
                        <FormControl className={this.props.classes.formControl}>
                            <InputLabel htmlFor="age-native-simple">A: </InputLabel>
                            <Select
                                native
                                value={this.state.tardeA}
                                onChange={(event) => this.onChangeInput(event)}
                                inputProps={{
                                    name: 'tardeA',
                                    id: 'tardeA',
                                }}
                            >
                                {this.renderHoras()}
                            </Select>
                        </FormControl>
                    </div>

                </div>
            </div>

        )
    }

    renderJornadaContinua = () => {
        return (

            <div className="contJornadas">
                <div className="contContinua contManTar">
                    <h3>Jornada continua: </h3>

                    <div className="selectDepertamentos selectJornadas">
                        <FormControl className={this.props.classes.formControl}>
                            <InputLabel htmlFor="age-native-simple">De: </InputLabel>
                            <Select
                                native
                                value={this.state.continuaDe}
                                onChange={(event) => this.onChangeInput(event)}
                                inputProps={{
                                    name: 'continuaDe',
                                    id: 'continuaDe',
                                }}
                            >
                                {this.renderHoras()}
                            </Select>
                        </FormControl>
                    </div>


                    <div className="selectDepertamentos selectJornadas">
                        <FormControl className={this.props.classes.formControl}>
                            <InputLabel htmlFor="age-native-simple">A: </InputLabel>
                            <Select
                                native
                                value={this.state.continuaA}
                                onChange={(event) => this.onChangeInput(event)}
                                inputProps={{
                                    name: 'continuaA',
                                    id: 'continuaA',
                                }}
                            >
                                {this.renderHoras()}
                            </Select>
                        </FormControl>
                    </div>




                </div>





            </div>

        )
    }

    renderJornadas = () => {
        if (this.state.tipoJornada == '0') {
            return this.renderJornadaDividida()
        } else {
            return this.renderJornadaContinua()
        }
    }

    validarInfoHorario() {

        if (this.state.tipoHorario == '0') {
            nuevoMensaje(tiposAlertas.error, "Escoge un rango de dias para tu horario")
        } else {
            return true
        }
    }

    agregarJornadaDividida() {

        nuevoMensaje(tiposAlertas.cargando, "Guardando horario")
        request
            .post('/response/empresas/registro/agregarJornadaDividida')
            .send({ codigo: this.props.codigo.codigo, tipoHorario: this.state.tipoHorario, mananaDe: this.state.mananaDe, mananaA: this.state.mananaA, tardeDe: this.state.tardeDe, tardeA: this.state.tardeA }) // sends a JSON post body
            .set('accept', 'json')
            .end((err, res) => {

                if (err) {
                    nuevoMensaje(tiposAlertas.cargadoError, "Error al agregar horario, intenta guardar de nuevo en unos minutos por favor");
                } else {
                    nuevoMensaje(tiposAlertas.cargadoSuccess, "Horario agregado");
                    this.setState({
                        tipoHorario: '0',
                        tipoJornada: '0',

                    })
                    this.getHorarios();
                }


            });

    }


    agregarJornadaContinua() {

        nuevoMensaje(tiposAlertas.cargando, "Guardando horario")
        request
            .post('/response/empresas/registro/agregarJornadaContinua')
            .send({ codigo: this.props.codigo.codigo, tipoHorario: this.state.tipoHorario, continuaDe: this.state.continuaDe, continuaA: this.state.continuaA }) // sends a JSON post body
            .set('accept', 'json')
            .end((err, res) => {

                if (err) {
                    nuevoMensaje(tiposAlertas.cargadoError, "Error al agregar horario, intenta guardar de nuevo en unos minutos por favor");
                } else {
                    nuevoMensaje(tiposAlertas.cargadoSuccess, "Horario agregado");
                    this.setState({
                        tipoHorario: '0',
                        tipoJornada: '0',

                    })
                    this.getHorarios();
                }


            });

    }

    agregarHorario() {
        if (this.validarInfoHorario()) {
            if (this.state.tipoJornada == '0') {
                this.agregarJornadaDividida()
            } else {
                this.agregarJornadaContinua()
            }
        }
    }

    borrarHorario(id) {

        nuevoMensaje(tiposAlertas.cargando, "Eliminando horario")
        request
            .post('/response/empresas/registro/borrarHorario')
            .send({ idHorario: id }) // sends a JSON post body
            .set('accept', 'json')
            .end((err, res) => {

                if (err) {
                    nuevoMensaje(tiposAlertas.cargadoError, "Error al eliminar horario, intenta guardar de nuevo en unos minutos por favor");
                } else {
                    nuevoMensaje(tiposAlertas.cargadoSuccess, "Horario eliminado");

                    this.getHorarios();
                }


            });
    }


    actualizaPaso() {

        nuevoMensaje(tiposAlertas.cargando, "Guardando")

        request
            .post('/response/empresas/registro/actualizaPaso')
            .send({ codigo: this.props.codigo.codigo, paso: 8 }) // sends a JSON post body
            .set('accept', 'json')
            .end((err, res) => {

                if (err) {
                    nuevoMensaje(tiposAlertas.cargadoError, "Error al guardar información, intenta guardar de nuevo en unos minutos por favor");
                } else {
                    nuevoMensaje(tiposAlertas.cargadoSuccess, "Información actualizada, sigamos con el paso 8");
                    this.props.fun.setCurrentStep(8);

                }


            });

    }

    seguir() {
        if (this.state.horarios.length > 0) {
            this.actualizaPaso()
        } else {
            nuevoMensaje(tiposAlertas.error, "Debes agregar al menos un horario")
        }
    }


    render() {
        return (
            <div className="PasoUnoContainer PasoCincoContainer">

                <h2>Asi se verá tu horario de atención</h2>


                {this.state.horarios.length > 0 ?
                    <div className="listaHorarios">
                        {this.state.horarios.map((item) =>
                            <div className="contEmail">
                                <Horario key={item.idhorario} item={item} />
                                <div className="iconoAccion iconoDelete">
                                    <DeleteIcon onClick={() => this.borrarHorario(item.idhorario)} />
                                </div>
                            </div>
                        )}
                    </div>
                    :
                    <span>Lista de horarios vacia</span>
                }

                <form noValidate className="formularioRegistroEmp formHorarios">
                    <div className="selectDepertamentos selectJornadas">

                        {this.state.tipoHorarios.length > 0 ?
                            <FormControl className={this.props.classes.formControl}>
                                <InputLabel htmlFor="age-native-simple">Horario: </InputLabel>
                                <Select
                                    native
                                    value={this.state.tipoHorario}
                                    onChange={(event) => this.onChangeInput(event)}
                                    inputProps={{
                                        name: 'tipoHorario',
                                        id: 'tipoHorario',
                                    }}
                                >
                                    <option aria-label="Sin especificar" value="0" >Elige serie de días para tu horario</option>
                                    {this.state.tipoHorarios.map((item) => <option value={item.id}>{item.descripcion}</option>)}
                                </Select>
                            </FormControl>
                            :
                            <span>Cargando lista de días...</span>
                        }
                    </div>

                    <FormControl className="formControl" component="fieldset">
                        <FormLabel component="legend">Tipo de Jornada</FormLabel>
                        <RadioGroup aria-label="tipoJornada" className="radioGroup" name="tipoJornada" value={this.state.tipoJornada} onChange={this.onChangeInput}>
                            <FormControlLabel
                                value='0'
                                control={<Radio color="primary" />}
                                label="Jornada dividida"
                            />
                            <FormControlLabel
                                value='1'
                                control={<Radio color="primary" />}
                                label="Jornada contínua"
                            />

                        </RadioGroup>
                    </FormControl>

                    {this.renderJornadas()}

                    <div className="inputform buttonTres" onClick={() => this.agregarHorario()}>Agregar horario</div>

                </form>

                <div className="inputform buttonUno" onClick={() => this.seguir()}>Guardar</div>

            </div>
        )
    }
}

export default (withStyles({


    formControl: {
        width: '100%',
        margin: "0em 0em 1em 0em",
        minWidth: 120,
    },

    formControlInput: {
    },



})(PasoSiete));

