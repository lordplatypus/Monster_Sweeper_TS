import { Gameobject } from "./Gameobject";
import { Vector } from "../Main/Vector";
import { Camera } from "../Main/Camera";
import { Calculations } from "../Main/Calculations";

class CameraControl extends Gameobject
{
    private calcs_: Calculations;
    private camera_: Camera;
    private target_: Vector;
    
    constructor(position: Vector, camera: Camera)
    {
        super();
        this.name_ = "CameraControl";
        this.tag_ = "CameraControl";
        this.ID_ = 0;
        this.position_ = new Vector(position.x, position.y);
        this.target_ = this.position_;
        this.width_ = 0;
        this.height_ = 0;
        this.camera_ = camera;
        this.calcs_ = new Calculations();

        window.addEventListener("keydown", this.KeyDown);

        const mainCanvas: HTMLCanvasElement  = <HTMLCanvasElement>document.getElementById("main_canvas");
        mainCanvas.addEventListener("mousemove", this.MouseMove);
    }

    public Deconstructor() 
    {
        window.removeEventListener("keydown", this.KeyDown);

        const mainCanvas: HTMLCanvasElement  = <HTMLCanvasElement>document.getElementById("main_canvas");
        mainCanvas.removeEventListener("mousemove", this.MouseMove);
    }

    public Update(delta_time: number) 
    {
        this.position_ = this.calcs_.Lerp(this.position_, this.target_, delta_time); //smooth movements

        this.camera_.CENTER = this.position_;
    }

    private KeyDown = (input: KeyboardEvent) =>
    {
        if (input.key === "a") this.target_.x -= 32;
        else if (input.key === "d") this.target_.x += 32;
        
        if (input.key === "w") this.target_.y -= 32;
        else if (input.key === "s") this.target_.y += 32;
    }

    private MouseMove = (event: MouseEvent) =>
    {
        if (event.buttons === 4) //4 = middle click | 2 = right mouse click (probably)
        {
            this.target_.x -= Math.floor(event.movementX * .2);
            this.target_.y -= Math.floor(event.movementY * .2);
        }
    }
}

export {CameraControl};