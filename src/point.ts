import math = require("mathjs");
import Matrix = mathjs.Matrix;
import {GameMatrix} from "./gameMatrix";

export class Point4 {
    matrix: Matrix;

    get x() {
        return this.matrix.get([0]);
    }

    get y() {
        return this.matrix.get([1]);
    }
    get z() {
        return this.matrix.get([2]);
    }
    get w() {
        return this.matrix.get([3]);
    }

    set x(num:number) {
        this.matrix.set([0], num);
    }
    set y(num:number) {
        this.matrix.set([1], num);
    }
    set z(num:number) {
        this.matrix.set([2], num);
    }
    set w(num:number) {
        this.matrix.set([3], num);
    }

    clone() {
        return new Point4(this.x, this.y, this.z);
    }

    constructor(x: number, y: number, z: number, w:number = 1) {
        this.matrix = math.matrix([4]);
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = 1;
    }
    /**
     * 移動
     * @param t 移動距離
     */
    transform(t: { x: number, y: number, z: number }) {
        this.matrix = GameMatrix.transform(this.matrix, t);
    }

    /**
     * 拡大する
     * @param scale 拡大する倍数
     * @param axis ここを原点とする
     */
    scale(scale: { sx: number, sy: number, sz: number }, axis: { x: number, y: number, z: number }) {
        this.matrix = GameMatrix.scale(this.matrix, scale, axis);
    }

    /**
     * X軸を中心に回転する
     * @param x 回転する角度(ラジアン)
     * @param axis ここを原点とする
     */
    rotateX(x: number, axis: { x: number, y: number, z: number }) {
        this.matrix = GameMatrix.rotateX(this.matrix, x, axis);
    }

    /**
     * Y軸を中心に回転する
     * @param y 回転する角度(ラジアン)
     * @param axis ここを原点とする
     */
    rotateY(y: number, axis: { x: number, y: number, z: number }) {
        this.matrix = GameMatrix.rotateY(this.matrix, y, axis);
    }
}