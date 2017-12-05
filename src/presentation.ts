import math = require("mathjs");
import Matrix = mathjs.Matrix;
import {Triangle} from "./triangle";

export class Presentation {
    private context: CanvasRenderingContext2D;
    private cameraOffset: Matrix;

    init() {
        this.cameraOffset = math.eye(4, 4);
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.context = canvas.getContext("2d")!;
        this.clear();
    }

    clear() {
        this.context.beginPath();
        this.context.fillStyle = 'rgb(0, 0, 0)';
        this.context.rect(0, 0, 800, 600);
        this.context.closePath();
        this.context.fill();
    }

    moveCamera(x: number, y: number, z: number) {
        this.cameraOffset.set([0, 3], this.cameraOffset.get([0, 3]) + x);
        this.cameraOffset.set([1, 3], this.cameraOffset.get([1, 3]) + y);
        this.cameraOffset.set([2, 3], this.cameraOffset.get([2, 3]) + z);
    }

    draw(triangle: Triangle, color: string) {
        this.context.fillStyle = color;
        triangle.points = math.multiply(this.cameraOffset, triangle.points);
        this.context.beginPath();

        this.rasterise(triangle);
        this.context.closePath();
        this.context.fill();
    }

    //matrixのy軸でのソート
    static ySort(matrix: Matrix): void {
        while (true) {
            let isSwap = false;
            //三角形の座標の数は3つ
            for (let i = 0; i < 3 - 1; i++) {
                if (matrix.get([1, i]) > matrix.get([1, i + 1])) {
                    const tempX = matrix.get([0, i + 1]);
                    const tempY = matrix.get([1, i + 1]);
                    const tempZ = matrix.get([2, i + 1]);
                    matrix.set([0, i + 1], matrix.get([0, i]));
                    matrix.set([1, i + 1], matrix.get([1, i]));
                    matrix.set([2, i + 1], matrix.get([2, i]));
                    matrix.set([0, i], tempX);
                    matrix.set([1, i], tempY);
                    matrix.set([2, i], tempZ);
                    isSwap = true;
                }
            }
            if (!isSwap) {
                break;
            }
        }
        return;
    }

    rasterise(triangle: Triangle) {
        Presentation.ySort(triangle.points);
        const twinTriangle = Presentation.triangleSplit(triangle);
        for (let i = 0; i < 2; i++) {
            const bottom = Math.floor(Math.max(twinTriangle[i].p0y, twinTriangle[i].p1y));
            const top = Math.floor(Math.min(twinTriangle[i].p0y, twinTriangle[i].p1y));
            for (let y = top; y < bottom; y++) {
                const p1x = twinTriangle[i].p0x;
                const p1y = twinTriangle[i].p0y;
                //y軸は同じ
                const parallelp1x = Math.min(twinTriangle[i].p1x, twinTriangle[i].p2x);
                const parallelp1y = twinTriangle[i].p1y;
                const parallelp2x = Math.max(twinTriangle[i].p1x, twinTriangle[i].p2x);
                const parallelp2y = twinTriangle[i].p2y;

                const q1x = Math.floor(p1x - (p1y - y) / (p1y - parallelp1y) * (p1x - parallelp1x));
                const q2x = Math.floor(p1x - (p1y - y) / (p1y - parallelp2y) * (p1x - parallelp2x));

                this.context.fillStyle = "rgb(0, 255, 0)";
                this.context.beginPath();
                for (let cx = q1x; cx < q2x; cx++) {
                    this.context.rect(cx, y, 1, 1);
                }
                this.context.closePath();
                this.context.fill();
            }
        }
    }

    //3つある三角形の内、真ん中の点でx軸と並行に切り2の三角形を作る
    //三角形の並びはp0が飛び出していて
    //p1とp2がx軸と並行
    //入力はy軸でソート済みでなければならない
    static triangleSplit(triangle: Triangle) {
        const q = [
            triangle.p0x + (triangle.p1y - triangle.p0y) / (triangle.p2y - triangle.p0y) * (triangle.p2x - triangle.p0x),
            triangle.p1y,
            0
        ];
        return [
            new Triangle(triangle.p0, triangle.p1, q),
            new Triangle(triangle.p2, triangle.p1, q)];
    }
}
