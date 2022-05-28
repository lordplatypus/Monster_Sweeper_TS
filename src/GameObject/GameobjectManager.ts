import { Gameobject } from "./Gameobject";
//import { Quad } from "../Main/Quad";
import { Camera } from "../Main/Camera";
import { Layers } from "../Main/Layers";

class GameobjectManager
{
    gameobjects_: Gameobject[];
    
    constructor()
    {
        this.gameobjects_ = [];
    }

    Update(delta_time: number)
    {//Update all gameobjects every frame
        for (var i = 0; i < this.gameobjects_.length; i++)
        {
            this.gameobjects_[i].Update(delta_time);
        }
    }

    Draw(layers: Layers)
    {//Regular draw phase
        for (var i = 0; i < this.gameobjects_.length; i++)
        {
            this.gameobjects_[i].Draw(layers);
        }
    }

    DrawWithCulling(layers: Layers, camera: Camera)
    {//draw objects only within the camera viewpoint  
        for (var i = 0; i < this.gameobjects_.length; i++)
        {
            if (this.gameobjects_[i].Hitbox().Intersect(camera.VIEWPORT) || !this.gameobjects_[i].ALLOWCULLING) this.gameobjects_[i].Draw(layers);  
        }
    }

    Add(object: Gameobject)
    {
        this.gameobjects_.push(object);
    }

    RemoveDead()
    {
        for (var i = 0; i < this.gameobjects_.length; )
        {
            if (this.gameobjects_[i].DEAD) 
            {
                this.gameobjects_[i].Deconstructor();
                delete this.gameobjects_[i];
                this.gameobjects_.splice(i, 1);
            }
            else i++;
        }
    }

    Search(name: string, tag: string, ID: number)
    {
        for (var i = 0; i < this.gameobjects_.length; i++)
        {
            if (this.gameobjects_[i].NAME === name && this.gameobjects_[i].TAG === tag && this.gameobjects_[i].ID === ID) return this.gameobjects_[i];
        }
        return null;
    }

    SearchByName(name: string): Gameobject | null
    {
        for (var i = 0; i < this.gameobjects_.length; i++)
        {
            if (this.gameobjects_[i].NAME === name) return this.gameobjects_[i];
        }
        return null;
    }

    SearchByTag(tag: string): Gameobject | null
    {
        for (var i = 0; i < this.gameobjects_.length; i++)
        {
            if (this.gameobjects_[i].TAG === tag) return this.gameobjects_[i];
        }
        return null;
    }

    SearchByID(ID: number): Gameobject | null
    {
        for (var i = 0; i < this.gameobjects_.length; i++)
        {
            if (this.gameobjects_[i].ID === ID) return this.gameobjects_[i];
        }
        return null;
    }

    SearchByTagAndID(tag: string, ID: number): Gameobject | null
    {
        for (var i = 0; i < this.gameobjects_.length; i++)
        {
            if (this.gameobjects_[i].TAG === tag && this.gameobjects_[i].ID === ID) return this.gameobjects_[i];
        }
        return null;
    }

    CheckCollision()
    {
        for (var i = 0; i < this.gameobjects_.length; i++)
        {
            if (!this.gameobjects_[i].ALLOWCOLLISIONS) continue; //ignore objects that don't have the "ALLOWCOLLISIONS" flag active
            if (this.gameobjects_[i].DEAD) continue; //ignore objects that are marked for deletion
            for (var j = 0; j < this.gameobjects_.length; j++)
            {
                if (!this.gameobjects_[j].ALLOWCOLLISIONS) continue; //ignore objects that don't have the "ALLOWCOLLISIONS" flag active
                if (this.gameobjects_[j].DEAD) continue; //ignore objects that are marked for deletion
                if (this.gameobjects_[i] === this.gameobjects_[j]) continue; //don't check collision against self
                if (this.gameobjects_[i].Hitbox().Intersect(this.gameobjects_[j].Hitbox()))
                {
                    this.gameobjects_[i].OnCollision(this.gameobjects_[j]);
                    this.gameobjects_[j].OnCollision(this.gameobjects_[i]);
                }
            }
        }
    }

    Clear()
    {
        for (var i = 0; i < this.gameobjects_.length; i++)
        {
            this.gameobjects_[i].Deconstructor();
        }
        this.gameobjects_ = [];
    }
}

export {GameobjectManager};