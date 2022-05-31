import { Gameobject } from "../Gameobject";
import { Element } from "./Element";
import { Vector } from "../../Main/Vector";
import { PuzzleManager } from "../../Game/PuzzleManager";

class ForrestTile extends Gameobject
{
    private pm_: PuzzleManager;

    private done_: boolean;
    private elementCount_: number;
    private timer_: number;
    private timeInBetween_: number; //number inbetween planting trees
    private state_: number; //0 = Back, 1 = Middle, 2 = Front

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
        this.timeInBetween_ = Math.floor(Math.random() * 2) / 10.0;
        this.state_ = 0;
    }

    public Update(delta_time: number) 
    {
        if (this.done_) return;
        this.SpawnElement(delta_time);
    }

    private SpawnElement(delta_time: number)
    {
        this.timer_ += delta_time;
        if (this.timer_ >= this.timeInBetween_)
        {
            this.timer_ = 0;
            this.timeInBetween_ = Math.floor(Math.random() * 2) / 10.0;

            var elementPosition: Vector = new Vector(this.position_.x + Math.floor(Math.random() * (this.width_ - 8)), 0);
            switch (this.state_)
            {
                default://Back
                elementPosition.y = this.position_.y - 8 - Math.floor(Math.random() * 8);
                this.pm_.SCENE.Add(new Element("TreeBack", this.elementCount_, "Tree_Back.png", elementPosition, new Vector(12, 24)));
                if (this.elementCount_ > 5) this.state_ = 1;
                break;

                case 1://Middle
                elementPosition.y = this.position_.y - Math.floor(Math.random() * 8);
                this.pm_.SCENE.Add(new Element("TreeMiddle", this.elementCount_, "Tree_Middle.png", elementPosition, new Vector(12, 24)));
                if (this.elementCount_ > 10) this.state_ = 2;
                break;

                case 2://Front
                elementPosition.y = this.position_.y + 8 - Math.floor(Math.random() * 8);
                this.pm_.SCENE.Add(new Element("TreeFront", this.elementCount_, "Tree_Front.png", elementPosition, new Vector(12, 24)));
                if (this.elementCount_ > 15) this.done_ = true;
                break;
            }
            this.elementCount_++;
        }
    }
}

export {ForrestTile};