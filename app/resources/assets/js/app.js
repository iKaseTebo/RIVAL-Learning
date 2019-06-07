// Import All Classes Here ---------------------------------------
import User from './classes/user';





// Import All Modules Here ---------------------------------------
import axios from 'axios';
import { initializePages }  from './modules/pages';







//-----------------------------------------------------------------
// JavaScript for the Entire Application
// Explanation https://www.youtube.com/watch?v=T-HGdc8L-7w


class App {

    constructor(window, document, axios) {
        this.elements();
        initializePages(this);
        this.setUser();
        this.init();
    }
    init(){
        this.eventListeners();

    }
    elements(){
        this.$body = document.getElementsByTagName('body')[0];
        this.header = document.getElementById('app-header');
        this.footer = document.getElementById('app-footer');
    }
    eventListeners(){
        let self = this;
        this.$body.addEventListener('click', self.consoleLog)
    }
    setUser(){
        let self = this;
        self._activeUser = new User(self);
    }
    consoleLog(){
        console.log('testing');
    }
}

document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        const RIVAL = new App(window, document, axios)
    }
};