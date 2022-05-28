import { Gameobject } from "../GameObject/Gameobject";
import { Element } from "./Element";
import { Vector } from "../Main/Vector";
import { PuzzleManager } from "../Game/PuzzleManager";

class PlainTile extends Gameobject
{
    private pm_: PuzzleManager;

    private done_: boolean;
    private elementCount_: number;
    private timer_: number;

    constructor(position: Vector, pm: PuzzleManager)
    {
        super();
        this.name_ = "Plain";
        this.tag_ = "Tile";
        this.ID_ = 0;
        this.position_ = new Vector(position.x, position.y);
        this.pm_ = pm;
        this.width_ = this.pm_.STATS.TILE_SIZE;
        this.height_ = this.pm_.STATS.TILE_SIZE;

        this.done_ = false;
        this.elementCount_ = 0;
        this.timer_ = 0;
    }

    public Update(delta_time: number) 
    {
        if (this.done_) return;
        this.SpawnElement(delta_time);
    }

    private SpawnElement(delta_time: number)
    {
        this.timer_ += delta_time;
        if (this.timer_ >= 0.01)
        {
            this.timer_ = 0;

            const elementPosition: Vector = new Vector(this.position_.x + Math.floor(Math.random() * (this.width_ - 2)), this.position_.y + Math.floor(Math.random() * (this.height_ - 5)));
            const randImg: number = Math.floor(Math.random() * 3);
            switch (randImg)
            {
                default:
                this.pm_.SCENE.Add(new Element("Grass1", this.elementCount_, "Grass1.png", elementPosition, new Vector(2, 3)));
                break;

                case 1:
                this.pm_.SCENE.Add(new Element("Grass2", this.elementCount_, "Grass2.png", elementPosition, new Vector(1, 3)));
                break;

                case 2:
                this.pm_.SCENE.Add(new Element("Flower", this.elementCount_, "Flower.png", elementPosition, new Vector(3, 5)));
                break;
            }
            this.elementCount_++;
            if (this.elementCount_ >= 100) this.done_ = true;
        }
    }
}

export {PlainTile};