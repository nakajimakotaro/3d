import {Triangle} from "./triangle";
import {Input} from "./input";
import {Presentation} from "./presentation";

export class ZDepth {
    depthIMage: number[][];
    private input: Input;

    constructor() {
        this.depthIMage = new Array(800);
        for (let i = 0; i < 800; i++) {
            this.depthIMage[i] = new Array(600);
            this.depthIMage[i].fill(Infinity);
        }
        this.input = new Input(document.getElementById("canvas")!);
    }

    write(x: number, y: number, z: number) {
        if (this.mask(x, y, z)) {
            this.depthIMage[x][y] = z;
        }
    }

    mask(x: number, y: number, z: number) {
        return this.depthIMage[x][y] > z;
    }

    clear() {
        for (let i = 0; i < 800; i++) {
            this.depthIMage[i].fill(Infinity);
        }
    }
}