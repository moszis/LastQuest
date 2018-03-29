let instance = null;

export default class EventManager {
    
    constructor() {

        if (!instance) {
            instance = this;
        }
        
        if(!global.subscriptions){
            global.subscriptions = [];
            global.lastUid = 0;
        }

        return instance;

    }

    subscribe(event, callback){

        console.log("SUBSCRIBING************************************************");
        console.log(global);

        if (!global.subscriptions.hasOwnProperty(event)){
            global.subscriptions[event] = [];
        }


        let token = (++global.lastUid).toString();

        console.log(callback);

        global.subscriptions[event].push( callback );



        console.log(global.subscriptions[event]);
        console.log("TOKEN: "+token);


        return token;

    }

    unsubsribe(token){

        for ( let event in global.subscriptions ){

            if ( global.subscriptions.hasOwnProperty( event ) ){

                for ( var i = 0, j = global.subscriptions[event].length; i < j; i++ ){

                    if ( global.subscriptions[event][i].token === token ){

                        global.subscriptions[event].splice( i, 1 );

                        return true;

                    }

                }

            }

        }

        return false;
    }

    //Work in progress
    publish(event, data){

        console.log(global.subscriptions);
        console.log(global.lastUid);


        if ( !global.subscriptions.hasOwnProperty( event ) ){
            console.log("no such event subscriptions: "+event);
            return;
        }

        global.subscriptions[event][0](data);
    }
  

}