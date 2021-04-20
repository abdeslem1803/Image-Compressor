import React, { Component } from 'react'
import picture from '../picture.jpg' ;
import imageCompression from 'browser-image-compression';

export class ImageCompressor extends Component {
    
  constructor(props) {
    super(props)
  
    this.state = {
       selected_file : false,
       original_Link : picture,
       original_image : picture,
       original_name : "",
       compressed_link: null,
       new_image : picture ,
       image_converted : false ,
    }

    this.onImageUpload = this.onImageUpload.bind(this)
    
    
  }


  onImageUpload = (event) => {
   const ImageFile = event.target.files[0];
    this.setState({
      selected_file :true,
      original_Link :  URL.createObjectURL(event.target.files[0]),
      original_image : ImageFile,
      original_name : ImageFile.name,
    });   

  }
  compress = () =>{
  
    var options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }
    let compressedFile ;
    imageCompression(this.state.original_image, options)
    .then(x =>  {
      compressedFile = x ;
      this.setState({
        new_image: URL.createObjectURL(compressedFile),
        image_converted : true,
      })
    }).catch(function (error) {
      console.log(error.message);
    });
  }
    render() {
        
    let button ;
    if(this.state.selected_file){
      button = <button id="compress_button" onClick={this.compress}>Compress </button> ;
    }
    let download ;
    if(this.state.image_converted)
    download = <a id="download"  href={this.state.new_image}
    download={this.state.original_name}> Download </a> ;
    return (
    
      <header className="App-header">
        <h1>Upload your image.</h1>
        <div id="picture">
        <div id="picture-update">
          <img src={this.state.original_Link} id="intro" alt="Mettez votre image" />
          <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={this.onImageUpload}/>
          
        </div>
        <div id="picture-update">
        <img src={this.state.new_image} alt=" image" />
        {download}
        </div>
        
        </div>
        <div id="#div_convertir">
        {button}
        </div>
      </header>
    
  
    )
  }
}

export default ImageCompressor
