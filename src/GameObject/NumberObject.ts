import { Gameobject } from "../GameObject/Gameobject";
import { Vector } from "../Main/Vector";
import { Layers } from "../Main/Layers";
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

    public Draw(layers: Layers)
    {
        layers.DrawToLayer("Number", this.number_.CANVAS.CANVAS, this.position_.x, this.position_.y);
    }

    public get NUMBER(): number {return this.number_.NUMBER;}
    public set NUMBER(num: number) {this.number_.SetNumber(num);}
}

export { NumberObject };