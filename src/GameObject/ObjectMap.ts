import { Gameobject } from "./Gameobject";
import { Vector } from "../Main/Vector";
import { Canvas } from "../Main/Canvas";
import { Layers } from "../Main/Layers";
import { Stats } from "../Main/Stats";
import { Number } from "../Main/Number";

class ObjectMap extends Gameobject
{
    private stats_: Stats;
    private map_: number[][];
    private canvas_: Canvas;
    private num_: Number;

    constructor(stats: Stats, monsterPositions?: Vector[])
    {
        super();
        this.name_ = "ObjectMap";
        this.tag_ = "Map";
        this.ID_ = 0;
        this.position_ = new Vector(0, 0);
        this.width_ = stats.COLUMNS * stats.TILE_SIZE;
        this.height_ = stats.ROWS * stats.TILE_SIZE;
        this.ALLOWCULLING = false;

        this.stats_ = stats;
        this.map_ = [[]];
        this.Init();

        this.num_ = new Number(5);

        this.canvas_ = new Canvas(this.width_, this.height_);
        this.UpdateCanvas();

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
    {
        layers.DrawToLayer("Number", this.canvas_.CANVAS, this.position_.x, this.position_.y);
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
                this.num_.SetNumber(this.map_[y][x]);
                tempCtx.drawImage(this.num_.CANVAS.CANVAS, x*this.stats_.TILE_SIZE+6, y*this.stats_.TILE_SIZE+4);
            }
        }

        if (this.canvas_.CONTEXT === null) return;
        this.canvas_.CONTEXT.clearRect(0, 0, this.width_, this.height_);
        this.canvas_.CONTEXT.drawImage(tempCanvas, 0, 0);
    }

    public AddMonsterToMap(localPos: Vector)
    {
        this.map_[localPos.y][localPos.x] = -1;
        for (var y = localPos.y - 1; y <= localPos.y + 1; y++)
        {
            if (y < 0 || y >= this.stats_.ROWS) continue;
            for (var x = localPos.x - 1; x <= localPos.x + 1; x++)
            {
                if (x < 0 || x >= this.stats_.COLUMNS) continue;
                if (this.map_[y][x] === -1) continue;
                if (localPos.x === x && localPos.y === y) continue;
                this.map_[y][x]++;
            }
        }
        this.UpdateCanvas();
    }

    public IsMonster(localPos: Vector): boolean
    {
        if (this.map_[localPos.y][localPos.x] === -1) return true;
        return false;
    }

    public IsItem(localPos: Vector): boolean
    {
        if (this.map_[localPos.y][localPos.x] > 0) return true;
        return false;
    }
}

export { ObjectMap };