import React, { Component } from 'react'
import "./PasoOcho.scss"
import "./PasoOcho_mobile.scss"
import { FormControl, Input, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import request from 'superagent';
import { nuevoMensaje, tiposAlertas } from '../../Inicialized/Toast';
import { WithContext as ReactTags } from 'react-tag-input';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';




const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class PasoOcho extends Component {

    constructor(props) {
        super(props)

        this.state = {
            categorias: [],
            subCategorias1: [],
            subCategorias2: [],
            listaBusquedaCAt: [],

            busquedaCat: '',

            subCategoria1: '0',
            subCategoria2: 0,
            categoriaEscogida: null,
            domicilio: '0',
            costoDomicilio: '',
            VCHoras: '0',
            datafono: '0',
            transferenciaBancolombia: '0',
            transferenciaDavivienda: '0',
            domicilioCovid: '0',

            tags: [],

            suggestions: [
                { id: 'domicilios', text: 'domicilios' },
                { id: 'zapatos', text: 'zapatos' },
                { id: 'aretes', text: 'aretes' },
                { id: 'balon', text: 'balon' },
                { id: 'celulares', text: 'celulares' },
                { id: 'ropa', text: 'ropa' }
            ]

        }

        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);

    }

    componentDidMount() {
        this.getCategoriasBusqueda("a")
    }



    getCategoriasBusqueda(busqueda) {
        nuevoMensaje(tiposAlertas.cargando, "Cargando lista de categorias, por favor espere...")

        request
            .get('/response/categoriasCompletas/' + busqueda)
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    console.log(err);

                } else {
                    nuevoMensaje(tiposAlertas.cargadoSuccess, "Lista cragada")
                    const respuestaLogin = JSON.parse(res.text);
                    this.setState({
                        listaBusquedaCAt: respuestaLogin,
                    })
                }
            });
    }



    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }
    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }



    handleChangeCategoria = (event) => {

        this.setState({
            subCategoria1: '',
            subCategorias1: [],

            subCategoria2: '',
            subCategorias2: [],

        });

        const name = event.target.name;
        this.setState({
            [name]: event.target.value,
        });
        this.getSubCat1(event.target.value);
    };


    handleChangeSubCat1 = (event) => {

        this.setState({

            subCategoria2: '',
            subCategorias2: [],

        });

        const name = event.target.name;
        this.setState({
            [name]: event.target.value,
        });
        this.getSubCat2(event.target.value);
    };

    handleChangeSubCat2 = (event) => {

        const name = event.target.name;
        this.setState({
            [name]: event.target.value,
        });

    };


    getSubCat1(id) {
        nuevoMensaje(tiposAlertas.cargando, "Cargando lista de sub categorias 1, por favor espere...")

        request
            .get('/response/subcategoria1/' + id)
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    console.log(err);

                } else {
                    nuevoMensaje(tiposAlertas.cargadoSuccess, "Lista cragada")
                    const respuestaLogin = JSON.parse(res.text);
                    this.setState({
                        subCategorias1: respuestaLogin,
                    })
                }
            });
    }


    getSubCat2(id) {
        nuevoMensaje(tiposAlertas.cargando, "Cargando lista de sub categorias 2, por favor espere...")

        request
            .get('/response/subcategoria2/' + id)
            .set('accept', 'json')
            .end((err, res) => {
                if (err) {
                    console.log(err);

                } else {
                    nuevoMensaje(tiposAlertas.cargadoSuccess, "Lista cragada")
                    const respuestaLogin = JSON.parse(res.text);
                    this.setState({
                        subCategorias2: respuestaLogin,
                    })
                }
            });
    }

    validarInfo() {
        if (this.state.subCategoria2 == 0) {
            nuevoMensaje(tiposAlertas.error, "Es necesario que escojas la categoria correcta, si no la encuentras ubicate en la mas cercana y envianos un correo a contacto@mako.guru", 10000)
        } else {
            if (this.state.tags.length == 0) {
                nuevoMensaje(tiposAlertas.error, "Es necesario agregar al menos una palabra clave")
            } else {
                if (this.state.domicilio == '1') {
                    if (this.state.costoDomicilio == '') {
                        nuevoMensaje(tiposAlertas.error, "Es necesario agregar el costo aproximado del domicilio")
                    } else {
                        return true
                    }
                } else {
                    return true
                }
            }
        }
    }

    convertirTags() {
        const tagsLen = this.state.tags.length;
        var tags = ''
        this.state.tags.map((item, i) => {
            if (tagsLen == i + 1) {
                tags = tags + item.text
            } else {
                tags = tags + item.text + ','
            }
        })
        return tags
    }


    actualizaPaso() {


        request
            .post('/response/empresas/registro/actualizaPaso')
            .send({ codigo: this.props.codigo.codigo, paso: 9 }) // sends a JSON post body
            .set('accept', 'json')
            .end((err, res) => {

                if (err) {
                    nuevoMensaje(tiposAlertas.cargadoError, "Error al guardar información, intenta guardar de nuevo en unos minutos por favor");
                } else {
                    nuevoMensaje(tiposAlertas.cargadoSuccess, "Información actualizada, sigamos con el paso 9");
                    this.props.fun.setCurrentStep(9);

                }


            });

    }

    guardarInfo() {
        if (this.validarInfo()) {

            nuevoMensaje(tiposAlertas.cargando, "Guardando información")
            request
                .post('/response/empresas/registro/updateInformacionAdicional')
                .send({
                    codigo: this.props.codigo.codigo,
                    categoria: this.state.subCategoria2,
                    domicilio: this.state.domicilio,
                    costoDomicilio: this.state.costoDomicilio,
                    VCHoras: this.state.VCHoras,
                    datafono: this.state.datafono,
                    transferenciaBancolombia: this.state.transferenciaBancolombia,
                    transferenciaDavivienda: this.state.transferenciaDavivienda,
                    domicilioCovid: this.state.domicilioCovid,
                    tags: this.convertirTags()
                }) // sends a JSON post body

                .set('accept', 'json')
                .end((err, res) => {

                    if (err) {
                        nuevoMensaje(tiposAlertas.cargadoError, "Error al guardar infomación, intenta guardar de nuevo en unos minutos por favor");
                    } else {
                        this.actualizaPaso();
                    }


                });

        }
    }


    asignarCategoria(item) {

        this.setState({
            subCategoria2: item.id,
            categoriaEscogida: item
        })

    }

    BorrarCat() {

        this.setState({
            subCategoria2: 0,
            categoriaEscogida: null
        })

    }

    renderCategoria(item) {
        return (
            <div className="contCategoria" key={item.id}>
                <div className="categoria">
                    <div>
                        <span className="labelCat"> Categoría: </span> <br className="saltoLineaCat" />{item.nombre}
                    </div>

                    <div>
                        <span className="labelCat"> Subcategoria 1: </span><br className="saltoLineaCat" />{item.nombreSub1}
                    </div>

                    <div>
                        <span className="labelCat"> Subcategoria 2: </span><br className="saltoLineaCat" />{item.nombreSub2}
                    </div>

                    {this.state.subCategoria2 == 0 ?
                        <div className="btnCat btnAsignar" onClick={() => this.asignarCategoria(item)} >Asignar</div>
                        :
                        <CancelIcon style={{ fontSize: 40 }} className="btnCat btnBorrar" onClick={() => this.BorrarCat()} />
                    }

                </div>


            </div>
        )
    }


    render() {

        const { tags, suggestions } = this.state;


        return (
            <div className="PasoCincoContainer">
                <form noValidate className="formularioRegistroEmp">
                    <div className="selectDepertamentos">


                        {this.state.subCategoria2 == 0 ?
                            <div className="busquedaCat">
                                <div className="contBarraBusqueda">
                                    <div className="barraBusqueda">
                                        <Input className="inputformBusCat" type="text" placeholder="Busca una categoría" value={this.state.busquedaCat} name="busquedaCat" onChange={this.onChange} />
                                    </div>
                                    <div className="iconBuscar">
                                        <SearchIcon onClick={() => this.getCategoriasBusqueda(this.state.busquedaCat)} />
                                    </div>

                                </div>

                                <div className="categoriasSeleccionables">
                                    {this.state.listaBusquedaCAt.length != 0 ?
                                        this.state.listaBusquedaCAt.map((item) => this.renderCategoria(item))
                                        :
                                        "Lista vacía"
                                    }
                                </div>
                            </div>
                            :
                            [
                                this.renderCategoria(this.state.categoriaEscogida),
                                <br />
                            ]
                        }




                        <FormControl component="fieldset" className={this.props.classes.formControlSelect}>
                            <FormLabel component="legend">Prestas servicio a domicilio regularmente ?</FormLabel>
                            <RadioGroup aria-label="tipo" className="radioGroupPasoOcho" name="domicilio" value={this.state.domicilio} onChange={this.onChange}>
                                <FormControlLabel
                                    value='0'
                                    control={<Radio color="primary" />}
                                    label="No"
                                />
                                <FormControlLabel
                                    value='1'
                                    control={<Radio color="primary" />}
                                    label="Si"
                                />

                            </RadioGroup>
                        </FormControl>

                        {this.state.domicilio == '1' ?
                            <Input className="inputform inputFormPasoOcho" type="number" placeholder="Costo aproximado del domicilio" value={this.state.costoDomicilio} name="costoDomicilio" onChange={this.onChange} />
                            :
                            null
                        }

                        <FormControl component="fieldset" className={this.props.classes.formControlSelect}>
                            <FormLabel component="legend">Prestas servicio telefonico las 24 horas ?</FormLabel>
                            <RadioGroup aria-label="tipo" className="radioGroupPasoOcho" name="VCHoras" value={this.state.VCHoras} onChange={this.onChange}>
                                <FormControlLabel
                                    value='0'
                                    control={<Radio color="primary" />}
                                    label="No"
                                />
                                <FormControlLabel
                                    value='1'
                                    control={<Radio color="primary" />}
                                    label="Si"
                                />

                            </RadioGroup>
                        </FormControl>

                        <FormControl component="fieldset" className={this.props.classes.formControlSelect}>
                            <FormLabel component="legend">Tienes servicio de datafono ?</FormLabel>
                            <RadioGroup aria-label="tipo" className="radioGroupPasoOcho" name="datafono" value={this.state.datafono} onChange={this.onChange}>
                                <FormControlLabel
                                    value='0'
                                    control={<Radio color="primary" />}
                                    label="No"
                                />
                                <FormControlLabel
                                    value='1'
                                    control={<Radio color="primary" />}
                                    label="Si"
                                />

                            </RadioGroup>
                        </FormControl>

                        <FormControl component="fieldset" className={this.props.classes.formControlSelect}>
                            <FormLabel component="legend">Ofreces pagos mediente transferencia Bancolombia ?</FormLabel>
                            <RadioGroup aria-label="tipo" className="radioGroupPasoOcho" name="transferenciaBancolombia" value={this.state.transferenciaBancolombia} onChange={this.onChange}>
                                <FormControlLabel
                                    value='0'
                                    control={<Radio color="primary" />}
                                    label="No"
                                />
                                <FormControlLabel
                                    value='1'
                                    control={<Radio color="primary" />}
                                    label="Si"
                                />

                            </RadioGroup>
                        </FormControl>

                        <FormControl component="fieldset" className={this.props.classes.formControlSelect}>
                            <FormLabel component="legend" className="selectPasoOcho">Ofreces pagos mediente transferencia Davivienda?</FormLabel>
                            <RadioGroup aria-label="tipo" className="radioGroupPasoOcho" name="transferenciaDavivienda" value={this.state.transferenciaDavivienda} onChange={this.onChange}>
                                <FormControlLabel
                                    value='0'
                                    control={<Radio color="primary" />}
                                    label="No"
                                />
                                <FormControlLabel
                                    value='1'
                                    control={<Radio color="primary" />}
                                    label="Si"
                                />

                            </RadioGroup>
                        </FormControl>

                        <div className="contCovid">
                            <FormControl component="fieldset" className={this.props.classes.formControlSelect}>
                                <FormLabel component="legend" className="selectPasoOcho">Ofreces servicio a domicilio por emergancia del COVID-19?</FormLabel>
                                <RadioGroup aria-label="tipo" className="radioGroupPasoOcho" name="domicilioCovid" value={this.state.domicilioCovid} onChange={this.onChange}>
                                    <FormControlLabel
                                        value='0'
                                        control={<Radio color="primary" />}
                                        label="No"
                                    />
                                    <FormControlLabel
                                        value='1'
                                        control={<Radio color="primary" />}
                                        label="Si"
                                    />

                                </RadioGroup>
                            </FormControl>
                        </div>

                    </div>

                    <span className="palabrasClave">Agrega palabras clave por las cuales encontraran tu negocio en google, escribe la palabra o frase y presiona enter o ,</span>
                    <ReactTags tags={tags}
                        suggestions={suggestions}
                        handleDelete={this.handleDelete}
                        handleAddition={this.handleAddition}
                        handleDrag={this.handleDrag}
                        placeholder={"Palabra clave o hashtag"}
                        delimiters={delimiters} />

                    <div className="inputform buttonUno" onClick={() => this.guardarInfo()}>Guardar</div>

                </form>


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

    formControlSelect: {
        marginTop: '1em',
        justifyContent: 'center',
        width: '100%',
        textAlign: 'initial'
    },

    formControlRbutton: {
        justifyContent: 'flex-start'
    }



})(PasoOcho));