import math = require("mathjs");
import Matrix = mathjs.Matrix;
import {Triangle} from "./triangle";
import {Camera} from "./camera";
import {GameMatrix} from "./gameMatrix";
import {touchOptionsArray} from "shelljs";
import {ZDepth} from "./zdepth";

export class Presentation {
    private context: CanvasRenderingContext2D;
    private zDepth: ZDepth;
    private camera: Camera;

    init() {
        this.camera = new Camera();
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.context = canvas.getContext("2d")!;
        this.clear();
        this.zDepth = new ZDepth();
    }

    clear() {
        this.context.beginPath();
        this.context.fillStyle = 'rgb(0, 0, 0)';
        this.context.rect(0, 0, 800, 600);
        this.context.closePath();
        this.context.fill();
    }


    update() {
        this.zDepth.clear();
    }
    draw(inTriangle: Triangle, color: string) {
        let triangle = inTriangle.clone();

        triangle = Presentation.viewTransform(triangle);

        this.context.fillStyle = color;
        this.context.beginPath();

        this.rasterise(triangle);
        this.context.closePath();
        this.context.fill();
    }

    private const = 0;

    private static prespective(inTriangle: Triangle) {
        let triangle = inTriangle.clone();
        triangle.p0x = triangle.p0x / triangle.p0z;
        triangle.p0y = triangle.p0y / triangle.p0z;
        triangle.p1x = triangle.p1x / triangle.p1z;
        triangle.p1y = triangle.p1y / triangle.p1z;
        triangle.p2x = triangle.p2x / triangle.p2z;
        triangle.p2y = triangle.p2y / triangle.p2z;
        return triangle;

    }

    private static viewTransform(inTriangle: Triangle) {
        let triangle = inTriangle.clone();
        //triangle = Presentation.prespective(triangle);

        //this.const++;
        //const target = {x:0, y: 0, z:0};
        //const {x, y} = this.camera.toFace(target);
        //triangle.points = GameMatrix.rotateX(triangle.points, x, {x: 0, y: 0, z: 0});
        //triangle.points = GameMatrix.rotateY(triangle.points, y, {x: 0, y: 0, z: 0});
        return triangle;
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
        Presentation.progressInPixilUnit(triangle, (x, y) => {
            //重心座標系
            //http://tkengo.github.io/blog/2015/01/17/opengl-es-2-2d-knowledge-4/
            let area: number[] = new Array(3);
            for (let i = 0; i < 3; i++) {
                const currPoint = i;
                const nextPoint = i != 2 ? i + 1 : 0;
                const a = Math.hypot(
                    triangle.getPos(currPoint, "x") - triangle.getPos(nextPoint, "x"),
                    triangle.getPos(currPoint, "y") - triangle.getPos(nextPoint, "y"));
                const b = Math.hypot(
                    x - triangle.getPos(nextPoint, "x"),
                    y - triangle.getPos(nextPoint, "y"));
                const c = Math.hypot(
                    x - triangle.getPos(currPoint, "x"),
                    y - triangle.getPos(currPoint, "y"));
                const angle = Math.acos((a * a + b * b - c * c) / (2 * a * b));
                area[i] = Math.sin(angle) * a * b / 2;
            }
            const allArea = area.reduce((a, b) => a + b);
            const z = (area[2] / allArea) * triangle.p0z
                + (area[1] / allArea) * triangle.p1z
                + (area[0] / allArea) * triangle.p2z;
            if (this.zDepth.mask(x, y, z)) {
                this.context.rect(x, y, 1, 1);
            }
            this.zDepth.write(x, y, z);
        });
    }
}
