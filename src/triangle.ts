import math = require("mathjs");
import Matrix = mathjs.Matrix;

export class Triangle {
    points: Matrix;

    get p0x() {
        return this.points.get([0, 0]);
    }

    get p0y() {
        return this.points.get([1, 0]);
    }

    get p0z() {
        return this.points.get([2, 0]);
    }

    get p1x() {
        return this.points.get([0, 1]);
    }

    get p1y() {
        return this.points.get([1, 1]);
    }

    get p1z() {
        return this.points.get([2, 1]);
    }

    get p2x() {
        return this.points.get([0, 2]);
    }

    get p2y() {
        return this.points.get([1, 2]);
    }

    get p2z() {
        return this.points.get([2, 2]);
    }

    set p0x(num: number) {
        this.points.set([0, 0], num);
    }

    set p0y(num: number) {
        this.points.set([1, 0], num);
    }

    set p0z(num: number) {
        this.points.set([2, 0], num);
    }

    set p1x(num: number) {
        this.points.set([0, 1], num);
    }

    set p1y(num: number) {
        this.points.set([1, 1], num);
    }

    set p1z(num: number) {
        this.points.set([2, 1], num);
    }

    set p2x(num: number) {
        this.points.set([0, 2], num);
    }

    set p2y(num: number) {
        this.points.set([1, 2], num);
    }

    set p2z(num: number) {
        this.points.set([2, 2], num);
    }

    get p0() {
        return [this.p0x, this.p0y, this.p0z];
    }

    get p1() {
        return [this.p1x, this.p1y, this.p1z];
    }

    get p2() {
        return [this.p2x, this.p2y, this.p2z];
    }

    constructor(p1: number[], p2: number[], p3: number[]) {
        if (p1.length != 3 || p2.length != 3 || p3.length != 3) {
            throw new Error("エラー");
        }
        this.points = math.matrix([
            [p1[0], p2[0], p3[0]],
            [p1[1], p2[1], p3[1]],
            [p1[2], p2[2], p3[2]],
            [1, 1, 1],
        ]);
    }

    center() {
        return math.matrix([
            [1, 0, 0, (this.points.get([0, 0]) + this.points.get([0, 1]) + this.points.get([0, 2])) / 3],
            [0, 1, 0, (this.points.get([1, 0]) + this.points.get([1, 1]) + this.points.get([1, 2])) / 3],
            [0, 0, 1, (this.points.get([2, 0]) + this.points.get([2, 1]) + this.points.get([2, 2])) / 3],
            [0, 0, 0, 1],
        ]);
    }

    transform(tx: number, ty: number, tz: number) {
        const tsMatrix = math.matrix([
            [1, 0, 0, tx],
            [0, 1, 0, ty],
            [0, 0, 1, tz],
            [0, 0, 0, 1],
        ]);
        this.points = math.multiply(tsMatrix, this.points);
    }

    scale(sx: number, sy: number, sz: number) {
        const scMatrix = math.matrix([
            [sx, 0, 0, 0],
            [0, sy, 0, 0],
            [0, 0, sz, 0],
            [0, 0, 0, 1],
        ]);
        const goOriginMatrix = this.center().map((value, index) => {
            if ((index[0] != 3 && index[1] == 3)) {
                return value * -1;
            }
            return value;
        });
        const goBeforeMatrix = this.center();
        this.points = math.multiply(goOriginMatrix, this.points);
        this.points = math.multiply(scMatrix, this.points);
        this.points = math.multiply(goBeforeMatrix, this.points);
    }

    rotate(angle: number) {
        const roMatrix = math.matrix([
            [Math.cos(angle), -Math.sin(angle), 0, 0],
            [Math.sin(angle), Math.cos(angle), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ]);
        const goOriginMatrix = this.center().map((value, index) => {
            if ((index[0] != 3 && index[1] == 3)) {
                return value * -1;
            }
            return value;
        });
        const goBeforeMatrix = this.center();
        this.points = math.multiply(goOriginMatrix, this.points);
        this.points = math.multiply(roMatrix, this.points);
        this.points = math.multiply(goBeforeMatrix, this.points);
    }
}
