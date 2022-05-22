import { Vector } from "./Vector";
import { Quad } from "./Quad";
import { Canvas } from "../Main/Canvas";

class Camera
{
    private center_: Vector; //what is the camera centered on?

    private cameraSize_: Vector;
    private limits_: Vector; //edge of playable area

    private uiCanvas_: Canvas;

    constructor(cameraSize: Vector, limits: Vector)
    {
        this.cameraSize_ = cameraSize;
        this.limits_ = limits;
        this.center_ = new Vector(0, 0);
        //this.center_ = new Vector(32*4+16, 32*4+16);

        this.uiCanvas_ = new Canvas(this.VIEWPORT.WIDTH, this.VIEWPORT.HEIGHT); 
    }

    public DrawUI(main_ctx: CanvasRenderingContext2D)
    {//Call this in the "scene" "Draw" function after all gameobjects are finished with their "Draw"
        main_ctx.drawImage(this.uiCanvas_.CANVAS, this.VIEWPORT.X, this.VIEWPORT.Y);
        this.uiCanvas_.CONTEXT?.clearRect(0, 0, this.uiCanvas_.CANVAS.width, this.uiCanvas_.CANVAS.height); //this canvas needs to be cleared for the next draw phase
    }

    private Clamp(value: number, min: number, max: number): number
    {
        if (value < min) return min;
        else if (value > max) return max;
        return value;
    }

    public set CENTER(center: Vector) {this.center_ = center;}
    // public get CENTER(): Vector {return new Vector(this.Clamp(this.center_.x, 0, this.limits_.x), 
    //                                                this.Clamp(this.center_.y, 0, this.limits_.y));}
    public get CENTER(): Vector {return new Vector(-this.center_.x + this.cameraSize_.x / 2, -this.center_.y + this.cameraSize_.y / 2);}
    public get VIEWPORT(): Quad {return new Quad(this.center_.x - this.cameraSize_.x / 2, this.center_.y - this.cameraSize_.y / 2,
                                                 this.cameraSize_.x, this.cameraSize_.y);}
    public get UI_CANVAS(): Canvas {return this.uiCanvas_;} //pass this to the "GameobjectManager" function "UIDraw"
}

export { Camera };