import { Vector } from "../Main/Vector";
import { Calculations } from "../Main/Calculations";

import { PlayerManager } from "./PlayerManager";
import { Scene } from "../Scene/Scene";
import { Stats } from "../Main/Stats";
import { Camera } from "../Main/Camera";

import { TileMap } from "../GameObject/TileMap";
import { ObjectMap } from "../GameObject/ObjectMap";
import { HiddenTileMap } from "../GameObject/HiddenTileMap";
import { StartPositionSelector } from "../GameObject/StartPositionSelector";
import { Monster } from "../GameObject/Monster";
import { Gameobject } from "../GameObject/Gameobject";

class PuzzleManager
{
    private playerManager_: PlayerManager;
    private scene_: Scene;
    private stats_: Stats;
    private camera_: Camera;

    private tileMap_: TileMap;
    private hiddenTileMap_: HiddenTileMap;
    private objectMap_: ObjectMap;

    constructor(scene: Scene, stats: Stats, camera: Camera)
    {
        this.scene_ = scene;
        this.stats_ = stats;
        this.camera_ = camera;

        this.playerManager_ = new PlayerManager(this);

        this.tileMap_ = new TileMap(stats);
        this.hiddenTileMap_ = new HiddenTileMap(stats);
        this.objectMap_ = new ObjectMap(stats);

        this.scene_.Add(this.tileMap_);
        this.scene_.Add(this.hiddenTileMap_);
        this.scene_.Add(this.objectMap_);

        const startPos: Vector = new Vector(Math.floor(this.stats_.COLUMNS/2) * 32, Math.floor(this.stats_.ROWS/2) * 32);
        this.scene_.Add(new StartPositionSelector(this));
    }

    public PickEmptyTiles(startPos: Vector)
    {
        const calcs: Calculations = new Calculations(); //Calc functions
        var numberOfEmptyTiles: number = Math.floor(this.stats_.COLUMNS * this.stats_.ROWS / 10) - 1; //number of tiles to mark for deletion (10% of the map -1(startpos))
        var local: Vector = calcs.ConvertWorldToLocal(startPos, this.stats_.TILE_SIZE); //Grab local start position
        this.hiddenTileMap_.RemoveTile(local); //remove the starting tile
        var failsafe: number = 0;
        while(numberOfEmptyTiles > 0)
        {
            failsafe++;
            if (failsafe > 100) numberOfEmptyTiles = 0; //if stuck, break while loop after 100 iterations
            const prevPos: Vector = local;
            const rand: number = Math.floor(Math.random() * 4);
            switch(rand)
            {
                case 0:
                {//move left
                    local.x -= 1;
                    break;
                }

                case 1:
                {//move right
                    local.x += 1;
                    break;
                }

                case 2:
                {//move up
                    local.y -= 1;
                    break;
                }

                case 3:
                {//move down
                    local.y += 1;
                    break;
                }
            }
            //Does it go out of bounds?
            if (local.x < 0 || local.x >= this.stats_.COLUMNS || local.y < 0 || local.y >= this.stats_.ROWS)
            {
                local = prevPos;
                continue;
            }
            //Is it a repeat?
            var repeat: Boolean = false;
            if (!this.hiddenTileMap_.IsTile(local)) repeat = true;
            //if passes all checks add to list
            if (!repeat) 
            {
                this.hiddenTileMap_.RemoveTile(local); //remove tile from map
                numberOfEmptyTiles--; //one less tile to place
            }
        }

        this.PlaceMonsters();
    }

    private PlaceMonsters()
    {
        const calcs: Calculations = new Calculations(); //Calc functions
        var monsterNum: number = this.stats_.MONSTER_NUM;
        var failsafe: number = 0;
        while (monsterNum > 0)
        {
            failsafe++;
            if (failsafe > 100) monsterNum = 0; //if stuck, break while loop after 100 iterations
            const x: number = Math.floor(Math.random() * this.stats_.COLUMNS);
            const y: number = Math.floor(Math.random() * this.stats_.ROWS);

            if (!this.hiddenTileMap_.IsTile(new Vector(x, y))) continue; //if there is no hidden tile, DON'T place monster
            if (this.objectMap_.IsMonster(new Vector(x, y))) continue; //monster already exists at that position

            //if passes all checks add to list
            this.objectMap_.AddMonsterToMap(new Vector(x, y)); //add monster to map
            this.scene_.Add(new Monster(calcs.ConvertLocalToID(new Vector(x, y), this.stats_.ROWS, this.stats_.COLUMNS), new Vector(x*32, y*32), this, "Green")); //add "physical" monster
            monsterNum--; //one less monster to add
        }
    }

    //Map Checks

    public IsTile(localPos: Vector): boolean
    {
        return this.hiddenTileMap_.IsTile(localPos);
    }

    public IsObject(localPos: Vector): boolean 
    {
        var didCollide: boolean = false; //player collided with something?

        didCollide = this.objectMap_.IsMonster(localPos); //is it a monster?
        if (!didCollide) didCollide = this.objectMap_.IsItem(localPos); //is it an item?

        if (didCollide) 
        {//if yes
            const calcs: Calculations = new Calculations(); //Calc functions
            this.Collision(calcs.ConvertLocalToID(localPos, this.stats_.ROWS, this.stats_.COLUMNS)); //collision info sent to player and other object
        }

        return didCollide;
    }

    //Collision

    public Collision(otherID: number)
    {
        const player: Gameobject|null = this.scene_.Search("Player", "Player", 0); //get player
        const other: Gameobject|null = this.scene_.SearchByID(otherID); //get other object

        if (player === null || other === null) return; //if either is null, something went wrong

        other.OnCollision(player);
        player.OnCollision(other);
    }

    public get OBJECT_MAP(): ObjectMap {return this.objectMap_;}
    public get HIDDEN_TILE_MAP(): HiddenTileMap {return this.hiddenTileMap_;}

    public get SCENE(): Scene {return this.scene_;}
    public get STATS(): Stats {return this.stats_;}
    public get CAMERA(): Camera {return this.camera_;}
    public get PLAYER_MANAGER():PlayerManager {return this.playerManager_;}
}

export { PuzzleManager };