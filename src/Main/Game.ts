import { Camera } from "./Camera";
import { Stats } from "./Stats";
import { Layers } from "./Layers";
//Scenes
import { Scene } from "../Scene/Scene";
import { GameScene } from "../Scene/GameScene";
import { MenuScene } from "../Scene/MenuScene";

class Game
{
    private camera_: Camera;
    private stats_: Stats;
    private currentScene_: string;
    private scenes_: Map<string, Scene>;

    constructor(camera: Camera)
    {
        this.camera_ = camera;
        this.stats_ = new Stats(9, 9, 10);

        this.currentScene_ = "Menu";
        this.scenes_ = new Map<string, Scene>();
        this.SetScenes();
        this.ChangeScene(this.currentScene_);
    }

    private SetScenes()
    {
        this.scenes_.set("Menu", new MenuScene(this));
        this.scenes_.set("Game", new GameScene(this));
    }

    public ChangeScene(sceneName: string)
    {
        this.scenes_.get(this.currentScene_)?.End();
        this.currentScene_ = sceneName;
        this.scenes_.get(this.currentScene_)?.Init();
    }

    public Update(delta_time: number) 
    {
        this.scenes_.get(this.currentScene_)?.Update(delta_time);
    }

    public Draw(layers: Layers)
    {
        this.scenes_.get(this.currentScene_)?.Draw(layers);
    }

    public get CAMERA(): Camera {return this.camera_;}
    public get STATS(): Stats {return this.stats_;}
}

export {Game};