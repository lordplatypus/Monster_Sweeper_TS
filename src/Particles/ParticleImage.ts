import { Particle } from "./Particle";
import { Vector } from "../Main/Vector";
import { Canvas } from "../Main/Canvas";
import { Layers } from "../Main/Layers";

class ParticleImage extends Particle
{
    private img_: HTMLImageElement;
    private tempCanvas_: Canvas;

    constructor(imgSrc: string, position: Vector, 
                lifespan?: number, progressSpeed?: number,
                size?: Vector, startScale?: Vector, endScale?: Vector,
                velocity?: Vector, force?: Vector, damp?: number,
                angle?: number, angularVelocity?: number, angularDamp?: number,
                startAlpha?: number, endAlpha?: number, color?: boolean, red?: number, green?: number, blue?: number)
                
    {
        super();
        this.img_ = new Image();
        this.img_.src = imgSrc;
        this.position_ = position;
        this.lifespan_ = lifespan === undefined? 1 : lifespan;
        this.age_ = 0;
        this.progressSpeed_ = progressSpeed === undefined? 1 : progressSpeed;
        this.width_ = size === undefined? this.img_.naturalWidth : size.x;
        this.height_ = size === undefined? this.img_.naturalHeight : size?.y;
        this.scale_ = startScale === undefined? new Vector(1, 1) : startScale;
        this.startScale_ = startScale === undefined? new Vector(1, 1) : startScale;
        this.endScale_ = endScale === undefined? new Vector(1, 1) : endScale;
        this.velocity_ = velocity === undefined? new Vector(0, 0) : velocity;
        this.force_ = force === undefined? new Vector(0, 0) : force;
        this.damp_ = damp === undefined? 1 : damp; 
        this.angle_ = angle === undefined? 0 : angle;
        this.angularVelocity_ = angularVelocity === undefined? 0 : angularVelocity;
        this.angularDamp_ = angularDamp === undefined? 1 : angularDamp;
        this.color_ = color === undefined? false : color;
        this.red_ = red === undefined? 255 : red;
        this.green_ = green === undefined? 255 : green;
        this.blue_ = blue === undefined? 255 : blue ;
        this.alpha_ = startAlpha === undefined? 1 : startAlpha;
        this.startAlpha_ = startAlpha === undefined? 1 : startAlpha;
        this.endAlpha_ = endAlpha === undefined? 1 : endAlpha;

        //canvas size is bigger then the image so that if the image is rotated the corners arn't cut off
        const canvasSize: number = Math.sqrt((this.width_ * this.scale_.x) * (this.width_ * this.scale_.x) + (this.height_ * this.scale_.y) * (this.height_ * this.scale_.y));
        this.translate_ = new Vector(canvasSize / 2, canvasSize / 2); //move the canvas to the center for rotation
        this.tempCanvas_ = new Canvas(canvasSize, canvasSize); 
    }

    public Update(delta_time: number) 
    {
        this.UpdateAge(delta_time);
        this.UpdateProgressRate();
        this.UpdateScale();
        this.UpdateVelocity(delta_time);
        this.UpdatePosition(delta_time);
        this.UpdateAngle(delta_time);
        this.UpdateAlpha();
        this.UpdateCanvas();
    }

    public UpdateCanvas()
    {
        if (this.tempCanvas_.CONTEXT === null) return;

        if (this.color_)
        {
            this.tempCanvas_.CONTEXT.fillStyle = "rgba(" + this.red_ + ", " + this.green_ + ", " + this.blue_ + ", " + this.alpha_ + ")";
            this.tempCanvas_.CONTEXT.fillRect(0, 0, this.width_, this.height_);
            this.tempCanvas_.CONTEXT.globalCompositeOperation = "destination-in";
        }
        else 
        {
            this.tempCanvas_.CONTEXT.clearRect(0, 0, this.tempCanvas_.CANVAS.width, this.tempCanvas_.CANVAS.height);
            this.tempCanvas_.CONTEXT.globalAlpha = this.alpha_;
        }

        this.tempCanvas_.CONTEXT.save(); //save
        this.tempCanvas_.CONTEXT.translate(this.translate_.x, this.translate_.y); //move to center of image (so that the point of rotation is not at (0, 0))
        this.tempCanvas_.CONTEXT.rotate(this.rad_); //rotate image
        this.tempCanvas_.CONTEXT.translate(-this.translate_.x, -this.translate_.y); //move back to (0, 0) otherwise the image will be cut off
        const centerImg: Vector = new Vector(this.tempCanvas_.CANVAS.width / 2 - this.width_ * this.scale_.x / 2, this.tempCanvas_.CANVAS.height / 2 - this.height_ * this.scale_.y / 2); //draw at the image top left corner NOT the top left corner of the canvas (remember the canvas is bigger then the image)
        this.tempCanvas_.CONTEXT.drawImage(this.img_, 0, 0, this.img_.naturalWidth, this.img_.naturalHeight, centerImg.x, centerImg.y, this.width_ * this.scale_.x, this.height_ * this.scale_.x); //actualy draw the image
        this.tempCanvas_.CONTEXT.restore(); //restore save
    }

    public Draw(layers: Layers) 
    {
        layers.DrawToLayer("Particle", this.tempCanvas_.CANVAS, this.position_.x, this.position_.y);
    }
}

export {ParticleImage};