import { Gameobject } from "../Gameobject";
import { Vector } from "../../Main/Vector";
import { Calculations } from "../../Main/Calculations";
import { Canvas } from "../../Main/Canvas";
import { Layers } from "../../Main/Layers";
import { PuzzleManager } from "../../Game/PuzzleManager";

class Monster extends Gameobject
{
    private pm_: PuzzleManager;
    private color_: string;
    private canvas_: Canvas;

    private hidden_: boolean; //is the monster hidden?
    private alive_: boolean; //diff then isDead as isDead is used to delete this object (don't want that in this case)
    
    constructor(ID: number, position: Vector, hidden: boolean, pm: PuzzleManager, color?: string)
    {
        super();
        this.name_ = "Monster";
        this.tag_ = "Monster";
        this.ID_ = ID;
        this.position_ = new Vector(position.x + 8, position.y + 8);
        this.width_ = 16;
        this.height_ = 16;
        this.pm_ = pm;
        this.color_ = color === undefined? "#ffffff" : color;
        this.ALLOWCOLLISIONS = true;
        this.hidden_ = hidden;
        this.alive_ = true;

        this.canvas_ = new Canvas(this.width_, this.height_);
        if (this.canvas_.CONTEXT === null) return;
        this.canvas_.CONTEXT.fillStyle = this.color_;
        this.canvas_.CONTEXT.fillRect(0, 0, this.width_, this.height_);
    }

    public Draw(layers: Layers)
    {
        layers.DrawToLayer("Object", this.canvas_.CANVAS, this.position_.x, this.position_.y);
    }

    public OnCollision(other: Gameobject)
    {
        if (other.NAME !== "Player" || !this.alive_) return; //should only collide with the player and only when alive

        this.pm_.PLAYER_MANAGER.HP -= this.CalculatePower();
        const calcs_: Calculations = new Calculations(); //get calcs for next line
        if (!this.hidden_) this.Kill(); //only dies if visible
        else this.hidden_ = false; //collided once, therefor it is now visible
    }

    public Kill()
    {
        this.alive_ = false; //dead flag
        const calcs_: Calculations = new Calculations();
        this.pm_.MONSTER_MAP.RemoveMonsterFromMap(calcs_.ConvertWorldToLocal(this.position_, this.pm_.STATS.TILE_SIZE)) //remove monster from collision
        this.pm_.AddItem(calcs_.ConvertWorldToLocal(this.position_, this.pm_.STATS.TILE_SIZE)); //add item to map upon death
        //TEMP
        if (this.canvas_.CONTEXT === null) return;
        this.canvas_.CONTEXT.fillStyle = "Red"; //change to red to show dead - change to sprite later
        this.canvas_.CONTEXT.fillRect(0, 0, this.width_, this.height_);
    }

    private CalculatePower(): number
    {
        const calcs_: Calculations = new Calculations(); //get calcs for next line
        const monsterLocalPos: Vector = calcs_.ConvertWorldToLocal(this.position_, this.pm_.STATS.TILE_SIZE); //convert world to local
        var monsterPower: number = 0; //starting monster power
        for (var y = monsterLocalPos.y - 1; y <= monsterLocalPos.y + 1; y++)
        {
            if (y < 0 || y >= this.pm_.STATS.ROWS) continue; //out of map bounds
            for (var x = monsterLocalPos.x - 1; x <= monsterLocalPos.x + 1; x++)
            {
                if (x < 0 || x >= this.pm_.STATS.COLUMNS) continue; //out of map bounds
                if (monsterLocalPos.x === x && monsterLocalPos.y === y) continue; //don't count self
                if (this.pm_.IsTile(new Vector(x, y))) monsterPower++; //+1 power for every nearby tile that has not been revealed
                if (this.pm_.MONSTER_MAP.IsMonster(new Vector(x, y))) monsterPower++; //+1 power for every nearby monster
            }
        }
        return monsterPower;
    }
}

export {Monster};