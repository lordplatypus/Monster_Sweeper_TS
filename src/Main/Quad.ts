class Quad
{
    private x_: number; //world coordinate: x
    private y_: number; //world coordinate: y
    private width_: number; //width of object (NOT a world coordinate)
    private height_: number; //height of object (NOT a world coordinate)

    constructor(x: number, y: number, width: number, height: number)
    {
        this.x_ = x;
        this.y_ = y;
        this.width_ = width;
        this.height_ = height;
    }

    public Intersect(other: Quad): boolean
    {
        const array: number[] = 
            [this.x_, this.y_,                              //top left point
            this.x_ + this.width_, this.y_,                 //top right point
            this.x_, this.y_ + this.height_,                //bottom left point
            this.x_ + this.width_, this.y_ + this.height_]; //bottom right point

        for (var i = 0; i < array.length; i += 2)
        {
            if (array[i] >= other.X && array[i] <= other.X + other.WIDTH &&
                array[i + 1] >= other.Y && array[i + 1] <= other.Y + other.HEIGHT)
                return true;
        }

        return false;
    }

    public set X(x: number) {this.x_ = x;}
    public get X(): number {return this.x_;}
    public set Y(y: number) {this.y_ = y;}
    public get Y(): number {return this.y_;}
    public set WIDTH(width: number) {this.width_ = width;}
    public get WIDTH(): number {return this.width_;}
    public set HEIGHT(height: number) {this.height_ = height;}
    public get HEIGHT(): number {return this.height_;}
}

export { Quad };