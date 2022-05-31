import { Gameobject } from "../Gameobject";
import { Vector } from "../../Main/Vector";
import { PuzzleManager } from "../../Game/PuzzleManager";

class TundraTile extends Gameobject
{
    private pm_: PuzzleManager;
    private timer_: number;

    constructor(position: Vector, pm: PuzzleManager)
    {
        super();
        this.name_ = "Tundra";
        this.tag_ = "Tile";
        this.ID_ = 0;
        this.position_ = new Vector(position.x, position.y);
        this.pm_ = pm;
        this.width_ = this.pm_.STATS.TILE_SIZE;
        this.height_ = this.pm_.STATS.TILE_SIZE;
        this.timer_ = 0;
    }

    public Update(delta_time: number) 
    {
        this.timer_ += delta_time;
        if (this.timer_ > .01)
        {
            this.timer_ = 0;
            this.pm_.PARTICLE_MANAGER.Snow(this.position_);
        }
    }
}

export { TundraTile };