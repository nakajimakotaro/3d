import math = require("mathjs");
import Matrix = mathjs.Matrix;
import {GameMatrix} from "./gameMatrix";

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

    clone() {
        return new Triangle(this.p0, this.p1, this.p2);
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


    //3つある三角形の内、真ん中の点でx軸と並行に切り2の三角形を作る
    //三角形の並びはp0が飛び出していて
    //p1とp2がx軸と並行
    //入力はy軸でソート済みでなければならない
    twinSplit() {
        const q = [
            this.p0x + (this.p1y - this.p0y) / (this.p2y - this.p0y) * (this.p2x - this.p0x),
            this.p1y,
            0
        ];
        return [
            new Triangle(this.p0, this.p1, q),
            new Triangle(this.p2, this.p1, q)];
    }

    //matrixのy軸でのソート
    ySort(): Triangle {
        while (true) {
            let isSwap = false;
            //三角形の座標の数は3つ
            for (let i = 0; i < 3 - 1; i++) {
                if (this.points.get([1, i]) > this.points.get([1, i + 1])) {
                    const tempX = this.points.get([0, i + 1]);
                    const tempY = this.points.get([1, i + 1]);
                    const tempZ = this.points.get([2, i + 1]);
                    this.points.set([0, i + 1], this.points.get([0, i]));
                    this.points.set([1, i + 1], this.points.get([1, i]));
                    this.points.set([2, i + 1], this.points.get([2, i]));
                    this.points.set([0, i], tempX);
                    this.points.set([1, i], tempY);
                    this.points.set([2, i], tempZ);
                    isSwap = true;
                }
            }
            if (!isSwap) {
                break;
            }
        }
        return this;
    }

    //重心の座標を返す
    private center() {
        return {
            x: (this.points.get([0, 0]) + this.points.get([0, 1]) + this.points.get([0, 2])) / 3,
            y: (this.points.get([1, 0]) + this.points.get([1, 1]) + this.points.get([1, 2])) / 3,
            z: (this.points.get([2, 0]) + this.points.get([2, 1]) + this.points.get([2, 2])) / 3,
        };
    }

    /**
     * 移動
     * @param t 移動距離
     */
    transform(t: { x: number, y: number, z: number }) {
        this.points = GameMatrix.transform(this.points, t);
    }

    /**
     * 拡大する
     * @param scale 拡大する倍数
     * @param axis ここを原点とする
     */
    scale(scale: { sx: number, sy: number, sz: number }, axis: { x: number, y: number, z: number } = this.center()) {
        this.points = GameMatrix.scale(this.points, scale, axis);
    }

    /**
     * X軸を中心に回転する
     * @param x 回転する角度(ラジアン)
     * @param axis ここを原点とする
     */
    rotateX(x: number, axis: { x: number, y: number, z: number } = this.center()) {
        this.points = GameMatrix.rotateX(this.points, x, axis);
    }

    /**
     * Y軸を中心に回転する
     * @param y 回転する角度(ラジアン)
     * @param axis ここを原点とする
     */
    rotateY(y: number, axis: { x: number, y: number, z: number } = this.center()) {
        this.points = GameMatrix.rotateY(this.points, y, axis);
    }
}
