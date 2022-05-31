import { Element } from "./Element";
import { Vector } from "../../Main/Vector";
import { Layers } from "../../Main/Layers";

class HouseElement extends Element
{
    private color_: string;
    
    constructor(name: string, ID: number, imgSrc: string, position: Vector, size: Vector, color: string)
    {
        super(name, ID, imgSrc, position, size);
        this.color_ = color;
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
        layers.DrawToLayer("TileElement", this.canvas_.CANVAS, this.position_.x, this.position_.y  + this.height_ - this.scaleY_ * this.height_);
    }

    protected UpdateCanvas = () =>
    {
        if (this.canvas_.CONTEXT === null) return;
        this.canvas_.Clear();
        this.canvas_.CONTEXT.fillStyle = this.color_;
        this.canvas_.CONTEXT.fillRect(2, this.scaleY_ * 4, 3, this.scaleY_ * 3);
        this.canvas_.CONTEXT.drawImage(this.img_, 0, 0, this.width_, this.height_, 0, 0, this.width_, this.scaleY_ * this.height_);
    }
}

export {HouseElement};