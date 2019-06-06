// Import All Classes Here ---------------------------------------
import User from './classes/user';
import Gallery from './classes/gallery';




// Import All Modules Here ---------------------------------------
import axios from 'axios';
import * as testModule from './modules/test-module';







//-----------------------------------------------------------------
// JavaScript for the Entire Application
// Explanation https://www.youtube.com/watch?v=T-HGdc8L-7w


class App {

    constructor(window, document, axios) {
        this.activeUser = null;
        this.elements();
        this.init();
    }
    init(){
        this.setUser();
        this.eventListeners();
    }
    setUser(){
        let self = this;
        self.activeUser = new User(this);
    }
    consoleUser(){
        console.log(this.activeUser);
    }
    elements(){
        this.container = document.getElementById('container');
    }
    eventListeners(){
        let self = this;
        this.container.addEventListener('click', ()=>{
            self.consoleUser();    
        })
    }
}

document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        const RIVAL = new App(window, document, axios)
    }
};