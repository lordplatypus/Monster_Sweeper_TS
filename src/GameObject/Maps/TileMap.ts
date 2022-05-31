import { Gameobject } from "../Gameobject";
import { Vector } from "../../Main/Vector";
import { Canvas } from "../../Main/Canvas";
import { Layers } from "../../Main/Layers";
import { Stats } from "../../Main/Stats";
import { PuzzleManager } from "../../Game/PuzzleManager";
import { Calculations } from "../../Main/Calculations";
//TILES
import { PlainTile } from "../Tiles/PlainTile";
import { ForrestTile } from "../Tiles/ForrestTile";
import { SwampTile } from "../Tiles/SwampTile";
import { DesertTile } from "../Tiles/DesertTile";
import { TundraTile } from "../Tiles/TundraTile";
import { MountainTile }from "../Tiles/MountainTile";
import { TownTile }from "../Tiles/TownTile";
import { IslandTile } from "../Tiles/IslandTile";

class TileMap extends Gameobject
{
    private stats_: Stats;
    private map_: number[][];
    private canvas_: Canvas;
    private tileImg_: HTMLImageElement;

    constructor(stats: Stats)
    {
        super();
        this.name_ = "TileMap";
        this.tag_ = "Map";
        this.ID_ = 0;
        this.position_ = new Vector(0, 0);
        this.width_ = stats.COLUMNS * stats.TILE_SIZE;
        this.height_ = (stats.ROWS + 1) * stats.TILE_SIZE; //the +1 is for the end tiles (nothing can spawn on these - for looks only)
        this.ALLOWCULLING = false;

        this.stats_ = stats;
        this.map_ = [[]];
        this.Init();

        this.canvas_ = new Canvas(this.width_, this.height_);
        this.tileImg_ = new Image();
        this.tileImg_.src = "./TileSet.png"
        this.tileImg_.onload = this.OnImgLoad;
    }

    private Init()
    {
        for (var y = 0; y < this.stats_.ROWS + 1; y++)
        {
            this.map_.push([]);
            for (var x = 0; x < this.stats_.COLUMNS; x++)
            {
                if (y === this.stats_.ROWS) this.map_[y].push(this.map_[y-1][x]); //match end tiles with the tile above it (just for looks)
                else this.map_[y].push(Math.floor(Math.random() * 8) + 1); //random tile
            }
        }
    }

    public Draw(layers: Layers)
    {
        layers.DrawToLayer("Tile", this.canvas_.CANVAS, this.position_.x, this.position_.y);
    }

    private OnImgLoad = () =>
    {
        this.UpdateCanvas(); //just to set up canvas
    }

    private UpdateCanvas()
    {
        var tempCanvas: HTMLCanvasElement | null;
        var tempCtx: CanvasRenderingContext2D | null;
        tempCanvas = document.createElement("canvas");
        tempCanvas.width = this.width_;
        tempCanvas.height = this.height_;
        if (tempCanvas !== null) tempCtx = tempCanvas.getContext("2d");
        else tempCtx = null;

        if (tempCtx === null) return;
        for (var y = 0; y < this.map_.length; y++)
        {
            for (var x = 0; x < this.map_[y].length; x++)
            {
                if (this.map_[y][x] < 1) continue;
                if (y === this.map_.length - 2)
                {//end tiles
                    tempCtx.drawImage(this.tileImg_, this.map_[y][x]*this.stats_.TILE_SIZE, this.stats_.TILE_SIZE, this.stats_.TILE_SIZE, this.stats_.TILE_SIZE, 
                                                     x*this.stats_.TILE_SIZE, y*this.stats_.TILE_SIZE, this.stats_.TILE_SIZE, this.stats_.TILE_SIZE);
                }
                else tempCtx.drawImage(this.tileImg_, this.map_[y][x]*this.stats_.TILE_SIZE, 0, this.stats_.TILE_SIZE, this.stats_.TILE_SIZE, 
                                                 x*this.stats_.TILE_SIZE, y*this.stats_.TILE_SIZE, this.stats_.TILE_SIZE, this.stats_.TILE_SIZE);
            }
        }

        if (this.canvas_.CONTEXT === null) return;
        this.canvas_.Clear();
        this.canvas_.CONTEXT.drawImage(tempCanvas, 0, 0);
    }

    private GetTileID(localPos: Vector): number
    {
        return this.map_[localPos.y][localPos.x];
    }

    public AddTileElements(localPos: Vector, pm: PuzzleManager)
    {
        const calcs: Calculations = new Calculations();
        switch(this.GetTileID(localPos))
        {
            default:
            break;

            case 1: //Plain
            pm.SCENE.Add(new PlainTile(calcs.ConvertLocalToWorld(localPos, this.stats_.TILE_SIZE), pm));
            break;

            case 2: //Forest
            pm.SCENE.Add(new ForrestTile(calcs.ConvertLocalToWorld(localPos, this.stats_.TILE_SIZE), pm));
            break;

            case 3: //Swamp
            pm.SCENE.Add(new SwampTile(calcs.ConvertLocalToWorld(localPos, this.stats_.TILE_SIZE), pm));
            break;

            case 4: //Desert
            pm.SCENE.Add(new DesertTile(calcs.ConvertLocalToWorld(localPos, this.stats_.TILE_SIZE), pm));
            break;

            case 5: //Tundra
            pm.SCENE.Add(new TundraTile(calcs.ConvertLocalToWorld(localPos, this.stats_.TILE_SIZE), pm));
            break;

            case 6: //Mountain
            pm.SCENE.Add(new MountainTile(calcs.ConvertLocalToWorld(localPos, this.stats_.TILE_SIZE), pm));
            break;

            case 7: //Town
            pm.SCENE.Add(new TownTile(calcs.ConvertLocalToWorld(localPos, this.stats_.TILE_SIZE), pm));
            break;

            case 8: //Island
            pm.SCENE.Add(new IslandTile(calcs.ConvertLocalToWorld(localPos, this.stats_.TILE_SIZE), pm));
            break;
        }
    }
}

export { TileMap };