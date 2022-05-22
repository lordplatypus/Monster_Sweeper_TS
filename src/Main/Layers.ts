import { Canvas } from "./Canvas";

class Layers
{
    private layers_: Map<string, Canvas>;
    private uiLayer_: Canvas; //UI seperated out because the UI layer is drawn where the camera is, NOT at (0, 0)

    constructor(width: number, height: number)
    {
        this.layers_ = new Map<string, Canvas>();

        this.layers_.set("Background", new Canvas(width, height, "Background")); //The Background
        this.layers_.set("Tile", new Canvas(width, height, "Tile")); //Tiles (dust, tundra, forest, etc)
        this.layers_.set("Objects", new Canvas(width, height, "Objects")); //Game objects (monsters, trees, flowers, etc)
        this.layers_.set("Number", new Canvas(width, height, "Number")); //Numbers (where the bombs are)
        this.layers_.set("Player", new Canvas(width, height, "Player")); //The player character
        this.layers_.set("Particles", new Canvas(width, height, "Particles")); //particle effects
        //this.layers_.set("UI", new Canvas(width, height, "UI")); //UI

        this.uiLayer_ = new Canvas(width, height, "UI");
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //Functions to be called within MAIN, during the draw phase
    ///////////////////////////////////////////////////////////////////////////////////////////////

    public Draw(main_ctx: CanvasRenderingContext2D)
    {
        const iterator: IterableIterator<Canvas> = this.layers_.values(); //grab the map value iterator
        for (var i = 0; i < this.layers_.size; i++)
        {
            const tempCanvas: Canvas | undefined = iterator.next().value; //grab the next layer
            if (tempCanvas !== undefined) 
            {
                main_ctx.drawImage(tempCanvas.CANVAS, 0, 0); //draw layer to the main canvas (the one visible in the browser)
                tempCanvas.Clear(); //clear layer for next draw
            }
        }
    }

    public DrawUI(main_ctx: CanvasRenderingContext2D, cameraX: number, cameraY: number)
    {
        main_ctx.drawImage(this.uiLayer_.CANVAS, cameraX, cameraY);
        this.uiLayer_.Clear();
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //Functions to be called by anything else that needs to be drawn to a layer
    ///////////////////////////////////////////////////////////////////////////////////////////////

    public DrawToLayer(layerName: string, drawable: CanvasImageSource, x: number, y: number)
    {//Draw "drawable" object (image, canvas, etc.) to the given layer at position (x, y)
        const layer: Canvas | undefined = this.GetLayer(layerName);
        if (layer === undefined) return;
        layer.CONTEXT?.drawImage(drawable, x, y);
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //Private functions
    ///////////////////////////////////////////////////////////////////////////////////////////////

    private GetLayer(layerName: string): Canvas | undefined
    {//returns layer
        return this.layers_.get(layerName);
    }
}

export { Layers }