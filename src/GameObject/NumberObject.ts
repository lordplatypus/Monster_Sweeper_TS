import { Gameobject } from "../GameObject/Gameobject";
import { Vector } from "../Main/Vector";
import { Number } from "../Main/Number";

class NumberObject extends Gameobject
{
    private number_: Number;

    constructor(num: number, position: Vector, name?: string, ID?: number)
    {
        super();
        this.name_ = name === undefined? "Number" : name;
        this.tag_ = "NumberObject";
        this.ID_ = ID === undefined? 0 : ID;
        this.position_ = new Vector(position.x, position.y);

        this.number_ = new Number(num, "#000000");
    }

    public Draw(main_ctx: CanvasRenderingContext2D)
    {
        main_ctx.drawImage(this.number_.CANVAS.CANVAS, this.position_.x, this.position_.y);
    }

    public get NUMBER(): number {return this.number_.NUMBER;}
    public set NUMBER(num: number) {this.number_.SetNumber(num);}
}

export { NumberObject };