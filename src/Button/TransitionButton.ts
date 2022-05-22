import { Button } from "./Button";
import { Scene } from "../Scene/Scene";
import { Vector } from "../Main/Vector";

class TransitionButton extends Button
{
    private scene_: Scene;
    private transitionToSceneName_: string;

    constructor(scene: Scene, position: Vector, size: Vector, 
                imgPath: string, transitionToSceneName: string)
    {
        super();
        this.scene_ = scene;
        this.name_ = "TransitionButton";
        this.tag_ = "Button";
        this.ID_ = 0;
        this.position_ = new Vector(position.x, position.y);
        this.size_ = size;
        this.img_ = new Image();
        this.img_.src = imgPath;

        this.transitionToSceneName_ = transitionToSceneName;
    }

    public Effect()
    {
        this.scene_.ChangeScene(this.transitionToSceneName_);
    }
}

export {TransitionButton};