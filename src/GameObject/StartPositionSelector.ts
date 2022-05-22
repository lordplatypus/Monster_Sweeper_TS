import { Gameobject } from "./Gameobject";
import { Vector } from "../Main/Vector";
import { Calculations } from "../Main/Calculations";
import { PuzzleManager } from "../Game/PuzzleManager";
import { Player } from "./Player";

class StartPositionSelector extends Gameobject
{
    private pm_: PuzzleManager;
    private calcs_: Calculations;

    constructor(pm: PuzzleManager)
    {
        super();
        this.pm_ = pm;
        this.calcs_ = new Calculations();

        const mainCanvas: HTMLCanvasElement  = <HTMLCanvasElement>document.getElementById("main_canvas");
        mainCanvas.addEventListener("mousedown", this.Click);
    }

    public Deconstructor() 
    {
        const mainCanvas: HTMLCanvasElement  = <HTMLCanvasElement>document.getElementById("main_canvas");
        mainCanvas.removeEventListener("mousedown", this.Click);
    }

    private Click = (event: MouseEvent) =>
    {
        const mainCanvas: HTMLCanvasElement  = <HTMLCanvasElement>document.getElementById("main_canvas");
        const canvasActualSize: Vector = this.calcs_.GetCanvasSize(new Vector(16, 9)); //actual size of the canvas element within the window 
        const mouseX: number = event.clientX; //Mouse click pos: x
        const mouseY: number = event.clientY; //Mouse click pos: y
        //convert window click position to "in-canvas" position
        //EX: mouseX / (actual canvas width / canvas resolution width) + camera left
        const x: number = Math.floor(mouseX / (canvasActualSize.x / mainCanvas.width) + this.pm_.CAMERA.VIEWPORT.X);
        const y: number = Math.floor(mouseY / (canvasActualSize.y / mainCanvas.height) + this.pm_.CAMERA.VIEWPORT.Y);
        this.position_ = new Vector(x - (x % 32), y - (y % 32)); //make it fit to a 32 x 32 grid
        if (this.position_.x < 0 || this.position_.x > this.pm_.STATS.COLUMNS * this.pm_.STATS.TILE_SIZE ||
            this.position_.y < 0 || this.position_.y > this.pm_.STATS.ROWS * this.pm_.STATS.TILE_SIZE) return;

        this.pm_.SCENE.Add(new Player(this.position_, this.pm_)); //Add player
        this.pm_.PickEmptyTiles(this.position_); //delete some starting tiles (then add monsters, etc)
        this.Kill(); //kill this object as its job is now done
    }
}

export {StartPositionSelector};