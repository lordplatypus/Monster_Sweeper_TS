import { Button } from "./Button";
import { Stats } from "../Main/Stats";
import { Vector } from "../Main/Vector";
import { NumberObject } from "../GameObject/NumberObject";

class UpdateStatButton extends Button
{
    private stats_: Stats;
    private statName_: string;
    private value_: number; //how much the number is incremented (EX. +1 or +10 etc)
    private minValue_: number; //limit - min
    private maxValue_: number; //limit - max
    private numObj_: NumberObject | undefined; //optional, if there is text displayed, this will give access to that text

    constructor(stats: Stats, position: Vector, size: Vector, 
                imgPath: string, statName: string, value: number, minValue: number, maxValue: number, numObj?: NumberObject)
    {
        super();
        this.stats_ = stats;
        this.name_ = "UpdateStatButton";
        this.tag_ = "Button";
        this.ID_ = 0;
        this.position_ = new Vector(position.x, position.y);
        this.size_ = size;
        this.img_ = new Image();
        this.img_.src = imgPath;

        this.statName_ = statName;
        this.value_ = value;
        this.minValue_ = minValue;
        this.maxValue_ = maxValue;
        this.numObj_ = numObj;
    }

    public Effect()
    {
        var currentStatValue: number = this.stats_.GetStat(this.statName_); //get current stat value
        if (currentStatValue === -1) return; //make sure it exists

        const newValue: number = currentStatValue + this.value_;
        if (newValue < this.minValue_ || newValue > this.maxValue_) return; //limter
        this.stats_.SetStat(this.statName_, newValue); //set stat

        if (this.numObj_ === undefined) return;
        this.numObj_.NUMBER = newValue;
    }
}

export {UpdateStatButton};