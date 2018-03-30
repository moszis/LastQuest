let instance = null;

export default class GraphicsManager {
    
    constructor() {

        if (!instance) {
            instance = this;
        }
          
        return instance;

    }

    initNew(){
        this.createjs = global.createjs;
    }

    createBitmap(asset){
        let bitmap = new this.createjs.Bitmap(asset);
        return bitmap;
    }

    createRoundRectangle( x, y, width, height, radius ){
        let roundRect = new this.createjs.Shape();
        roundRect.graphics.beginFill("#F00").drawRoundRect(x,y,width,height, radius);
        return roundRect;
    }

    updateRoundRectangle( roundRect, x, y, width, height, radius ){
        roundRect.graphics.clear().beginFill("#F00").drawRoundRect(x,y,width,height, radius);
        return roundRect;
    }

    //This should only create rectangle shape
    static createRectangle(x, y, width, height){

        let shape = new createjs.Shape();    
        shape.graphics.setStrokeStyle(2).beginStroke("#FFF").rect(x, y, width, height);
        let hit = new createjs.Shape();
        hit.graphics.beginFill("#FFF").rect(x, y, width, height);
        shape.hitArea = hit;

        return shape;
    }

    static createTargetableObject(shape, leftClickEvent){

    }

    
    createText(text, font, color, x, y){
        let textGraphic = new this.createjs.Text(text, font, color);
        textGraphic.x = x;
        textGraphic.y = y;
        return textGraphic;
    }

    updateText(textGraphic, text){
        textGraphic.text = text;
        return textGraphic;
    }
    

}