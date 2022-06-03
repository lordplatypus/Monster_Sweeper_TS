import { Gameobject } from "../Gameobject";
import { Vector } from "../../Main/Vector";
import { Calculations } from "../../Main/Calculations";
import { PuzzleManager } from "../../Game/PuzzleManager";
import { Layers } from "../../Main/Layers";
import { Stats } from "../../Main/Stats";
//Ojects
//Items
import { HealthRegen } from "../Items/HealthRegen";
//Monsters
import { Monster } from "../Monsters/Monster";

///////////////////////////////////////////////////////////////////////////////////////////////////
//MAP INFO
///////////////////////////////////////////////////////////////////////////////////////////////////
//if Map[y][x] === 0 then there is NO object NOR Item
//if Map[y][x] > 0 then there is an ITEM
//else Map[y][x] < 0 then there is a MONSTER
///////////////////////////////////////////////////////////////////////////////////////////////////
//MAP INFO
///////////////////////////////////////////////////////////////////////////////////////////////////

class ObjectMap extends Gameobject
{
    private stats_: Stats;
    private map_: number[][];

    constructor(stats: Stats, monsterPositions?: Vector[])
    {
        super();
        this.name_ = "ObjectMap";
        this.tag_ = "Map";
        this.ID_ = 0;
        this.position_ = new Vector(0, 0);
        this.width_ = stats.COLUMNS * stats.TILE_SIZE;
        this.height_ = stats.ROWS * stats.TILE_SIZE;

        this.stats_ = stats;
        this.map_ = [[]];
        this.Init();

        if (monsterPositions !== undefined)
        {
            for (var i = 0; i < monsterPositions.length; i++)
            {
                this.AddMonsterToMap(monsterPositions[i]);
            }
        }
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
        this.map_[localPos.y][localPos.x] = monsterID === undefined? -1 : monsterID;
    }

    public AddItemToMap(localPos: Vector, itemID?: number)
    {
        this.map_[localPos.y][localPos.x] = itemID === undefined? 1 : itemID;
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

            case -1:
            pm.SCENE.Add(new Monster(calcs.ConvertLocalToID(localPos, this.stats_.ROWS, this.stats_.COLUMNS), calcs.ConvertLocalToWorld(localPos, this.stats_.TILE_SIZE), hidden, pm));
            break;
        }
    }

    public SpawnItem(pm: PuzzleManager, localPos: Vector, hidden: boolean, itemID?: number)
    {
        const ID: number = itemID === undefined? this.map_[localPos.y][localPos.x] : itemID;
        if (itemID !== undefined) this.map_[localPos.y][localPos.x] = itemID;
        const calcs: Calculations = new Calculations();
        switch(ID)
        {
            default:
            break;

            case 1:
            pm.SCENE.Add(new HealthRegen(calcs.ConvertLocalToID(localPos, this.stats_.ROWS, this.stats_.COLUMNS), calcs.ConvertLocalToWorld(localPos, this.stats_.TILE_SIZE), hidden, pm));
            break;
        }
    }

    public IsMonster(localPos: Vector): boolean
    {
        if (this.map_[localPos.y][localPos.x] < 0) return true;
        return false;
    }

    public IsItem(localPos: Vector): boolean
    {
        if (this.map_[localPos.y][localPos.x] > 0) return true;
        return false;
    }
}

export { ObjectMap };