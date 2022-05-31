import { Gameobject } from "../Gameobject";
import { HouseElement } from "./HouseElement";
import { Vector } from "../../Main/Vector";
import { PuzzleManager } from "../../Game/PuzzleManager";

class TownTile extends Gameobject
{
    private pm_: PuzzleManager;
    private spawnLocations_: Vector[];
    private done_: boolean;
    private timer_: number;
    private houseNum_: number;

    constructor(position: Vector, pm: PuzzleManager)
    {
        super();
        this.name_ = "Town";
        this.tag_ = "Tile";
        this.ID_ = 0;
        this.position_ = new Vector(position.x, position.y);
        this.pm_ = pm;
        this.width_ = this.pm_.STATS.TILE_SIZE;
        this.height_ = this.pm_.STATS.TILE_SIZE;
        this.spawnLocations_ = [];
        this.done_ = false;
        this.timer_ = 0;
        this.houseNum_ = 0;

        this.RandomSpawnOrder();
    }

    public Update(delta_time: number) 
    {
        if (this.done_) return;

        this.timer_ += delta_time;
        if (this.timer_ > 0.2)
        {
            this.timer_ = 0;
            this.SpawnElement(this.spawnLocations_[this.houseNum_]);
            this.houseNum_++;
            if (this.houseNum_ >= this.spawnLocations_.length) this.done_ = true;
        }
    }

    private SpawnElement(housePosition: Vector)
    {
        var randomColor: string = "#";
        for (var i = 0; i < 6; i++) randomColor += Math.floor(Math.random() * 9);
        this.pm_.SCENE.Add(new HouseElement("House", 0, "House.png", housePosition, new Vector(32, 32), randomColor));
    }

    private RandomSpawnOrder()
    {
        const posVector: Vector[] = 
        [
            new Vector(this.position_.x, this.position_.y - 2),
            new Vector(this.position_.x + 7, this.position_.y - 2),
            new Vector(this.position_.x + 18, this.position_.y - 2),
            new Vector(this.position_.x + 25, this.position_.y - 2),
            new Vector(this.position_.x, this.position_.y + 9),
            new Vector(this.position_.x + 7, this.position_.y + 9),
            new Vector(this.position_.x + 18, this.position_.y + 9),
            new Vector(this.position_.x + 25, this.position_.y + 9),
            new Vector(this.position_.x, this.position_.y + 20),
            new Vector(this.position_.x + 7, this.position_.y + 20),
            new Vector(this.position_.x + 18, this.position_.y + 20),
            new Vector(this.position_.x + 25, this.position_.y + 20)
        ];

        for (var i = 0; i < posVector.length; )
        {
            const randomLocation: number = Math.floor(Math.random() * posVector.length);
            //const temp: Vector[] = posVector.splice(randomLocation, 1);
            this.spawnLocations_ = this.spawnLocations_.concat(posVector.splice(randomLocation, 1));
        } 
    }
}

export { TownTile };