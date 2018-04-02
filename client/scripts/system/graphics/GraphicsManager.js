let instance = null;

export default class GraphicsManager {
    
    constructor() {

        if (!instance) {
            instance = this;
        }
          
        return instance;

    }

    initNew(){
        //this.createjs = global.createjs;
    }

    static createBitmap(asset){
        let bitmap = new createjs.Bitmap(asset);
        return bitmap;
    }

    static createRoundRectangle( x, y, width, height, radius ){
        let roundRect = new createjs.Shape();
        roundRect.graphics.beginFill("#F00").drawRoundRect(x,y,width,height, radius);
        return roundRect;
    }

    static updateRoundRectangle( roundRect, x, y, width, height, radius ){
        roundRect.graphics.clear().beginFill("#F00").drawRoundRect(x,y,width,height, radius);
        return roundRect;
    }

    static createRectangle(x, y, width, height, color){
        let shape = new createjs.Shape();    
        shape.graphics.setStrokeStyle(2).beginStroke(color).rect(x, y, width, height);

        return shape;
    }

    static updateRectangle( rect, x, y, width, height, color){
        let shape = new createjs.Shape();    
        shape.graphics.clear().setStrokeStyle(2).beginStroke(color).rect(x, y, width, height);

        return shape;
    }

    //This should only create rectangle shape
    static createHitAreaRectangle(x, y, width, height){

        let shape = new createjs.Shape();    
        shape.graphics.setStrokeStyle(2).beginStroke("#000").rect(x, y, width, height);
        let hit = new createjs.Shape();
        hit.graphics.beginFill("#000").rect(x, y, width, height);
        shape.hitArea = hit;

        return shape;
    }

    static createTargetableObject(shape, isTransparent, leftClickEvent){

    }

    
    static createText(text, font, color, x, y){
        let textGraphic = new createjs.Text(text, font, color);
        textGraphic.x = x;
        textGraphic.y = y;
        return textGraphic;
    }

    static updateText(textGraphic, text){
        textGraphic.text = text;
        return textGraphic;
    }
    

}