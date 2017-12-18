import {Input} from "./input";
import {Presentation} from "./presentation";
import {Controller} from "./controller";
import {GameManager} from "./gameManager";

export class Game {
    input: Input;
    controller: Controller;
    gameManager: GameManager;
    view: Presentation;

    init() {
        this.input = new Input(document.body);

        this.gameManager = new GameManager();
        this.gameManager.init(this);

        this.view = new Presentation();
        this.view.init();

        this.controller = new Controller(this);
        this.controller.init();
    }

    loop() {
        this.controller.update();
        this.view.clear();
        this.view.update();

        this.gameManager.update();
        setTimeout(() => {
            this.loop()
        }, 1000 / 20);
    }
}
