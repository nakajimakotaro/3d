import math = require("mathjs");
import Matrix = mathjs.Matrix;
import {GameMatrix} from "./gameMatrix";

export class Camera {
    private pos: Matrix;

    constructor() {
        this.pos = math.matrix([0, 0, 0, 1]);
    }

    toFace(target: { x: number, y: number, z: number }) {
        const targetX = target.x - this.pos.get([0]);
        const targetY = target.y - this.pos.get([1]);
        const targetZ = target.z - this.pos.get([2]);
        const xzDistance = Math.sqrt(targetX * targetX + targetZ * targetZ);

        const ax = Math.atan2(targetY, xzDistance);
        const ay = Math.atan2(targetX, targetZ);
    }

    move(t: { x: number, y: number, z: number }) {
        this.pos = GameMatrix.transform(this.pos, t);
    }
}
