import axios from 'axios';

export default class User {
    constructor(App){
        this.App = App;
        this.first_name = null;
        this.last_name = null;
        this.age = null;
        let self = this;
        axios.get(route('test')['template'])
            .then(function(response){
                console.log(response);
                self.first_name = response['data']['data']['first_name'];
                self.last_name = response['data']['data']['last_name'];
                self.age = response['data']['data']['age'];
                self.init();
            }).catch(error => {
                console.log(error);
            });

    }
    init(){

    }
    fullNameAttribute(){
        let self = this;
        return self.first_name + ' '+self.last_name
    }
}