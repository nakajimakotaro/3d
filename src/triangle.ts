import math = require("mathjs");
import Matrix = mathjs.Matrix;
import {GameMatrix} from "./gameMatrix";
import {Point4} from "./point";

export class Triangle {
    points: Point4[];


    clone() {
        return new Triangle(this.points[0], this.points[1], this.points[2]);
    }

    constructor(p0: Point4, p1: Point4, p2: Point4) {
        this.points = [
            p0.clone(),
            p1.clone(),
            p2.clone(),
        ];
    }


    //3つある三角形の内、真ん中の点でx軸と並行に切り2の三角形を作る
    //三角形の並びはp0が飛び出していて
    //p1とp2がx軸と並行
    //入力はy軸でソート済みでなければならない
    twinSplit() {
        const q = new Point4(
            this.points[0].x + (this.points[1].y - this.points[0].y) / (this.points[2].y - this.points[0].y) * (this.points[2].x - this.points[0].x),
            this.points[1].y,
            0
        );
        return [
            new Triangle(this.points[0], this.points[1], q),
            new Triangle(this.points[2], this.points[1], q)
        ];
    }

    //matrixのy軸でのソート
    ySort(): Triangle {
        while (true) {
            let isSwap = false;
            //三角形の座標の数は3つ
            for (let i = 0; i < 3 - 1; i++) {
                if (this.points[i].y > this.points[i + 1].y) {
                    const tempX = this.points[i + 1].x;
                    const tempY = this.points[i + 1].y;
                    const tempZ = this.points[i + 1].z;
                    this.points[i + 1].x = this.points[i].x;
                    this.points[i + 1].y = this.points[i].y;
                    this.points[i + 1].z = this.points[i].z;
                    this.points[i].x = tempX;
                    this.points[i].y = tempY;
                    this.points[i].z = tempZ;
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
    center() {
        return {
            x: (this.points[0].x + this.points[1].x + this.points[2].x) / 3,
            y: (this.points[0].y + this.points[1].y + this.points[2].y) / 3,
            z: (this.points[0].z + this.points[1].z + this.points[2].z) / 3,
        };
    }

    /**
     * 移動
     * @param t 移動距離
     */
    transform(t: { x: number, y: number, z: number }) {
        this.points.forEach((e)=>e.transform(t));
    }

    /**
     * 拡大する
     * @param scale 拡大する倍数
     * @param axis ここを原点とする
     */
    scale(scale: { sx: number, sy: number, sz: number }, axis: { x: number, y: number, z: number } = this.center()) {
        this.points.forEach((e)=>e.scale(scale, axis));
    }

    /**
     * X軸を中心に回転する
     * @param x 回転する角度(ラジアン)
     * @param axis ここを原点とする
     */
    rotateX(x: number, axis: { x: number, y: number, z: number } = this.center()) {
        this.points.forEach((e)=>e.rotateX(x, axis));
    }

    /**
     * Y軸を中心に回転する
     * @param y 回転する角度(ラジアン)
     * @param axis ここを原点とする
     */
    rotateY(y: number, axis: { x: number, y: number, z: number } = this.center()) {
        this.points.forEach((e)=>e.rotateY(y, axis));
    }
}
