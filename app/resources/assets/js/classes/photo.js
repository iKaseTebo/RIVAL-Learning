export default class Photo {
	constructor(pic, download){
		this._id = pic.id;
		this._source = pic.source;
		this._text = pic.text;
		this._downloadable = download;
	}

	//	Getters
	get source(){
		return this._source;
	}

	get id(){
		return this._id;
	}

	get text(){
		return this._text;
	}

	get downloadable(){
		return this._downloadable;
	}

	//	Setters
	set source(src){
		this._source = src;
	}

    set id(id){
        this._id = id;
    }

    set text(txt){
        this._text = txt;
    }

    set downloadable(down){
        this._downloadable = down;
    }
}