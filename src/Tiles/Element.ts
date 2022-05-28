import { Gameobject } from "../GameObject/Gameobject";
import { Vector } from "../Main/Vector";
import { Canvas } from "../Main/Canvas";
import { Layers } from "../Main/Layers";

class Element extends Gameobject
{
    private canvas_: Canvas;
    private img_: HTMLImageElement; //player image
    //active time
    private done_: boolean; //finished?
    private totalTime_: number; //time it takes to finish
    //Bounce Calcs
    private timer_: number; //time to apply damp
    private degree_: number; //for sin
    private multiplier_: number;
    private damp_: number;
    private scaleY_: number; //height scale - change this to get the bounce effect
    
    constructor(name: string, ID: number, imgSrc: string, position: Vector, size: Vector)
    {
        super();
        this.name_ = name;
        this.tag_ = "Element";
        this.ID_ = ID;
        this.position_ = new Vector(position.x, position.y);
        this.width_ = size.x;
        this.height_ = size.y;

        this.canvas_ = new Canvas(this.width_, this.height_*2);

        this.img_ = new Image();
        this.img_.src = imgSrc;
        this.img_.onload = this.UpdateCanvas;

        this.done_ = false;
        this.totalTime_ = 20.0;
        this.timer_ = 0;
        this.degree_ = 0;
        this.multiplier_ = 2.0;
        this.damp_ = 0.98;
        this.scaleY_ = 0;

        //this.UpdateCanvas();
    }

    public Update(delta_time: number) 
    {
        if (this.done_) return;
        this.Bounce(delta_time);
        this.totalTime_ -= delta_time;
        if (this.totalTime_ <= 0) this.done_ = true;
    }

    public Draw(layers: Layers)
    {
        layers.DrawToLayer("TileElement", this.canvas_.CANVAS, this.position_.x, this.position_.y - this.scaleY_ * this.height_);
    }

    private UpdateCanvas = () =>
    {
        if (this.canvas_.CONTEXT === null) return;
        this.canvas_.Clear();
        this.canvas_.CONTEXT.drawImage(this.img_, 0, 0, this.width_, this.height_, 0, this.height_, this.width_, this.scaleY_ * this.height_);
    }

    private Bounce(delta_time: number)
    {
        this.degree_ += 5 * delta_time;
        this.timer_ += delta_time;
        if (this.timer_ > 0.01)
        {
            this.multiplier_ *= this.damp_;
            this.timer_ = 0;
        }
        this.scaleY_ = Math.abs(Math.sin(this.degree_)) * this.multiplier_ + 1;
        this.UpdateCanvas();
    }
}

export {Element};