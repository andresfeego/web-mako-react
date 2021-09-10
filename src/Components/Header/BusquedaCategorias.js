import React, { Component } from 'react'
import "./BusquedaCategorias.scss"
import { connect } from 'react-redux'

import Toc from '@material-ui/icons/Toc';

import { saveCategoria, savelblCategoria } from '../../Inicialized/Actions';


class BusquedaCategorias extends Component {





	cambiaCat(cat, label) {
		this.props.saveCategoria(cat);
		this.props.savelblCategoria(label);
	}

	render() {
		return (
			<ul className="BusquedaCategorias">


				<li className="touch" id="makoTouch" onClick={() => this.cambiaCat(299, 'Asesor MAKO')} >
					<div className="circulo">
						<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className="icono" src={require('../../Iconos/mako.png')} />
					</div>
					<h2 className="textoCat"> Asesor MAKO</h2>
				</li>

				<li className="touch" onClick={() => this.cambiaCat(19, 'Domicilios     p-a-p')} >
					<div className="circulo">
						<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className="icono" src={require('../../Iconos/pap.png')} />
					</div>
					<h2 className="textoCat">Domicilios     p-a-p</h2>
				</li>


				<li className="touch" onClick={() => this.cambiaCat(1, 'Taxis')} >
					<div className="circulo">
						<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className="icono" src={require('../../Iconos/taxis.png')} />
					</div>
					<h2 className="textoCat">Taxis</h2>
				</li>

				<li className="touch" onClick={() => this.cambiaCat(301, 'Alquiler de lavadoras')} >
					<div className="circulo">
						<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className="icono" src={require('../../Iconos/lavadoras.png')} />
					</div>
					<h2 className="textoCat">Alquiler de lavadoras</h2>
				</li>

				<li className="touch" onClick={() => this.cambiaCat(127, ' Cerrajeros')} >
					<div className="circulo">
						<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className="icono" src={require('../../Iconos/cerrajeros.png')} />
					</div>
					<h2 className="textoCat"> Cerrajeros</h2>
				</li>

				<li className="touch" onClick={() => this.cambiaCat(3, ' Acarreos')} >
					<div className="circulo">
						<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className="icono" src={require('../../Iconos/acarreos.png')} />
					</div>
					<h2 className="textoCat"> Acarreos</h2>
				</li>


				<li className="touch" onClick={() => this.cambiaCat(30, ' Asaderos')} >
					<div className="circulo">
						<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className="icono" src={require('../../Iconos/asaderos.png')} />
					</div>
					<h2 className="textoCat"> Asaderos</h2>
				</li>

				<li className="touch" onClick={() => this.cambiaCat(102, ' Bares')} >
					<div className="circulo">
						<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className="icono" src={require('../../Iconos/bares.png')} />
					</div>
					<h2 className="textoCat"> Bares</h2>
				</li>


				<li className="touch" onClick={() => this.cambiaCat(31, ' Cafeterías')} >
					<div className="circulo">
						<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className="icono" src={require('../../Iconos/cafeterias.png')} />
					</div>
					<h2 className="textoCat"> Cafeterías</h2>
				</li>


				<li className="touch" onClick={() => this.cambiaCat(28, ' Comida china')} >
					<div className="circulo">
						<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className="icono" src={require('../../Iconos/china.png')} />
					</div>
					<h2 className="textoCat"> Comida china</h2>
				</li>


				<li className="touch" onClick={() => this.cambiaCat(26, ' Comidas rápidas')} >
					<div className="circulo">
						<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className="icono" src={require('../../Iconos/rapida.png')} />
					</div>
					<h2 className="textoCat"> Comidas rápidas</h2>
				</li>


				<li className="touch" onClick={() => this.cambiaCat(53, ' Detalles y regalos')} >
					<div className="circulo">
						<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className="icono" src={require('../../Iconos/detalles.png')} />
					</div>
					<h2 className="textoCat"> Detalles y regalos</h2>
				</li>


				<li className="touch" onClick={() => this.cambiaCat(24, ' Restaurante ejectivo')} >
					<div className="circulo">
						<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className="icono" src={require('../../Iconos/ejecutivo.png')} />
					</div>
					<h2 className="textoCat"> Restaurante ejectivo</h2>
				</li>


				<li className="touch" onClick={() => this.cambiaCat(167, ' Funerarias')} >
					<div className="circulo">
						<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className="icono" src={require('../../Iconos/funerarias.png')} />
					</div>
					<h2 className="textoCat"> Funerarias</h2>
				</li>


				<li className="touch" onClick={() => this.cambiaCat(36, ' Heladerías')} >
					<div className="circulo">
						<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className="icono" src={require('../../Iconos/heladerias.png')} />
					</div>
					<h2 className="textoCat"> Heladerías</h2>
				</li>


				<li className="touch" onClick={() => this.cambiaCat(43, ' Licoreras')} >
					<div className="circulo">
						<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className="icono" src={require('../../Iconos/licoreras.png')} />
					</div>
					<h2 className="textoCat"> Licoreras</h2>
				</li>


				<li className="touch" onClick={() => this.cambiaCat(151, ' Mariachis')} >
					<div className="circulo">
						<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className="icono" src={require('../../Iconos/mariachis.png')} />
					</div>
					<h2 className="textoCat"> Mariachis</h2>
				</li>


				<li className="touch" onClick={() => this.cambiaCat(22, ' Parqueaderos')} >
					<div className="circulo">
						<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className="icono" src={require('../../Iconos/parqueaderos.png')} />
					</div>
					<h2 className="textoCat"> Parqueaderos</h2>
				</li>


				<li className="touch" onClick={() => this.cambiaCat(41, 'Pastelerías')} >
					<div className="circulo">
						<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className="icono" src={require('../../Iconos/pastelerias.png')} />
					</div>
					<h2 className="textoCat">Pastelerías</h2>
				</li>


				<li className="touch" onClick={() => this.cambiaCat(109, 'Piscinas')} >
					<div className="circulo">
						<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className="icono" src={require('../../Iconos/piscinas.png')} />
					</div>
					<h2 className="textoCat">Piscinas</h2>
				</li>




				<li className="touch" onClick={() => this.cambiaCat(256, 'Droguerías')} >
					<div className="circulo">
						<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className="icono" src={require('../../Iconos/drogas.png')} />
					</div>
					<h2 className="textoCat">Droguerías</h2>
				</li>


				<li className="touch" onClick={() => this.cambiaCat(205, 'Veterinarias')} >
					<div className="circulo">
						<img loading="lazy" alt="mako categorias directorio comercial Colombia" title="mako categorias directorio comercial Colombia" className="icono" src={require('../../Iconos/veterinarias.png')} />
					</div>
					<h2 className="textoCat">Veterinarias</h2>
				</li>

				<li className="touch" id="allCat" onClick={() => this.cambiaCat(7, 0)} >
					<div className="circulo">
						<Toc className="toc" />
					</div>
					<h2 className="textoCat"> Todas las categorías</h2>
				</li>


			</ul>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		categoria: state.categoria,
		lblCategoria: state.lblCategoria
	}
}

const mapDispatchToProps = {
	saveCategoria,
	savelblCategoria,

}


export default connect(mapStateToProps, mapDispatchToProps)(BusquedaCategorias);