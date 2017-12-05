import {Game} from "./game";

export abstract class GameObject {
    constructor(protected game: Game) {

    }

    init() {
    };

    update() {
    };
}
