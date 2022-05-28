import { Gameobject } from "../Gameobject";
import { Vector } from "../../Main/Vector";
import { Calculations } from "../../Main/Calculations";
import { Canvas } from "../../Main/Canvas";
import { Layers } from "../../Main/Layers";
import { PuzzleManager } from "../../Game/PuzzleManager";

class HealthRegen extends Gameobject
{
    private pm_: PuzzleManager;
    private canvas_: Canvas;
    
    constructor(ID: number, position: Vector, pm: PuzzleManager)
    {
        super();
        this.name_ = "HealthRegen";
        this.tag_ = "Item";
        this.ID_ = ID;
        this.position_ = new Vector(position.x, position.y);
        this.width_ = 16;
        this.height_ = 16;
        this.pm_ = pm;

        this.canvas_ = new Canvas(this.width_, this.height_);
        if (this.canvas_.CONTEXT === null) return;
        this.canvas_.CONTEXT.fillStyle = "Cyan";
        this.canvas_.CONTEXT.fillRect(0, 0, this.width_, this.height_);
    }

    public Draw(layers: Layers)
    {
        layers.DrawToLayer("Object", this.canvas_.CANVAS, this.position_.x, this.position_.y);
    }

    public OnCollision(other: Gameobject)
    {
        if (other.NAME !== "Player") return; //should only collide with the player

        this.pm_.PLAYER_MANAGER.HP++; //Heal player +1
        this.Kill(); //remove this item
    }
}

export {HealthRegen};