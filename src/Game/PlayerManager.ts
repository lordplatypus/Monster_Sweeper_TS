import { Vector } from "../Main/Vector";
import { PuzzleManager } from "../Game/PuzzleManager";
import { UIHealthBar } from "../GameObject/UIHealthBar";

//Holds player information so that it is easier for other objects to access

class PlayerManager
{
    private HP_: UIHealthBar; //Player HP (also the UI for easy access)

    constructor(puzzleManager: PuzzleManager)
    {
        this.HP_ = new UIHealthBar(10, new Vector(16, puzzleManager.CAMERA.VIEWPORT.HEIGHT - 32));
        puzzleManager.SCENE.Add(this.HP_);
    }

    public get HP(): number {return this.HP_.HP;}
    public set HP(HP: number) {this.HP_.HP = HP;}
}

export { PlayerManager }