import { Gameobject } from "./Gameobject";
import { Vector } from "../Main/Vector";
import { Canvas } from "../Main/Canvas";
import { Layers } from "../Main/Layers";

class Background extends Gameobject
{
    private color_: string;
    private canvas_: Canvas;
    
    constructor(name: string, tag: string, ID: number, position: Vector, size: Vector, color?: string)
    {
        super();
        this.name_ = name;
        this.tag_ = tag;
        this.ID_ = ID;
        this.position_ = new Vector(position.x, position.y);
        this.width_ = size.x;
        this.height_ = size.y;
        this.color_ = color === undefined? "#ffffff" : color;

        this.canvas_ = new Canvas(this.width_, this.height_);
        if (this.canvas_.CONTEXT === null) return;
        this.canvas_.CONTEXT.fillStyle = this.color_;
        this.canvas_.CONTEXT.fillRect(0, 0, this.width_, this.height_);

        this.ALLOWCULLING = false; //always draw background (even if not within the camera viewpoint, though it should always be anyways...)
    }

    public Update(delta_time: number) 
    {}

    public TurnUpdate(turnsPassed: number) 
    {}

    public Draw(layers: Layers)
    {
        layers.DrawToLayer("Background", this.canvas_.CANVAS, this.position_.x, this.position_.y);
    }
}

export {Background};