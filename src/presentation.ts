import math = require("mathjs");
import Matrix = mathjs.Matrix;
import {Triangle} from "./triangle";
import {Camera} from "./camera";

export class Presentation {
    private context: CanvasRenderingContext2D;
    private camera: Camera;

    init() {
        this.camera = new Camera();
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


    draw(inTriangle: Triangle, color: string) {
        let triangle = inTriangle.clone();

        this.context.fillStyle = color;
        this.context.beginPath();

        this.rasterise(triangle);
        this.context.closePath();
        this.context.fill();
    }

    viewTransform() {
    }

    //ピクセル単位で実行
    static progressInPixilUnit(inTriangle: Triangle, progressFunc: (x: number, y: number) => void) {
        const twinTriangle = inTriangle.clone().ySort().twinSplit();
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
                for (let cx = q1x; cx < q2x; cx++) {
                    progressFunc(cx, y);
                }
            }
        }
    }

    rasterise(triangle: Triangle) {
        this.context.fillStyle = "rgb(0, 255, 0)";
        this.context.beginPath();
        Presentation.progressInPixilUnit(triangle, (x, y) => {
            this.context.rect(x, y, 1, 1);
        });
        this.context.closePath();
        this.context.fill();
    }
}
