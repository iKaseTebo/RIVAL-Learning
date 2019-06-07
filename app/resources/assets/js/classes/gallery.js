import axios from 'axios';
import Photo from './photo';

export default class Gallery {
    constructor(App) {
        this._App = App;
        this._photos = [];
        this._pagination = [];
        this.elements();
        if (this._galleryContainer) {
            this.init()
        }
    }

    init() {
        console.log('Initializing Gallery..');
        this.generateGallery();
    }

    elements() {
        this._galleryContainer = document.getElementById('gallery-container');
        this._gallerySection = document.querySelector('#gallery-section');
        this._imageTemplate = document.querySelector('.gallery-image-template-div');
    }

    generateGallery() {
        let self = this;
        axios.get(route('photos.get')['template'])
            .then(function (res) {
                res['data'].forEach((value) => {
                    let newPhoto = new Photo(value, false);
                    self._photos.push(newPhoto);
                })
            })
            .catch(function(error){
                console.log(error)
            })
            .finally(function(){
                if(self._photos){
                    self.listPhotos();
                }
            });
    }
    listPhotos(){
        let self = this;
        self._photos.forEach((value)=>{
            self.newGalleryPhoto(value);
        });

    }
    newGalleryPhoto(photo){
        let self = this;
        let newGalleryImage = self._imageTemplate.cloneNode(true);

        newGalleryImage.className = "gallery-image-div";
        newGalleryImage.setAttribute('id', 'gallery-image-div-'+photo.id);

        let imageId = newGalleryImage.querySelector('.template-image-id');
        let imageSrc = newGalleryImage.querySelector('.template-image-source');
        let imageTxt = newGalleryImage.querySelector('.template-image-text');

        imageId.setAttribute('id', 'image-id-'+photo.id);
        imageId.className = '';
        let idNode = document.createTextNode(photo.id);
        imageId.appendChild(idNode);

        imageSrc.setAttribute('id', 'image-source-'+photo.id);
        imageSrc.className = '';
        let srcNode = document.createTextNode(photo.source);
        imageSrc.appendChild(srcNode);

        imageTxt.setAttribute('id', 'image-text-'+photo.id);
        imageTxt.className = '';
        let txtNode = document.createTextNode(photo.text);
        imageTxt.appendChild(txtNode);

        self._gallerySection.appendChild(newGalleryImage);
    }

    //  Getters
    get photos() {
        return this._photos;
    }

    //  Setters
    set photos(pics) {
        this._photos = pics;
    }


}