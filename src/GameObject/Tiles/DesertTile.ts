import { Gameobject } from "../Gameobject";
import { Element } from "./Element";
import { Vector } from "../../Main/Vector";
import { PuzzleManager } from "../../Game/PuzzleManager";

class DesertTile extends Gameobject
{
    private pm_: PuzzleManager;

    private done_: boolean;
    private elementCount_: number;
    private timer_: number;

    constructor(position: Vector, pm: PuzzleManager)
    {
        super();
        this.name_ = "Desert";
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
        if (this.timer_ >= 0.1)
        {
            this.timer_ = 0;

            const elementPosition: Vector = new Vector(this.position_.x + Math.floor(Math.random() * (this.width_ - 10)), this.position_.y + Math.floor(Math.random() * (this.height_ - 5)));
            this.pm_.SCENE.Add(new Element("Dune", this.elementCount_, "Dune.png", elementPosition, new Vector(10, 5)));
            this.elementCount_++;
            if (this.elementCount_ >= 20) this.done_ = true;
        }
    }
}

export {DesertTile};