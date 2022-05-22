import { Vector } from "../Main/Vector";
import { Quad } from "../Main/Quad";

class Gameobject
{
    //Common data
    protected name_: string = ""; //for identifying object
    protected tag_: string = ""; //for identifying object
    protected ID_: number = 0; //for identifying object
    protected position_: Vector = new Vector(0, 0); //object world position (x, y)
    protected width_: number = 0; //width of the object (image width)
    protected height_: number = 0; //height of the object (image height)
    //Hitbox
    private left_: number = 0; //this + position.x = the left edge of the hitbox
    private right_: number = 0; //position.x + width - this = the right edge of the hitbox
    private top_: number = 0; //this + position.y = the top edge of the hitbox
    private bottom_: number = 0; //position.y + height - this = the bottom edge of the hitbox
    //Allow Collision flag
    private allowCollisions_: boolean = false; //set to true if the object should be included in collision calcs
    //Allow Culling Flag
    private allowCulling_: boolean = true; //set to false to force the object to be drawn, even if the camera is not focused on it
    //Death flag
    private isDead_: boolean = false; //set to true for it to be removed when GameManager.RemoveDead() is called

    public Update(delta_time: number) {}
    public Draw(main_ctx: CanvasRenderingContext2D) {}
    public DelayedDraw(main_ctx: CanvasRenderingContext2D) {}
    public UIDraw(camera_ctx: CanvasRenderingContext2D) {}
    public Hitbox(): Quad {return new Quad(this.position_.x + this.left_, this.position_.y + this.top_, 
        this.width_ - this.right_, this.height_ - this.bottom_);}
    public OnCollision(other: Gameobject) {}
    public Kill() {this.isDead_ = true;}
    public Deconstructor() {}

    public set NAME(name: string) {this.name_ = name;}
    public get NAME(): string {return this.name_;}
    public set TAG(tag: string) {this.tag_ = tag;}
    public get TAG(): string {return this.tag_;}
    public set ID(ID: number) {this.ID_ = ID;}
    public get ID(): number {return this.ID_;}
    public set WIDTH(width: number) {this.width_ = width;}
    public get WIDTH(): number {return this.width_;}
    public set HEIGHT(height: number) {this.height_ = height;}
    public get HEIGHT(): number {return this.height_;}
    public set POSITION(position: Vector) {this.position_ = position;}
    public get POSITION(): Vector {return this.position_;}
    public set DEAD(isDead: boolean) {this.isDead_ = isDead;}
    public get DEAD(): boolean {return this.isDead_;}
    public set LEFT(left: number) {this.left_ = left;}
    public get LEFT(): number {return this.left_;}
    public set RIGHT(right: number) {this.right_ = right;}
    public get RIGHT(): number {return this.right_;}
    public set TOP(top: number) {this.top_ = top;}
    public get TOP(): number {return this.top_;}
    public set BOTTOM(bottom: number) {this.bottom_ = bottom;}
    public get BOTTOM(): number {return this.bottom_;}
    public set ALLOWCOLLISIONS(allowCollisions: boolean) {this.allowCollisions_ = allowCollisions;}
    public get ALLOWCOLLISIONS(): boolean {return this.allowCollisions_;}
    public set ALLOWCULLING(allowCulling: boolean) {this.allowCulling_ = allowCulling;}
    public get ALLOWCULLING(): boolean {return this.allowCulling_;}
}

export {Gameobject};