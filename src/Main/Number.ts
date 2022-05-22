import { Canvas } from "./Canvas";

class Number
{
    //Arguments
    private number_: number;
    private color_: string;
    //private
    private img_: HTMLImageElement;
    private canvas_: Canvas;
    private digits_: number[];
    private width_: number;
    private height_: number;

    constructor(number: number, color?: string)
    {
        this.number_ = number;
        this.color_ = color === undefined ? "#ffffff" : color;

        this.digits_ = [];
        this.width_ = 4 * 5; //width of one number in the "number" texture
        this.height_ = 5 * 5; //height of one number in the "number" texture

        this.img_ = new Image();
        this.img_.src = "./Numbers.png";
        this.img_.onload = this.OnLoad;

        this.canvas_ = new Canvas(1, 1); //set size to (1, 1) because the program tries to draw the canvas before the image loads and if the size was (0, 0) it would crash
    }

    private OnLoad = () =>
    {
        this.GetDigits();
        this.SetTempCanvas();
    }

    private GetDigits()
    {
        var numOfDigits: number = 0;
        var digitCalc: number = this.number_; //temp number - divide by 10 until it goes below 1 - the number of iterations = number of digits
        do
        {
            numOfDigits++;
            digitCalc /= 10;
        } while (digitCalc >= 1)

        var sub: number = 0; //I use this to subtract from the given number to get the right digit
        for (var i = 0; i < numOfDigits; i++)
        {
            const front: number = this.number_ - sub; //get the the right digit (I.E. Hundreds / Tens / Etc)
            const back: number = Math.pow(10, (numOfDigits - 1 - i)); //divde by the right multiple (100 / 10 / Etc)
            const answer: number = back === 0 ? Math.floor(front) : Math.floor(front / back); //divide the digit by the multiple to get the number

            this.digits_.push(answer)

            sub += answer * back; //update this value for next iteration
        }
    }

    private SetTempCanvas()
    {
        //change canvas size - matters when the num of digits change
        this.canvas_.CANVAS.width = this.width_ * this.digits_.length;
        this.canvas_.CANVAS.height = this.height_;

        //temp canvas to first place the numbers
        //this has to be done on a seperate canvas as the "globalCompositeOperation" only works on the last drawn thing
        //because more then 1 number is drawn before this opperation, it doesn't work as intended (numbers don't show up at all)
        //Thus the opperation must be drawn after drawing the temp canvas to the canvas
        //NOTE: the temp canvas will go out of scope, so no need to delete it (this happens because it wasn't attached to a parent? I think. I hope...)
        var tempCanvas: HTMLCanvasElement | null;
        var tempCtx: CanvasRenderingContext2D | null;
        tempCanvas = document.createElement("canvas");
        tempCanvas.width = this.width_ * this.digits_.length;
        tempCanvas.height = this.height_;
        if (tempCanvas !== null) tempCtx = tempCanvas.getContext("2d");
        else tempCtx = null;

        if (tempCtx === null) return;
        for (var i = 0; i < this.digits_.length; i++)
        {//draw each digit to the temp canvas
            tempCtx.drawImage(this.img_, this.digits_[i] * this.width_, 0, this.width_, this.height_, i * this.width_, 0, this.width_, this.height_); //texture pos then global pos
        }

        //draw temp canvas to the canvas and then apply the color
        if (this.canvas_.CONTEXT === null) return;
        this.canvas_.CONTEXT.fillStyle = this.color_;
        this.canvas_.CONTEXT.fillRect(0, 0, this.width_ * this.digits_.length, this.height_);
        this.canvas_.CONTEXT.globalCompositeOperation = "destination-in";
        this.canvas_.CONTEXT.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, tempCanvas.width, tempCanvas.height);
    }

    public SetNumber(number: number, color?: string)
    {
        this.number_ = number;
        this.color_ = color === undefined? this.color_ : color;
        this.digits_ = [];
        this.GetDigits();
        this.SetTempCanvas();
    }

    public get NUMBER(): number {return this.number_;}
    public get CANVAS(): Canvas {return this.canvas_;}
}

export { Number }