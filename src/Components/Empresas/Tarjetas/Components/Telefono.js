import React, { Component } from 'react'
import { Linking } from 'react'
import './Telefono.scss';
import PhoneIcon from '@material-ui/icons/Phone';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import Clipboard from 'react-clipboard.js';
import { nuevoMensaje, tiposAlertas } from '../../../../Inicialized/Toast';


export default class Telefono extends Component {




    copiarLink(texto) {
        Clipboard.setString("sdfgsdfsd");


        alert('Hecho !');

    }


    callNumber = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }


    whatsapp = (phone, wp) => {
        if (wp != 0) {
            const url = 'whatsapp://send?text=Buen día, te contacto por  medio de www.mako.guru, quisiera...&phone=+57' + phone;

            Linking.canOpenURL(url).then(supported => {
                if (!supported) {
                    console.log('Can\'t handle url: ' + url);
                } else {
                    return Linking.openURL(url);
                }
            }).catch(err => console.error('An error occurred', err));
        };
    }



    render() {
        const { telefono, dependencia, wp, tipo } = this.props.item;
        var what = 'botonWhatsappActivo';

        if (wp == '0') {
            what = 'botonWhatsappInactivo';
        };


        let llamada = `tel:${telefono}`;

        if (wp == 0) {

        };

        if (tipo == 1) {
            llamada = `tel:038${telefono}`;

        };

        return (
            <div className="telefono">

                <Clipboard data-clipboard-text={telefono} onClick={() => nuevoMensaje(tiposAlertas.info, telefono + ' - copiado al portapapeles ')} className="botonInfo botonInfo2" >
                    <FileCopyOutlinedIcon style={{ fontSize: 15 }} />
                    <span >Copiar</span>
                </Clipboard>


                {tipo == 0 && wp == 1 ?
                    <a href={'https://api.whatsapp.com/send?phone=57' + telefono + '&text=Hola,%20te%20contacto%20desde%20www.mako.guru'} target="_blank" className={"botonInfo botonInfo2 " + what} >
                        <WhatsAppIcon style={{ fontSize: 15 }} />
                        <span >WhatsApp</span>
                    </a>
                    :
                    null
                }

                <a href={llamada} className="botonInfo">
                    <span className="subLabel">{dependencia}</span>
                    {tipo == 1 ?
                        <PhoneIcon />
                        :
                        <PhoneAndroidIcon />
                    }
                    <span >{telefono}</span>
                </a>

            </div>
        );
    }
}
