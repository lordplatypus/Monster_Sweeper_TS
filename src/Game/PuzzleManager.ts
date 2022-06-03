import { Vector } from "../Main/Vector";
import { Calculations } from "../Main/Calculations";

import { PlayerManager } from "./PlayerManager";
import { Scene } from "../Scene/Scene";
import { Stats } from "../Main/Stats";
import { Camera } from "../Main/Camera";

import { ParticleManager } from "../Particles/ParticleManager";

import { TileMap } from "../GameObject/Maps/TileMap";
import { MonsterMap } from "../GameObject/Maps/MonsterMap";
import { ItemMap } from "../GameObject/Maps/ItemMap";
import { HiddenTileMap } from "../GameObject/Maps/HiddenTileMap";
import { NumberMap } from "../GameObject/Maps/NumberMap";
import { StartPositionSelector } from "../GameObject/StartPositionSelector";
import { Gameobject } from "../GameObject/Gameobject";

class PuzzleManager
{
    private playerManager_: PlayerManager;
    private scene_: Scene;
    private stats_: Stats;
    private camera_: Camera;

    private particleManager_: ParticleManager;

    private tileMap_: TileMap;
    private hiddenTileMap_: HiddenTileMap;
    private monsterMap_: MonsterMap;
    private itemMap_: ItemMap;
    private numberMap_: NumberMap;

    constructor(scene: Scene, stats: Stats, camera: Camera)
    {
        this.scene_ = scene;
        this.stats_ = stats;
        this.camera_ = camera;

        this.playerManager_ = new PlayerManager(this);

        this.particleManager_ = new ParticleManager(scene);

        this.tileMap_ = new TileMap(stats);
        this.hiddenTileMap_ = new HiddenTileMap(stats);
        this.monsterMap_ = new MonsterMap(stats);
        this.itemMap_ = new ItemMap(stats);
        this.numberMap_ = new NumberMap(stats);

        this.scene_.Add(this.tileMap_);
        this.scene_.Add(this.hiddenTileMap_);
        this.scene_.Add(this.numberMap_);

        const startPos: Vector = new Vector(Math.floor(this.stats_.COLUMNS/2) * 32, Math.floor(this.stats_.ROWS/2) * 32);
        this.scene_.Add(new StartPositionSelector(this));
    }

    //INIT

    public PickEmptyTiles(startPos: Vector)
    {
        const calcs: Calculations = new Calculations(); //Calc functions
        var numberOfEmptyTiles: number = Math.floor(this.stats_.COLUMNS * this.stats_.ROWS / 10) - 1; //number of tiles to mark for deletion (10% of the map -1(startpos))
        var local: Vector = calcs.ConvertWorldToLocal(startPos, this.stats_.TILE_SIZE); //Grab local start position
        this.RemoveHiddenTile(local); //remove the starting tile
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
                this.RemoveHiddenTile(local) //remove tile from map
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
            if (this.monsterMap_.IsMonster(new Vector(x, y))) continue; //monster already exists at that position

            //if passes all checks add to list
            this.monsterMap_.AddMonsterToMap(new Vector(x, y)); //add monster to map
            this.numberMap_.AddMonsterToMap(new Vector(x, y));
            monsterNum--; //one less monster to add
        }
        this.numberMap_.UpdateRevealedNumbers(this);
    }

    //Map Checks

    public IsTile(localPos: Vector): boolean
    {
        return this.hiddenTileMap_.IsTile(localPos);
    }

    public IsObject(localPos: Vector): boolean 
    {
        var didCollide: boolean = false; //player collided with something?
        var tag: string = "";

        if (this.monsterMap_.IsMonster(localPos))
        {//is it a monster?
            didCollide = true;
            //if (this.HIDDEN_TILE_MAP.IsTile(localPos)) this.objectMap_.SpawnMonster(this, localPos); //spawn monster now so that I can place it on a layer above tile elements
            tag = "Monster";
        }

        if (!didCollide && this.itemMap_.IsItem(localPos)) 
        {//is it an item?
            didCollide = true;
            //if (this.HIDDEN_TILE_MAP.IsTile(localPos)) this.objectMap_.SpawnItem(this, localPos); //spawn item now so that I can place it on a layer above tile elements
            tag = "Item";
        }

        if (didCollide) 
        {//if yes
            const calcs: Calculations = new Calculations(); //Calc functions
            this.Collision(tag, calcs.ConvertLocalToID(localPos, this.stats_.ROWS, this.stats_.COLUMNS)); //collision info sent to player and other object
        }

        return didCollide;
    }

    //Spawn

    public AddMonster(localPos: Vector, monsterID?: number)
    {
        if (this.monsterMap_.IsMonster(localPos)) return; //Monster already exists
        this.monsterMap_.AddMonsterToMap(localPos, monsterID); //Add monster to map (dosen't physical spawn in monster yet)
        if (!this.HIDDEN_TILE_MAP.IsTile(localPos)) this.monsterMap_.SpawnMonster(this, localPos, false, monsterID); //Spawn in monster physicaly if there is NO hidden tile
    }

    public AddItem(localPos: Vector, itemID?: number)
    {
        if (this.itemMap_.IsItem(localPos)) return; //Item already exists
        this.itemMap_.AddItemToMap(localPos, itemID); //Add Item to map (dosen't physical spawn in item yet)
        if (!this.HIDDEN_TILE_MAP.IsTile(localPos)) this.itemMap_.SpawnItem(this, localPos, false, itemID); //Spawn in item physicaly if there is NO hidden tile
    }

    //Collision

    public Collision(otherTag: string, otherID: number)
    {
        const player: Gameobject|null = this.scene_.Search("Player", "Player", 0); //get player
        const other: Gameobject|null = this.scene_.SearchByTagAndID(otherTag, otherID); //get other object

        if (player === null || other === null) return; //if either is null, something went wrong

        other.OnCollision(player);
        player.OnCollision(other);
    }

    public RemoveHiddenTile(localPos: Vector)
    {
        if (!this.hiddenTileMap_.RemoveTile(localPos)) return; //if there is a hidden tile remove it and continue with code below
        this.numberMap_.RevealNumber(localPos); //Display number
        this.tileMap_.AddTileElements(localPos, this); //addes tile elements
        if (this.monsterMap_.IsMonster(localPos)) this.monsterMap_.SpawnMonster(this, localPos, true); //if there is a monster, spawn it
        if (this.itemMap_.IsItem(localPos)) this.itemMap_.SpawnItem(this, localPos, true); //if there is an item, spawn it
    }

    public get MONSTER_MAP(): MonsterMap {return this.monsterMap_;}
    public get ITEM_MAP(): ItemMap {return this.itemMap_;}
    public get HIDDEN_TILE_MAP(): HiddenTileMap {return this.hiddenTileMap_;}

    public get SCENE(): Scene {return this.scene_;}
    public get STATS(): Stats {return this.stats_;}
    public get CAMERA(): Camera {return this.camera_;}
    public get PLAYER_MANAGER(): PlayerManager {return this.playerManager_;}
    public get PARTICLE_MANAGER(): ParticleManager {return this.particleManager_;}
}

export { PuzzleManager };