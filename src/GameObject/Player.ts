import { Gameobject } from "./Gameobject";
import { Vector } from "../Main/Vector";
import { Canvas } from "../Main/Canvas";
import { PuzzleManager } from "../Game/PuzzleManager";
import { Calculations } from "../Main/Calculations";

class Player extends Gameobject
{
    private canvas_: Canvas;
    private pm_: PuzzleManager;
    private targetPos_: Vector;
    private calcs_: Calculations;
    //Image / Animation
    private playerImg_: HTMLImageElement; //player image
    private frame_: number; //frame of the animation
    private timer_: number; //timer for next frame
    private timeBetweenFrames_: number; //time it takes for the next frame to play
    private rightFacing_: number; //is the player facing right? 0 = false / 1 = true 
    
    constructor(position: Vector, pm: PuzzleManager)
    {
        super();
        this.name_ = "Player";
        this.tag_ = "Player";
        this.ID_ = 0;
        this.position_ = new Vector(position.x, position.y);
        this.targetPos_ = this.position_;
        this.width_ = 32;
        this.height_ = 32;
        this.pm_ = pm;
        this.calcs_ = new Calculations();

        this.canvas_ = new Canvas(this.width_, this.height_); //set up canvas to draw the play image on
        this.playerImg_ = new Image(); //set up image object
        this.playerImg_.src = "./Player_Ranger.png"; //set image source
        this.playerImg_.onload = this.OnImgLoad; //once the image loades run function "OnImgLoad"
        this.frame_ = 0;
        this.timer_ = 0;
        this.timeBetweenFrames_ = 0.1;
        this.rightFacing_ = 0;

        const mainCanvas: HTMLCanvasElement  = <HTMLCanvasElement>document.getElementById("main_canvas");
        mainCanvas.addEventListener("mousedown", this.Click);
    }

    public Deconstructor() 
    {
        const mainCanvas: HTMLCanvasElement  = <HTMLCanvasElement>document.getElementById("main_canvas");
        mainCanvas.removeEventListener("mousedown", this.Click);
    }

    public Update(delta_time: number) 
    {
        this.position_ = this.calcs_.Lerp(this.position_, this.targetPos_, delta_time * 10.0); //smooth movements
        this.AnimationHandle(delta_time); //animation calcs
    }

    public DelayedDraw(main_ctx: CanvasRenderingContext2D)
    {
        main_ctx.drawImage(this.canvas_.CANVAS, this.position_.x, this.position_.y); //draw canvas to main canvas
    }

    public OnCollision(other: Gameobject)
    {
        if (other.TAG === "Monster")
        {
            if (this.pm_.PLAYER_MANAGER.HP <= 0) this.Kill(); //if hp is 0 (or lower) the player is dead
        }
    }

    private AnimationHandle(delta_time: number)
    {
        this.timer_ += delta_time;
        if (this.timer_ < this.timeBetweenFrames_) return;

        this.timer_ = 0; //reset stopwatch
        if (this.frame_ < 4) this.frame_++; //next frame
        else this.frame_ = 0; //or return to the frist frame
        this.UpdateCanvas(); //update the canvas to actualy draw the image
    }

    private UpdateCanvas()
    {
        if (this.canvas_.CONTEXT === null) return;

        this.canvas_.Clear();

        this.canvas_.CONTEXT.drawImage(this.playerImg_, this.width_ * this.frame_, this.height_ * this.rightFacing_, this.width_, this.height_, 0, 0, this.width_, this.height_);
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
        const targetPos: Vector = new Vector(x - (x % 32), y - (y % 32)); //make it fit to a 32 x 32 grid
        if (targetPos.x > this.position_.x) this.rightFacing_ = 1;
        else this.rightFacing_ = 0;
        this.CheckPosition(targetPos);
    }

    private CheckPosition(targetPos: Vector)
    {
        const local: Vector = this.calcs_.ConvertWorldToLocal(targetPos, this.pm_.STATS.TILE_SIZE);

        if (this.pm_.HIDDEN_TILE_MAP.Traversable(local)) 
        {//target tile is empty, thus player can move there without further checks
            this.targetPos_ = targetPos;
            return; 
        }

        //if the target position is not reachable(surrounded by occupied tiles), don't move and don't continue with other checks
        if (!this.pm_.HIDDEN_TILE_MAP.Reachable(local)) return;

        //From this point we know that the target pos is occupied but has an (or multiple) empty tile near by
        //Move player to an empty tile near the target tile
        const emptyTilePos: Vector[] = this.pm_.HIDDEN_TILE_MAP.ReachableFromWhere(local); //array of neayby empty tiles
        const playerLocalPos: Vector = this.calcs_.ConvertWorldToLocal(this.targetPos_, 32); //local player postion before moving (use targetPos_ instead of position_)
        var min: number = Math.sqrt(Math.pow(playerLocalPos.x - emptyTilePos[0].x, 2) + Math.pow(playerLocalPos.y - emptyTilePos[0].y, 2)); //first min set to first position in array
        var minID: number = 0; //store array element ID
        for (var i = 1; i < emptyTilePos.length; i++)
        {
            const temp: number = Math.sqrt(Math.pow(playerLocalPos.x - emptyTilePos[i].x, 2) + Math.pow(playerLocalPos.y - emptyTilePos[i].y, 2));
            if (temp < min) 
            {//new min found
                min = temp;
                minID = i;
            }
        }
        this.targetPos_ = this.calcs_.ConvertLocalToWorld(emptyTilePos[minID], 32); //move player to the closest empty tile (near the actual tile clicked)

        //Reveal Tile
        this.pm_.HIDDEN_TILE_MAP.RemoveTile(local);

        //check object collision - if yes then OnCollision() will be called
        this.pm_.IsObject(local);
    }

    private OnImgLoad = () =>
    {
        this.UpdateCanvas(); //just to set up canvas
    }
}

export {Player};