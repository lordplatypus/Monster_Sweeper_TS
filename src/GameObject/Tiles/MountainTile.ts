import { Gameobject } from "../Gameobject";
import { Element } from "./Element";
import { Vector } from "../../Main/Vector";
import { PuzzleManager } from "../../Game/PuzzleManager";

class MountainTile extends Gameobject
{
    private pm_: PuzzleManager;
    private timer_: number;

    constructor(position: Vector, pm: PuzzleManager)
    {
        super();
        this.name_ = "Mountain";
        this.tag_ = "Tile";
        this.ID_ = 0;
        this.position_ = new Vector(position.x, position.y);
        this.pm_ = pm;
        this.width_ = this.pm_.STATS.TILE_SIZE;
        this.height_ = this.pm_.STATS.TILE_SIZE;
        this.timer_ = 0;

        this.SpawnElement();
    }

    public Update(delta_time: number) 
    {
        this.timer_ += delta_time;
        if (this.timer_ > 1)
        {
            this.timer_ = 0;
            this.pm_.PARTICLE_MANAGER.Cloud(this.position_);
        }
    }

    private SpawnElement()
    {
        this.pm_.SCENE.Add(new Element("Mountain", 0, "Mountain.png", new Vector(this.position_.x, this.position_.y - 2), new Vector(32, 32)));
    }
}

export { MountainTile };