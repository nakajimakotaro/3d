import math = require("mathjs");
import Matrix = mathjs.Matrix;
import {GameMatrix} from "./gameMatrix";
import {Point4} from "./point";

export class Camera {
    public point: Point4;

    constructor() {
        this.point = new Point4(0, 0, 0, 1);
    }

    toFace(point:Point4) {
        const targetX = point.x - this.point[0].x;
        const targetY = point.y - this.point[1].y;
        const targetZ = point.z - this.point[2].z;
        const xzDistance = Math.sqrt(targetX * targetX + targetZ * targetZ);

        const ax = Math.atan2(targetY, xzDistance);
        const ay = Math.atan2(targetX, targetZ);
        return {x: ax, y: ay, z: 0};
    }

    move(t: { x: number, y: number, z: number }) {
        this.point.transform(t);
    }
}
