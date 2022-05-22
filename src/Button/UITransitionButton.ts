import { Button } from "./Button";
import { Scene } from "../Scene/Scene";
import { Vector } from "../Main/Vector";

class UITransitionButton extends Button
{
    private scene_: Scene;
    private transitionToSceneName_: string;

    constructor(scene: Scene, position: Vector, size: Vector, 
                imgPath: string, transitionToSceneName: string)
    {
        super();
        this.scene_ = scene;
        this.name_ = "UITransitionButton";
        this.tag_ = "Button";
        this.ID_ = 0;
        this.position_ = new Vector(position.x, position.y);
        this.size_ = size;
        this.img_ = new Image();
        this.img_.src = imgPath;

        this.transitionToSceneName_ = transitionToSceneName;
    }

    // public UIDraw(camera_ctx: CanvasRenderingContext2D)
    // {
    //     if (this.img_ === undefined) return;
        
    //     camera_ctx.drawImage(this.img_, this.size_.x * this.pressed_, 0, this.size_.x, this.img_.naturalHeight, this.position_.x, this.position_.y, this.size_.x, this.size_.y);
    // }

    public Effect()
    {
        this.scene_.ChangeScene(this.transitionToSceneName_);
    }
}

export {UITransitionButton};