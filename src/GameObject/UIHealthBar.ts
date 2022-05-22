import { Gameobject } from "./Gameobject";
import { Vector } from "../Main/Vector";
import { Canvas } from "../Main/Canvas";
import { Layers } from "../Main/Layers";

class UIHealthBar extends Gameobject
{
    private maxHP_: number;
    private HP_: number;
    private canvas_: Canvas;
    private heartImg_: HTMLImageElement | undefined;
    private greyHeartImg_: HTMLImageElement | undefined;
    
    constructor(maxHP: number, position: Vector)
    {
        super();
        this.name_ = "HealthBar";
        this.tag_ = "UI";
        this.ID_ = 0;
        this.position_ = new Vector(position.x, position.y);
        this.width_ = 16 * maxHP;
        this.height_ = 16;
        this.maxHP_ = maxHP;
        this.HP_ = this.maxHP_;
        this.ALLOWCULLING = false;

        this.canvas_ = new Canvas(this.width_, this.height_);

        this.heartImg_ = new Image();
        this.heartImg_.src = "./Heart.png";
        this.heartImg_.onload = this.OnImgLoad;
        this.greyHeartImg_ = new Image();
        this.greyHeartImg_.src = "./GreyHeart.png";
        this.greyHeartImg_.onload = this.OnImgLoad;

        this.UpdateCanvas();
    }

    private OnImgLoad = () =>
    {
        this.UpdateCanvas(); //just to set up canvas
    }

    public Draw(layers: Layers)
    {
        layers.DrawToUI(this.canvas_.CANVAS, 0, 0, this.width_, this.height_, this.position_.x, this.position_.y, this.width_, this.height_);
    }

    private UpdateCanvas()
    {
        if (this.canvas_.CONTEXT === null || this.heartImg_ === undefined || this.greyHeartImg_ === undefined) return; //if anything is null return
        this.canvas_.CONTEXT.clearRect(0, 0, this.width_, this.height_); //clear canvas

        for (var i = 0; i < this.maxHP_; i++)
        {
            if (this.HP_ > i) this.canvas_.CONTEXT.drawImage(this.heartImg_, 16 * i, 0);
            else this.canvas_.CONTEXT.drawImage(this.greyHeartImg_, 16 * i, 0);
        }
    }

    public get HP(): number {return this.HP_};
    public set HP(newHP: number) 
    {
        this.HP_ = newHP;
        this.UpdateCanvas();
    }
}

export {UIHealthBar};