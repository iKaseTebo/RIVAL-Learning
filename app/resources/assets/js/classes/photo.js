export default class Photo {
	constructor(pic, download){
		this.id = pic.id;
		this.source = pic.source;
		this.text = pic.text;
		this.downloadable = download;
	}
}