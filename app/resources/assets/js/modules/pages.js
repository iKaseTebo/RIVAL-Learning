import Gallery from '../classes/gallery';

export function initializePages(App){
    initGallery(App);
    initIndex(App);
}

function initIndex(App){
    console.log('Index');
}
function initGallery(App){
    let self = App;
    self.gallery = new Gallery(self);
}