import { Gameobject } from "./Gameobject";
import { Vector } from "../Main/Vector";
import { Camera } from "../Main/Camera";

class CameraControl extends Gameobject
{
    private camera_: Camera;
    
    constructor(name: string, tag: string, ID: number, position: Vector, camera: Camera)
    {
        super();
        this.name_ = name;
        this.tag_ = tag;
        this.ID_ = ID;
        this.position_ = new Vector(position.x, position.y);
        this.width_ = 32;
        this.height_ = 32;
        this.camera_ = camera;

        window.addEventListener("keydown", this.KeyDown);
    }

    public Update(delta_time: number) 
    {
        this.camera_.CENTER = new Vector(this.position_.x, this.position_.y);
    }

    public TurnUpdate(turnsPassed: number) 
    {}

    public DelayedDraw(main_ctx: CanvasRenderingContext2D)
    {}

    private KeyDown = (input: KeyboardEvent) =>
    {
        if (input.key === "a") this.position_.x -= 32;
        else if (input.key === "d") this.position_.x += 32;
        
        if (input.key === "w") this.position_.y -= 32;
        else if (input.key === "s") this.position_.y += 32;
    }
}

export {CameraControl};