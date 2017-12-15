import {Game} from "./game";
import {Triangle} from "./triangle";
import {GameObject} from "./gameObject";

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
        const triangle = new Triangle([0, 0, 0], [0, 200, 0], [100, 50, 0]);
        triangle.transform({x: 100, y: 100, z: 0});
        triangle.scale({sx: 1, sy: 1, sz: 1});
        this.count++;
        triangle.rotateY(0);
        triangle.rotateX(this.count / 100);
        this.game.view.draw(triangle, "rgb(255, 0, 0)");
    }
}