import { Vector } from "./Vector";

class Calculations
{
    constructor()
    {}

    public GetCanvasSize(ratio: Vector): Vector
    {//Given a ratio (I.E. 16 x 9), return size of canvas that will fit within the current window 
        if (window.innerWidth <= window.innerHeight)
        {//Scale using width
            const x = window.innerWidth;
            const y = (x / ratio.x) * ratio.y;
            return new Vector(x, y);
        }
        else 
        {//Scale using height
            const y = window.innerHeight;
            const x = (y / ratio.y) * ratio.x;
            return new Vector(x, y);
        }
    }

    // public GetCanvasScale(): number
    // {

    // }

    public Lerp(v1: Vector, v2: Vector, time: number) : Vector
    {
        var v = v1;

        v.x = (1 - time) * v1.x + time * v2.x;
        v.y = (1 - time) * v1.y + time * v2.y;

        return v;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //Coordinates
    //World - canvas coordinates - type: Vector
    //Local - grid - columns X rows - type: Vector
    //ID - 0 => columns x rows - left to right, top to bottom - type: Number
    ///////////////////////////////////////////////////////////////////////////////////////////////
    public ConvertWorldToLocal(worldPosition: Vector, gridSize: number): Vector
    {
        var localPosition: Vector | null = new Vector(0, 0);

        localPosition.x = Math.floor(worldPosition.x / gridSize);
        localPosition.y = Math.floor(worldPosition.y / gridSize);

        return localPosition;
    }

    public ConvertLocalToWorld(localPosition: Vector, gridSize: number): Vector
    {
        var worldPosition: Vector = new Vector(0, 0);

        worldPosition.x = localPosition.x * gridSize;
        worldPosition.y = localPosition.y * gridSize;

        return worldPosition;
    }

    public ConvertLocalToID(localPosition: Vector, rows: number, columns: number): number
    {
        var ID: number | null = null;

        ID = (localPosition.y % rows) * columns + localPosition.x;

        return ID;
    }

    public ConvertIDToLocal(ID: number, columns: number): Vector
    {
        var localPosition = new Vector(0, 0);
        localPosition.x = ID % columns;
        localPosition.y = Math.floor(ID / columns);
        return localPosition;
    }
    
    public ConvertWorldToID(worldPosition: Vector, gridSize: number, rows: number, columns: number): number
    {
        return this.ConvertLocalToID(this.ConvertWorldToLocal(worldPosition, gridSize), rows, columns);
    }

    public ConvertIDToWorld(ID: number, gridSize: number, columns: number): Vector
    {
        return this.ConvertLocalToWorld(this.ConvertIDToLocal(ID, columns), gridSize);
    }
}

export {Calculations};