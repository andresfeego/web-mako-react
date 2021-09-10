import React, { Component } from 'react'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import "./PasoTres.scss"
import "./PasoTres_mobile.scss"
import { tiposAlertas, nuevoMensaje } from '../../Inicialized/Toast';
import request from 'superagent';


export default class PasoTres extends Component {
  state = {
    src: null,
    link: '',
    croppedImage: '',
    crop: {
      unit: '%',
      width: 50,
      aspect: 1 / 1,
    },
  };

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);

      nuevoMensaje(tiposAlertas.info, "Recorta la imagen y cuando este lista has click en Guardar en la parte inferior para continuar", 5000);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "#fff";


    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const reader = new FileReader()
    canvas.toBlob(blob => {
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
        this.dataURLtoFile(reader.result, 'cropped.jpg')
      }
    })

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }



  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], filename, { type: mime });
    this.setState({ croppedImage: croppedImage })
  }

  actualizaPaso() {


    request
      .post('/response/empresas/registro/actualizaPaso')
      .send({ codigo: this.props.codigo.codigo, paso: 4 }) // sends a JSON post body
      .set('accept', 'json')
      .end((err, res) => {

        if (err) {
          nuevoMensaje(tiposAlertas.cargadoError, "Error al guardar información, intenta guardar de nuevo en unos minutos por favor");
        } else {
          nuevoMensaje(tiposAlertas.cargadoSuccess, "Información actualizada, sigamos con el paso 4");
          this.props.fun.setCurrentStep(4);

        }


      });

  }


  guardaLogo() {
    nuevoMensaje(tiposAlertas.cargando, "Actualizando información, por favor espere..");


    request
      .post('/response/empresas/registro/actualizaUrlLogo')
      .send({ codigo: this.props.codigo.codigo, link: this.state.link }) // sends a JSON post body
      .set('accept', 'json')
      .end((err, res) => {

        if (err) {
          nuevoMensaje(tiposAlertas.cargadoError, "Error al guardar información, intenta guardar de nuevo en unos minutos por favor");
        } else {
          nuevoMensaje(tiposAlertas.cargadoSuccess, "Información actualizada");
          this.actualizaPaso();
        }


      });

  }


  onSubmit = () => {

    nuevoMensaje(tiposAlertas.cargando, "Subiendo imagen, por favor espere..");
    request
      .post('/response/uploadLogo/' + this.props.codigo.codigo)
      .attach('image', this.state.croppedImage)
      .set('accept', 'json')
      .end((err, res) => {

        if (err) {
          nuevoMensaje(tiposAlertas.cargadoError, "Error al guardar imagen, intenta guardar de nuevo en unos minutos por favor");
        } else {

          nuevoMensaje(tiposAlertas.cargadoSuccess, "Imagen guardada");

          const respuestaLogin = JSON.parse(res.text);
          this.setState({
            link: respuestaLogin.image.filename
          })

          this.guardaLogo();

        }


      });
  }


  render() {
    const { crop, croppedImageUrl, src } = this.state;

    return (
      <div className="containerCrop">
        <form>
          <input type="file" accept="image/*" className="buttonSelectImage" onChange={this.onSelectFile} />
        </form>
        <br />
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            ruleOfThirds
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
        {croppedImageUrl && (

          [<span className="descripcionDos" >Así se vera tu logo en el perfil</span>,
          <img loading="lazy" alt="Crop " className="cropImage" style={{ maxWidth: '100%' }} src={croppedImageUrl} />,
          <div className="inputform buttonDos" onClick={this.onSubmit}>Guardar</div>]

        )}

      </div>
    );
  }
}




