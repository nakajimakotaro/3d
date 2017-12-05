import {Game} from "./game";
import {Triangle} from "./triangle";
import {GameObject} from "./gameObject";

export class GameManager {
    private game: Game;
    private objectList: GameObject;

    init(game: Game) {
        this.game = game;
    }

    update() {
        //棒が突き出るバグ
        //const triangle = new Triangle([0, 0, 0], [0, 100, 0], [100, 50, 0]);
        //triangle.rotate(0.4);
        const triangle = new Triangle([0, 0, 0], [0, 200, 0], [100, 50, 0]);
        triangle.transform(100, 100, 0);
        triangle.rotate(0.4);
        this.game.view.draw(triangle, "rgb(255, 0, 0)");
    }
}