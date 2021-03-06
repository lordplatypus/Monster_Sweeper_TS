import { Game } from "./Game";
import { Calculations } from "./Calculations";
import { Vector } from "./Vector";
import { Camera } from "./Camera";
import { Layers } from "./Layers";

var past = Date.now();
function delta_time()
{
    const now = Date.now(); //Grab the current time in milliseconds
    const delta_time_ = now - past; //subtract the past from now to get the time inbetween loops
    past = now; //set up the past for next iteration
    return delta_time_ / 1000.0; //convert milliseconds to seconds
}

const camera_: Camera = new Camera(new Vector(480, 270) , new Vector(1920, 1080)); //camera
const game_: Game = new Game(camera_); //Scene manager
const calcs_: Calculations = new Calculations();

//Main canvas, will be used to draw other canvas (like views) - setup in the html file - required
const main_canvas_: HTMLCanvasElement = <HTMLCanvasElement>$("main_canvas");
const canvasSize: Vector = new Vector(480, 270);
main_canvas_.width = canvasSize.x;
main_canvas_.height = canvasSize.y;
const main_ctx_: CanvasRenderingContext2D | null = main_canvas_.getContext("2d");

//Canvas Scale - to make pixel art not blurry
const canvasScale: Vector = calcs_.GetCanvasSize(new Vector(16, 9));
main_canvas_.style.width = canvasScale.x + "px";
main_canvas_.style.height = canvasScale.y + "px";
main_canvas_.style.imageRendering = "pixelated";

//Layers
const layers_: Layers = new Layers(canvasScale.x, canvasScale.y);

Main();

function Main()
{
    game_.Update(delta_time()); //UPDATE

    if (main_ctx_ !== null)
    {//DRAW
        main_ctx_.setTransform(1,0,0,1,0,0); //reset position
        main_ctx_.fillStyle = "black"; //set background color
        main_ctx_.fillRect(0, 0, main_canvas_.getBoundingClientRect().width, main_canvas_.getBoundingClientRect().height); //clear the canvas and fill it with black
        
        const camera_center: Vector = camera_.CENTER; //get camera center
        main_ctx_.translate(camera_center.x, camera_center.y); //move to camera point of view

        //game_.Draw(main_ctx_);
        game_.Draw(layers_);
        layers_.Draw(main_ctx_); //Draw Layers to the Main Canvas
        layers_.DrawUI(main_ctx_, camera_.VIEWPORT.X, camera_.VIEWPORT.Y); //Draw UI to the Main Canvas
    }
    window.requestAnimationFrame(Main); //Next Frame
}

function $(id: string)
{
    return document.getElementById(id);
}