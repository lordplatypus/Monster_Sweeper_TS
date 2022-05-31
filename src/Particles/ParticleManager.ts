import { Scene } from "../Scene/Scene"
import { Vector } from "../Main/Vector";
//Particles
import { ParticleImage } from "./ParticleImage";

class ParticleManager
{
    private scene_: Scene;

    constructor(scene: Scene)
    {  
        this.scene_ = scene;
    }

    public QuestionMark(position: Vector)
    {
        const vx = (Math.floor(Math.random() * 50) - 25);
        const vy = (-Math.floor(Math.random() * 20) - 50);
        const lifespan = (Math.floor(Math.random() * 4) + 7) / 10;
        //const angle = Math.floor(Math.random() * 30) + 30;
        const angleV = (Math.floor(Math.random() * 1000) - 500);

        this.scene_.Add(new ParticleImage("./QuestionMark.png", position,                           //required
                                            lifespan, 1,                                                    //progression
                                            new Vector(15, 30), new Vector(1, 1), new Vector(.5, .5),       //image size / scale
                                            new Vector(vx, vy), new Vector(0, 0), 1,                   //velocity / damp
                                            0, angleV, 1,                                          //angles
                                            1, 0, false));  //alpha, allow color
    }

    public Cloud(position: Vector)
    {
        const lifespan = (Math.floor(Math.random() * 10) + 10) / 10;
        const x: number = Math.floor(Math.random() * 26);
        const y: number = Math.floor(Math.random() * 8) + 2;
        const pos: Vector = new Vector(position.x + x, position.y + y);
        var vx: number;
        vx = (Math.floor(Math.random() * 5) + 5);
        if (x >= 13) vx = -vx;

        const randomCloud: number = Math.floor(Math.random() * 2);
        var imageSrc: string;
        var size: Vector;
        if (randomCloud === 0)
        {
            imageSrc = "Cloud1.png";
            size = new Vector(6, 3);
        }
        else
        {
            imageSrc = "Cloud2.png";
            size = new Vector(5, 3);
        }

        this.scene_.Add(new ParticleImage(imageSrc, pos,                           //required
                                            lifespan, 1,                                                    //progression
                                            size, new Vector(1, 1), new Vector(1, 1),       //image size / scale
                                            new Vector(vx, 0), new Vector(0, 0), 1,                   //velocity / damp
                                            0, 0, 1,                                          //angles
                                            1, 0, false));  //alpha, allow color
    }

    public Snow(position: Vector)
    {
        const lifespan = (Math.floor(Math.random() * 10) + 10) / 10;
        const x: number = Math.floor(Math.random() * 32) - 2;
        const y: number = Math.floor(Math.random() * 28) - 8;
        const pos: Vector = new Vector(position.x + x, position.y + y);
        const vx: number = Math.floor(Math.random() * 3);
        const vy: number = (Math.floor(Math.random() * 5) + 5);

        var imageSrc: string;
        var size: Vector = new Vector(3, 3);
        switch(Math.floor(Math.random() * 3))
        {
            default:
            imageSrc = "Snowflake.png";
            size = new Vector(7, 7);
            break;

            case 1:
            imageSrc = "Snow.png";
            break;

            case 2:
            imageSrc = "Snow2.png";
            break;
        }


        this.scene_.Add(new ParticleImage(imageSrc, pos,                           //required
                                            lifespan, 1,                                                    //progression
                                            size, new Vector(.5, .5), new Vector(.5, .5),       //image size / scale
                                            new Vector(vx, vy), new Vector(0, 0), 1,                   //velocity / damp
                                            0, 0, 1,                                          //angles
                                            1, 0, false));  //alpha, allow color
    }

    // public Sweat(position: Vector)
    // {
    //     const amount: number = Math.floor(Math.random() * 3) + 1;
    //     for (var i = 0; i < amount; i++)
    //     {
    //         const vx = (-Math.floor(Math.random() * 50) - 10);
    //         const vy = (Math.floor(Math.random() * 20) + 50);
    //         const lifespan = (Math.floor(Math.random() * 4) + 7) / 10;
    //         const angle = Math.floor(Math.random() * 30) + 30;
    //         const angleV = -Math.floor(Math.random() * 100);

    //         this.scene_.Add(new ParticleImage("./Kiara_Sweat.png", position,                           //required
    //                                           lifespan, 1,                                                    //progression
    //                                           new Vector(8, 11), new Vector(1, 1), new Vector(0, 0),       //image size / scale
    //                                           new Vector(vx, vy), new Vector(0, 0), 1,                   //velocity / damp
    //                                           angle, angleV, 1,                                          //angles
    //                                           1, 0, false));  //alpha, allow color
    //     }
    // }

    // public Money(position: Vector)
    // {
    //     const cashNum: number = Math.floor(Math.random() * 3) + 1;
    //     for (var i = 0; i < cashNum; i++)
    //     {
    //         const pos: Vector = new Vector(position.x + (Math.floor(Math.random() * 30) - 15), position.y + (Math.floor(Math.random() * 10) - 5));
    //         const vx = (Math.floor(Math.random() * 100) - 50);
    //         const vy = (-Math.floor(Math.random() * 50) - 50);
    //         const lifespan = (Math.floor(Math.random() * 10) + 20) / 10;
    //         const angle = Math.floor(Math.random() * 720) + 360;
    //         const angleV = (Math.floor(Math.random() * 500) - 250);

    //         this.scene_.Add(new ParticleImage("./Kiara_Cash.png", pos,                           //required
    //                                           lifespan, 1,                                                    //progression
    //                                           new Vector(20, 10), new Vector(1, 1), new Vector(1, 1),       //image size / scale
    //                                           new Vector(vx, vy), new Vector(0, 100), 1,                   //velocity / damp
    //                                           angle, angleV, 1,                                          //angles
    //                                           1, 0, false));  //alpha, allow color
    //     }
    //     const silverNum: number = Math.floor(Math.random() * 3) + 1;
    //     for (var i = 0; i < silverNum; i++)
    //     {
    //         const pos: Vector = new Vector(position.x + (Math.floor(Math.random() * 30) - 15), position.y + (Math.floor(Math.random() * 10) - 5));
    //         const vx = (Math.floor(Math.random() * 100) - 50);
    //         const vy = (-Math.floor(Math.random() * 50) - 50);
    //         const lifespan = (Math.floor(Math.random() * 10) + 20) / 10;
    //         const angle = Math.floor(Math.random() * 720) + 360;
    //         const angleV = (Math.floor(Math.random() * 500) - 250);

    //         this.scene_.Add(new ParticleImage("./Kiara_Silver_Coin.png", pos,                           //required
    //                                           lifespan, 1,                                                    //progression
    //                                           new Vector(3, 3), new Vector(1, 1), new Vector(1, 1),       //image size / scale
    //                                           new Vector(vx, vy), new Vector(0, 100), 1,                   //velocity / damp
    //                                           angle, angleV, 1,                                          //angles
    //                                           1, 0, false));  //alpha, allow color
    //     }
    //     const bronzeNum: number = Math.floor(Math.random() * 3) + 1;
    //     for (var i = 0; i < bronzeNum; i++)
    //     {
    //         const pos: Vector = new Vector(position.x + (Math.floor(Math.random() * 30) - 15), position.y + (Math.floor(Math.random() * 10) - 5));
    //         const vx = (Math.floor(Math.random() * 100) - 50);
    //         const vy = (-Math.floor(Math.random() * 50) - 50);
    //         const lifespan = (Math.floor(Math.random() * 10) + 20) / 10;
    //         const angle = Math.floor(Math.random() * 720) + 360;
    //         const angleV = (Math.floor(Math.random() * 500) - 250);

    //         this.scene_.Add(new ParticleImage("./Kiara_Bronze_Coin.png", pos,                           //required
    //                                           lifespan, 1,                                                    //progression
    //                                           new Vector(3, 3), new Vector(1, 1), new Vector(1, 1),       //image size / scale
    //                                           new Vector(vx, vy), new Vector(0, 100), 1,                   //velocity / damp
    //                                           angle, angleV, 1,                                          //angles
    //                                           1, 0, false));  //alpha, allow color
    //     }
    // }
}

export {ParticleManager};