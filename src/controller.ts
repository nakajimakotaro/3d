import {GameObject} from "./gameObject";
import {Game} from "./game";

export class Controller extends GameObject {
    init() {
    }

    update() {
        if (this.game.input.isPush("w")) {
            //this.game.view.moveCamera(0, 1, 0);
        } else if (this.game.input.isPush("s")) {
            //this.game.view.moveCamera(0, -1, 0);
        } else if (this.game.input.isPush("a")) {
            //this.game.view.moveCamera(1, 0, 0);
        } else if (this.game.input.isPush("d")) {
            //this.game.view.moveCamera(-1, 0, 0);
        }
    }
}