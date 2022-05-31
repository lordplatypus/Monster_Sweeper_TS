import { Gameobject } from "../Gameobject";
import { Element } from "./Element";
import { Vector } from "../../Main/Vector";
import { PuzzleManager } from "../../Game/PuzzleManager";

class IslandTile extends Gameobject
{
    private pm_: PuzzleManager;

    private done_: boolean;
    private elementCount_: number;
    private maxElements_: number;
    private timer_: number;

    constructor(position: Vector, pm: PuzzleManager)
    {
        super();
        this.name_ = "Island";
        this.tag_ = "Tile";
        this.ID_ = 0;
        this.position_ = new Vector(position.x, position.y);
        this.pm_ = pm;
        this.width_ = this.pm_.STATS.TILE_SIZE;
        this.height_ = this.pm_.STATS.TILE_SIZE;

        this.done_ = false;
        this.elementCount_ = 0;
        this.maxElements_ = Math.floor(Math.random() * 3) + 1;
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
        if (this.timer_ >= 1)
        {
            this.timer_ = 0;

            const elementPosition: Vector = new Vector(this.position_.x + 2 + Math.floor(Math.random() * 16), this.position_.y + 9 + Math.floor(Math.random() * 8));
            this.pm_.SCENE.Add(new Element("Palm", this.elementCount_, "Palm.png", elementPosition, new Vector(9, 9)));
            this.elementCount_++;
            if (this.elementCount_ >= this.maxElements_) this.done_ = true;
        }
    }
}

export {IslandTile};