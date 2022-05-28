import { Scene } from "./Scene";
import { Game } from "../Main/Game";
import { Vector } from "../Main/Vector";
import { Layers } from "../Main/Layers";
//Buttons
import { ButtonManager } from "../Button/ButtonManager";
import { TransitionButton } from "../Button/TransitionButton";
import { UpdateStatButton } from "../Button/UpdateStatButton";
import { UpdateMonsterNumberButton } from "../Button/UpdateMonsterNumberButton";
//Gameobjects
import { GameobjectManager } from "../GameObject/GameobjectManager";
import { Gameobject } from "../GameObject/Gameobject";
import { Background } from "../GameObject/Background";
import { NumberObject } from "../GameObject/NumberObject";


class MenuScene implements Scene
{
    private game_: Game; //if a function that all scenes need, put it in "Game" and use this reference to access it
    private gom_: GameobjectManager;
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
        this.game_.CAMERA.CENTER = new Vector(480/2, 270/2); //set camera target
        this.bm_.Init(); //button init
        
        //GameObjects
        this.Add(new Background("Background", "Background", 0, new Vector(0, 0), new Vector(480, 270), "#888888"));
        //Text
        const rows: NumberObject = new NumberObject(this.game_.STATS.ROWS, new Vector(224, 96));
        this.Add(rows);
        const columns: NumberObject = new NumberObject(this.game_.STATS.COLUMNS, new Vector(224, 128));
        this.Add(columns);
        const monsters: NumberObject = new NumberObject(this.game_.STATS.MONSTER_NUM, new Vector(224, 160));
        this.Add(monsters);

        //Buttons
        this.bm_.Add(new TransitionButton(this, new Vector(208, 64), new Vector(64, 32), "Button_Start.png", "Game"));
        this.bm_.Add(new UpdateStatButton(this.game_.STATS, new Vector(272, 96), new Vector(32, 32), "Button_Plus.png", "Rows", 1, 1, 100, rows));
        this.bm_.Add(new UpdateStatButton(this.game_.STATS, new Vector(176, 96), new Vector(32, 32), "Button_Minus.png", "Rows", -1, 1, 100, rows));
        this.bm_.Add(new UpdateStatButton(this.game_.STATS, new Vector(272, 128), new Vector(32, 32), "Button_Plus.png", "Columns", 1, 1, 100, columns));
        this.bm_.Add(new UpdateStatButton(this.game_.STATS, new Vector(176, 128), new Vector(32, 32), "Button_Minus.png", "Columns", -1, 1, 100, columns));
        this.bm_.Add(new UpdateMonsterNumberButton(this.game_.STATS, new Vector(272, 160), new Vector(32, 32), "Button_Plus.png", "MonsterNumber", 1, monsters));
        this.bm_.Add(new UpdateMonsterNumberButton(this.game_.STATS, new Vector(176, 160), new Vector(32, 32), "Button_Minus.png", "MonsterNumber", -1, monsters));
    }
    
    public Update(delta_time: number)
    {
        this.gom_.RemoveDead(); //delete dead objects
        this.gom_.Update(delta_time);
    }

    public Draw(layers: Layers)
    {
        this.gom_.Draw(layers);
        this.bm_.Draw(layers);
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

    public SearchByTagAndID(tag: string, ID: number) : Gameobject | null
    {
        return this.gom_.SearchByTagAndID(tag, ID);
    }

    public End()
    {
        this.gom_.Clear(); //remove objects
        this.bm_.Clear();
    }
}

export {MenuScene};