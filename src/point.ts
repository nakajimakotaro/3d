import Matrix = mathjs.Matrix;

export class Point3 {
    point: Matrix;

    get x() {
        return this.points.get([0]);
    }

    get y() {
        return this.points.get([1]);
    }

    get z() {
        return this.points.get([2]);
    }

    clone() {
        return new Point3(this.point.clone());
    }

    constructor(x: number, y: number, z: number) {
       
    }
}