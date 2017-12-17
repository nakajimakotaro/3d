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
        triangle.transform({x: 200, y: 200, z: -1});
        triangle.scale({sx: 1, sy: 1, sz: 1});
        triangle.rotateY(this.count / 20);
        triangle.rotateX(0);
        this.game.view.draw(triangle, "rgb(255, 0, 0)");

        this.count += 1;
        const triangle2 = new Triangle([100, 0, 0], [100, 200, 0], [200, 50, 0]);
        triangle2.transform({x: 150, y: 150, z: -1});
        triangle2.scale({sx: 1, sy: 1, sz: 1});
        triangle2.rotateY(this.count / 30 - Math.PI);
        triangle2.rotateX(0);
        this.game.view.draw(triangle2, "rgb(0, 0, 255)");
    }
}