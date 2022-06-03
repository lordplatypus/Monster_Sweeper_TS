import { Gameobject } from "../Gameobject";
import { Vector } from "../../Main/Vector";
import { Calculations } from "../../Main/Calculations";
import { PuzzleManager } from "../../Game/PuzzleManager";
import { Layers } from "../../Main/Layers";
import { Stats } from "../../Main/Stats";
//Monsters
import { Monster } from "../Monsters/Monster";

///////////////////////////////////////////////////////////////////////////////////////////////////
//MAP INFO
///////////////////////////////////////////////////////////////////////////////////////////////////
//if Map[y][x] === 0 then there is NO Monster
//if Map[y][x] > 0 then there is a MONSTER
///////////////////////////////////////////////////////////////////////////////////////////////////
//MAP INFO
///////////////////////////////////////////////////////////////////////////////////////////////////

class MonsterMap extends Gameobject
{
    private stats_: Stats;
    private map_: number[][];

    constructor(stats: Stats)
    {
        super();
        this.name_ = "Monster";
        this.tag_ = "Map";
        this.ID_ = 0;
        this.position_ = new Vector(0, 0);
        this.width_ = stats.COLUMNS * stats.TILE_SIZE;
        this.height_ = stats.ROWS * stats.TILE_SIZE;

        this.stats_ = stats;
        this.map_ = [[]];
        this.Init();
    }

    private Init()
    {
        for (var y = 0; y < this.stats_.ROWS; y++)
        {
            this.map_.push([]);
            for (var x = 0; x < this.stats_.COLUMNS; x++)
            {
                this.map_[y].push(0);
            }
        }
    }

    public Draw(layers: Layers)
    {}

    public AddMonsterToMap(localPos: Vector, monsterID?: number)
    {
        this.map_[localPos.y][localPos.x] = monsterID === undefined? 1 : monsterID;
    }

    public SpawnMonster(pm: PuzzleManager, localPos: Vector, hidden: boolean, monsterID?: number)
    {
        const ID: number = monsterID === undefined? this.map_[localPos.y][localPos.x] : monsterID;
        if (monsterID !== undefined) this.map_[localPos.y][localPos.x] = monsterID;
        const calcs: Calculations = new Calculations();
        switch(ID)
        {
            default:
            pm.SCENE.Add(new Monster(calcs.ConvertLocalToID(localPos, this.stats_.ROWS, this.stats_.COLUMNS), calcs.ConvertLocalToWorld(localPos, this.stats_.TILE_SIZE), hidden, pm));
            break;

            case 1:
            pm.SCENE.Add(new Monster(calcs.ConvertLocalToID(localPos, this.stats_.ROWS, this.stats_.COLUMNS), calcs.ConvertLocalToWorld(localPos, this.stats_.TILE_SIZE), hidden, pm));
            break;
        }
    }

    public RemoveMonsterFromMap(localPos: Vector)
    {//This only removes the monster ID from the map, it DOES NOT physicaly remove the monster - This effectivly removes the monster from collisions
        this.map_[localPos.y][localPos.x] = 0;
    }

    public IsMonster(localPos: Vector): boolean
    {
        if (this.map_[localPos.y][localPos.x] > 0) return true;
        return false;
    }
}

export { MonsterMap };