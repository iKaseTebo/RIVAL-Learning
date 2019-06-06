import axios from 'axios';
import Photo from 'photo';

export default class Gallery {
	constructor(App){
		this.App = App;
		this.photos = null;
		this.pagination = [];
		let self = this;
		this.init();
	}
	init(){
		this.photos();






	}
	photos(){
		let self = this;
		axios.get(routes('photos.get')['template'])
			.then(function(res){
				console.log(res);
			})



	}

}