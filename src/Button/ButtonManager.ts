import { Button } from "./Button";
import { Vector } from "../Main/Vector";
import { Calculations } from "../Main/Calculations";
import { Layers } from "../Main/Layers";

class ButtonManager
{
    private buttons_: Button[];
    private canvas_: HTMLCanvasElement;
    private scale_: Vector;

    constructor()
    {
        this.buttons_ = [];

        this.canvas_ = <HTMLCanvasElement>document.getElementById("main_canvas");

        //Calculate scale for accurate mouse detection
        const calcs: Calculations = new Calculations();
        this.scale_ = new Vector(calcs.GetCanvasSize(new Vector(16, 9)).x / 480, calcs.GetCanvasSize(new Vector(16, 9)).y / 270); //canvas width divided by resolution width = scale
    }

    public Init()
    {
        if (this.canvas_ !== null) 
        {
            this.canvas_.addEventListener("mousemove", this.MouseMovement);
            this.canvas_.addEventListener("mousedown", this.MouseDown);
            this.canvas_.addEventListener("mouseup", this.MouseUp);
        }
    }

    public Draw(layers: Layers)
    {
        for (var i = 0; i < this.buttons_.length; i++)
        {
            this.buttons_[i].Draw(layers);
        }
    }

    // public DelayedDraw(main_ctx: CanvasRenderingContext2D)
    // {
    //     for (var i = 0; i < this.buttons_.length; i++)
    //     {
    //         this.buttons_[i].DelayedDraw(main_ctx);
    //     }
    // }

    // UIDraw(camera_ctx: CanvasRenderingContext2D)
    // {//Meant only for UI
    //     for (var i = 0; i < this.buttons_.length; i++)
    //     {
    //         this.buttons_[i].UIDraw(camera_ctx);
    //     }
    // }

    public Add(button: Button)
    {
        this.buttons_.push(button);
    }

    public Clear()
    {
        this.buttons_ = [];
        if (this.canvas_ !== null)
        {
            this.canvas_.removeEventListener("mousemove", this.MouseMovement);
            this.canvas_.removeEventListener("mousedown", this.MouseDown);
            this.canvas_.removeEventListener("mouseup", this.MouseUp);
        }
    }

    private MouseMovement = (event: MouseEvent) =>
    {
        if (this.canvas_ === null || this.canvas_ === undefined) 
        {
            console.log("Fail");
            return;
        }

        var rectangle : DOMRect = this.canvas_.getBoundingClientRect();
        var mousePosition: Vector = new Vector((event.clientX - rectangle.left) / this.scale_.x, (event.clientY - rectangle.top) / this.scale_.y);

        for (var i = 0; i < this.buttons_.length; i++)
        {
            if (mousePosition.x >= this.buttons_[i].POSITION.x && mousePosition.x <= this.buttons_[i].POSITION.x + this.buttons_[i].SIZE.x && 
                mousePosition.y >= this.buttons_[i].POSITION.y && mousePosition.y <= this.buttons_[i].POSITION.y + this.buttons_[i].SIZE.y)
                this.buttons_[i].HIGHLIGHT = true;
            else  this.buttons_[i].HIGHLIGHT = false;
        }
    }

    private MouseDown = (event: MouseEvent) =>
    {
        for (var i = 0; i < this.buttons_.length; i++)
        {
            if (this.buttons_[i].HIGHLIGHT) this.buttons_[i].PRESSED = 1;
        }
    }

    private MouseUp = (event: MouseEvent) =>
    {
        var selectedButton: number = -1;
        for (var i = 0; i < this.buttons_.length; i++)
        {
            if (this.buttons_[i].PRESSED === 1 && this.buttons_[i].HIGHLIGHT) selectedButton = i;
            this.buttons_[i].PRESSED = 0;
        }
        //running the line below directly in the loop would cause "undefined" issues.
        //changing scene buttons would delete the list of buttons and then the loop would try to access the next button, resulting in an error.
        if (selectedButton !== -1 && this.buttons_[selectedButton].ACTIVE === true) this.buttons_[selectedButton].Effect();
    }
}

export {ButtonManager};