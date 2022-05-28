import { Gameobject } from "../GameObject/Gameobject";
import { Layers } from "../Main/Layers";

interface Scene
{
    Init() : void;
    Update(delta_time: number) : void;
    Draw(layers: Layers) : void;
    ChangeScene(sceneName: string) : void;
    Add(gameobject: Gameobject) : void;
    Search(name: string, tag: string, ID: number) : Gameobject | null;
    SearchByName(name: string) : Gameobject | null;
    SearchByTag(tag: string) : Gameobject | null;
    SearchByID(ID: number) : Gameobject | null;
    SearchByTagAndID(tag: string, ID: number) : Gameobject | null;
    End() : void;
}

export {Scene};