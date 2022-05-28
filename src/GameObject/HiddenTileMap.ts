import { Gameobject } from "./Gameobject";
import { Vector } from "../Main/Vector";
import { Canvas } from "../Main/Canvas";
import { Layers } from "../Main/Layers";
import { Stats } from "../Main/Stats";

class HiddenTileMap extends Gameobject
{
    private map_: number[][]; //0 = no tile | 1 = tile (boolean logic)
    private canvas_: Canvas;
    private stats_: Stats;
    private tileImg_: HTMLImageElement;

    constructor(stats: Stats)
    {
        super();
        this.name_ = "HiddenTileMap";
        this.tag_ = "Map";
        this.ID_ = 0;
        this.position_ = new Vector(0, 0);
        this.width_ = stats.COLUMNS * stats.TILE_SIZE;
        this.height_ = (stats.ROWS + 1) * stats.TILE_SIZE; //the +1 is for the end tiles (for looks only)
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
                this.map_[y].push(1);
            }
        }
    }

    public Draw(layers: Layers)
    {
        layers.DrawToLayer("Dust", this.canvas_.CANVAS, this.position_.x, this.position_.y)
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
                if (this.map_[y][x] === 0) continue;
                if (y === this.map_.length - 2)
                {//end tiles
                    tempCtx.drawImage(this.tileImg_, 0, this.stats_.TILE_SIZE, this.stats_.TILE_SIZE, this.stats_.TILE_SIZE, 
                                                     x*this.stats_.TILE_SIZE, y*this.stats_.TILE_SIZE, this.stats_.TILE_SIZE, this.stats_.TILE_SIZE);
                }
                else tempCtx.drawImage(this.tileImg_, 0, 0, this.stats_.TILE_SIZE, this.stats_.TILE_SIZE, 
                                                 x*this.stats_.TILE_SIZE, y*this.stats_.TILE_SIZE, this.stats_.TILE_SIZE, this.stats_.TILE_SIZE);
            }
        }

        if (this.canvas_.CONTEXT === null) return;
        this.canvas_.Clear();
        this.canvas_.CONTEXT.drawImage(tempCanvas, 0, 0);
    }

    public RemoveTile(localPos: Vector): boolean
    {
        if (!this.IsTile(localPos)) return false;
        this.map_[localPos.y][localPos.x] = 0;
        if (localPos.y === this.stats_.ROWS-1) this.map_[localPos.y+1][localPos.x] = 0; //for end tiles
        this.UpdateCanvas();
        return true;
    }

    public Traversable(localPos: Vector): boolean
    {//Is the position empty and within the game bounds? if yes, then it is traversable
        if (!this.WithinBounds(localPos)) return false;
        if (this.map_[localPos.y][localPos.x] === 0) return true; //the tile is empty
        return false;
    }

    public Reachable(localPos: Vector): boolean
    {//Is the tile reachable? if yes, that means the tile is NOT empty and is adjacent to an empty tile
        for (var y = localPos.y - 1; y <= localPos.y + 1; y++)
        {
            if (y < 0 || y >= this.stats_.ROWS) continue;
            for (var x = localPos.x - 1; x <= localPos.x + 1; x++)
            {
                if (x < 0 || x >= this.stats_.COLUMNS) continue;
                if (!this.IsTile(new Vector(x, y))) return true; //one of the surrounding tiles are empty
            }
        }
        return false; //tile is completly surrounded and thus not reachable
    }

    public ReachableFromWhere(localPos: Vector): Vector[]
    {//Return an array of empty tile positions surrounding the given local pos
        var emptyTilePos: Vector[] = [];
        for (var y = localPos.y - 1; y <= localPos.y + 1; y++)
        {
            if (y < 0 || y >= this.stats_.ROWS) continue;
            for (var x = localPos.x - 1; x <= localPos.x + 1; x++)
            {
                if (x < 0 || x >= this.stats_.COLUMNS) continue;
                if (!this.IsTile(new Vector(x, y))) emptyTilePos.push(new Vector(x, y));
            }
        }
        return emptyTilePos;
    }

    public IsTile(localPos: Vector): boolean 
    {//check to see if the given local position has a tile or not
        if (this.map_[localPos.y][localPos.x] === 0) return false;
        return true;
    }

    public WithinBounds(localPos: Vector): boolean
    {//check to see if the given local position is within the game area
        if (localPos.x < 0 || localPos.x > this.stats_.COLUMNS - 1 || localPos.y < 0 || localPos.y > this.stats_.ROWS - 1) return false;
        return true;
    }
}

export { HiddenTileMap };