import {Game} from "./game";
import {Triangle} from "./triangle";
import {GameObject} from "./gameObject";
import {Point4} from "./point";

export class GameManager {
    private game: Game;
    private objectList: GameObject;

    init(game: Game) {
        this.game = game;
    }

    private count = 0;
    update() {
        //棒が突き出るバグ
        //const triangle = new Triangle([0, 0, 0], [0, 100, 0], [100, 50, 0]);
        //triangle.rotate(0.4);
        const triangle = new Triangle(new Point4(0, 0, 0), new Point4(0, 200, 0), new Point4(100, 50, 0));
        triangle.transform({x: 200, y: 200, z: -1});
        triangle.scale({sx: 2, sy: 2, sz: 2});
        triangle.rotateY(this.count / 7);
        triangle.rotateX(0);
        this.game.view.draw(triangle, "rgb(255, 0, 0)");

        this.count += 1;
        const triangle2 = new Triangle(new Point4(100, 0, 0), new Point4(100, 200, 0), new Point4(200, 20, 0));
        triangle2.transform({x: 120, y: 150, z: -1});
        triangle2.scale({sx: 2, sy: 2, sz: 2});
        triangle2.rotateY(1);
        triangle2.rotateX(0);
        this.game.view.draw(triangle2, "rgb(0, 0, 255)");
    }
}