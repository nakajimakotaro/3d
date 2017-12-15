import math = require("mathjs");
import Matrix = mathjs.Matrix;

export class GameMatrix {
    /**
     * 移動
     * @param inMatrix 回転する座標の行列
     * @param t 移動距離
     */
    static transform(inMatrix: Matrix, t: { x: number, y: number, z: number }) {
        const tsMatrix = math.matrix([
            [1, 0, 0, t.x],
            [0, 1, 0, t.y],
            [0, 0, 1, t.z],
            [0, 0, 0, 1],
        ]);
        return math.multiply(tsMatrix, inMatrix);
    }

    /**
     * 拡大する
     * @param inMatrix 回転する座標の行列
     * @param scale 拡大する倍数
     * @param axis ここを原点とする
     */
    static scale(inMatrix: Matrix, scale: { sx: number, sy: number, sz: number }, axis: { x: number, y: number, z: number } = {
        x: 0,
        y: 0,
        z: 0
    }) {
        const scMatrix = math.matrix([
            [scale.sx, 0, 0, 0],
            [0, scale.sy, 0, 0],
            [0, 0, scale.sz, 0],
            [0, 0, 0, 1],
        ]);
        return GameMatrix.dotMatrix(scMatrix, inMatrix, axis);
    }

    /**
     * X軸を中心に回転する
     * @param inMatrix 回転する座標の行列
     * @param x 回転する角度(ラジアン)
     * @param axis ここを原点とする
     */
    static rotateX(inMatrix: Matrix, x: number, axis: { x: number, y: number, z: number } = {x: 0, y: 0, z: 0}) {
        const roXMatrix = math.matrix([
            [1, 0, 0, 0],
            [0, Math.cos(x), -Math.sin(x), 0],
            [0, Math.sin(x), Math.cos(x), 0],
            [0, 0, 0, 1],
        ]);
        return GameMatrix.dotMatrix(roXMatrix, inMatrix, axis);
    }

    /**
     * Y軸を中心に回転する
     * @param inMatrix 回転する座標の行列
     * @param y 回転する角度(ラジアン)
     * @param axis ここを原点とする
     */
    static rotateY(inMatrix: Matrix, y: number, axis: { x: number, y: number, z: number } = {x: 0, y: 0, z: 0}) {
        const roYMatrix = math.matrix([
            [Math.cos(y), 0, Math.sin(y), 0],
            [0, 1, 0, 0],
            [-Math.sin(y), 0, Math.cos(y), 0],
            [0, 0, 0, 1],
        ]);
        return GameMatrix.dotMatrix(roYMatrix, inMatrix, axis);
    }

    /**
     * 内積を取る
     * axisを指定すると一度matrixからaxisを引き、inCalcMatrixとinMatrixの内積を計算したあとaxisを足す
     * @param aMatrix 最初の引数
     * @param bMatrix 次の引数
     * @param axis ここを原点とする
     */
    private static dotMatrix(aMatrix: Matrix, bMatrix: Matrix, axis: { x: number, y: number, z: number } = {
        x: 0,
        y: 0,
        z: 0
    }) {
        let resultMatrix = bMatrix.clone();
        const goOriginMatrix = {x: -axis.x, y: -axis.y, z: -axis.z};
        const goBeforeMatrix = axis;
        resultMatrix = GameMatrix.transform(resultMatrix, goOriginMatrix);
        resultMatrix = math.multiply(aMatrix, resultMatrix);
        resultMatrix = GameMatrix.transform(resultMatrix, goBeforeMatrix);
        return resultMatrix;
    }
}


