import { Scene } from "./Scene";
import { Game } from "../Main/Game";
import { Vector } from "../Main/Vector";
import { Layers } from "../Main/Layers";
//Buttons
import { ButtonManager } from "../Button/ButtonManager";
import { UITransitionButton } from "../Button/UITransitionButton";
//Gameobjects
import { GameobjectManager } from "../GameObject/GameobjectManager";
import { Gameobject } from "../GameObject/Gameobject";
import { Background } from "../GameObject/Background";
import { PuzzleManager } from "../Game/PuzzleManager";
import { CameraControl } from "../GameObject/CameraControl";


class GameScene implements Scene
{
    private game_: Game; //if a function that all scenes need, put it in "Game" and use this reference to access it
    private gom_: GameobjectManager;
    private pm_: PuzzleManager | undefined;
    private bm_: ButtonManager;

    constructor(game: Game) 
    {
        //defaults, just to initialize
        this.game_ = game;
        this.gom_ = new GameobjectManager();
        this.bm_ = new ButtonManager();
    }

    public Init() 
    {
        //this.Add(new Background("Background", "Background", 0, new Vector(-32, -32), new Vector(32*11, 32*11), "#888888"));
        this.Add(new CameraControl("CameraControl", "CC", 0, new Vector(9*32/2, 9*32/2), this.game_.CAMERA));
        this.pm_ = new PuzzleManager(this, this.game_.STATS, this.game_.CAMERA);

        this.bm_.Init(); //button init
        this.bm_.Add(new UITransitionButton(this, new Vector(0, 0), new Vector(32, 32), "Button_Return.png", "Menu"));
    }
    
    public Update(delta_time: number)
    {
        this.gom_.RemoveDead(); //delete dead objects
        this.gom_.Update(delta_time);
    }

    public Draw(layers: Layers)
    {
        // this.gom_.Draw(main_ctx);
        // this.gom_.DelayedDraw(main_ctx);
        this.gom_.DrawWithCulling(layers, this.game_.CAMERA); //First Draw
        this.bm_.Draw(layers);
        //this.gom_.DelayedDrawWithCulling(layers, this.game_.CAMERA); //Second draw (for things that should be above other objects - I.E. Player)
        // if (this.game_.CAMERA.UI_CANVAS.CONTEXT !== null) 
        // {//third draw - UI stuff - drawn on a seperate canvas (held within the camera class)
        //     this.gom_.UIDraw(this.game_.CAMERA.UI_CANVAS.CONTEXT);
        //     this.bm_.UIDraw(this.game_.CAMERA.UI_CANVAS.CONTEXT);
        // }
        // this.game_.CAMERA.DrawUI(main_ctx); //then drawn on top of the main canvas
    }

    public ChangeScene(sceneName: string)
    {
        this.game_.ChangeScene(sceneName);
    }

    public Add(gameobject: Gameobject)
    {
        this.gom_.Add(gameobject);
    }

    public Search(name: string, tag: string, ID: number)
    {
        return this.gom_.Search(name, tag, ID);
    }

    public SearchByName(name: string) : Gameobject | null
    {
        return this.gom_.SearchByName(name);
    }

    public SearchByTag(tag: string) : Gameobject | null
    {
        return this.gom_.SearchByTag(tag);
    }

    public SearchByID(ID: number) : Gameobject | null
    {
        return this.gom_.SearchByID(ID);
    }

    public End()
    {
        this.gom_.Clear(); //remove objects
        this.bm_.Clear(); //remove buttons
    }
}

export {GameScene};