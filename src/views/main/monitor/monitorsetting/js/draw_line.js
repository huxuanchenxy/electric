
import Konva from 'konva'
import * as geometric from 'geometric'
class DrawLine {
    #stage;
    // drawingLine;
    #layer
    #layerArea
    constructor(stage) {
        this.#stage = stage
        this.#layer = new Konva.Layer();
        this.#layerArea = new Konva.Layer();
        stage.add(this.#layer);
        stage.add(this.#layerArea);
        stage.on('click', this.onClick);
        stage.on('mousemove', this.onMouseMove);
    }

    onClick = (e) => {
        const stage = this.#stage;
        const point = stage.getPointerPosition()
        console.log('clicked on', point);
        
        geometric.pointTranslate([0, 0], 0, 1)
        if (!this.startPoint) {
            this.startPoint = point
        } else {
            const intersections = this.calcIntersectionsWithStage(this.startPoint, point)
            if (intersections.length == 2) {
                const points = [intersections[0].x, intersections[0].y, intersections[1].x, intersections[1].y]
                const line = new Konva.Line({
                    points: points,
                    stroke: 'blue',
                    strokeWidth: 2
                });
                this.#layer.removeChildren()
                this.#layerArea.removeChildren()
                this.#layerArea.add(line)
                this.startPoint = undefined
                debugger
                const polyons = this.cutStage(intersections[0], intersections[1])
                // 显示区域

                
            }
        }
    }

    onMouseMove = (e) => {
        if (!this.startPoint) return;

        const stage = this.#stage;
        const point = stage.getPointerPosition()
        const points = [this.startPoint.x, this.startPoint.y, point.x, point.y]
        this.#layer.removeChildren()
        const line = new Konva.Line({
            points: points,
            stroke: 'red',
            strokeWidth: 2
        });
        this.#layer.add(line)
    }

    cutStage(p1, p2) {
        const stage = this.#stage;
        const w = stage.width()
        const h = stage.height()
        console.log(w, h)
        const rect = [
            [0, 0],
            [w, 0],
            [w, h],
            [0, h]
        ]
        const line = [[p1.x, p1.y], [p2.x, p2.y]]
        let leftPoints = [].concat(line)
        let rightPoints = [].concat(line)
        
        for (let i = 0; i < 4; ++i) {
            const point = rect[i]
            let isLeft = geometric.pointLeftofLine(point, line)
            if (isLeft) {
                leftPoints.push(point)
            } else {
                rightPoints.push(point)
            }
        }
        const leftArea = geometric.polygonHull(leftPoints)
        const rightArea = geometric.polygonHull(rightPoints)

        return {
            line: line,
            leftArea: leftArea,
            rightArea: rightArea
        }
    }

    calcIntersectionsWithStage(p1, p2) {
        const stage = this.#stage;
        const w = stage.width()
        const h = stage.height()
        console.log(w, h)
        const rect = [
            {x: 0, y: 0},
            {x: w, y: 0},
            {x: w, y: h},
            {x: 0, y: h},
            {x: 0, y: 0}
        ]

        let intersections = []
        for (let i = 0; i < 4; ++i) {
            let q1 = rect[i]
            let q2 = rect[i + 1]
            let p = this.getVectorIntersection(p1, p2, q1, q2)
            // p.x = Math.floor(p.x)
            // p.y = Math.floor(p.y)

            let line = [[q1.x, q1.y], [q2.x, q2.y]]
            let online = geometric.pointOnLine([p.x, p.y], line);
            // let line = [q1, q2]
            // let online = this.pointOnLine(p, line)
            if (online) {
                intersections.push(p)
            }
        }

        return intersections
    }

    pointOnLine(point, line) {
        const p1 = line[0]
        const p2 = line[1]
        const minx = p1.x > p2.x ? p2.x : p1.x
        const maxx = p1.x > p2.x ? p1.x : p2.x
        const miny = p1.y > p2.y ? p2.y : p1.y
        const maxy = p1.y > p2.y ? p1.y : p2.y
        let online = point.x >= minx && point.x <= maxx 
            && point.y >= miny && point.y <= maxy
        return online
    }

    getVectorIntersection(p1, p2, q1, q2) {
        const a1 = p2.y - p1.y;
        const b1 = p1.x - p2.x;
        const c1 = a1 * p1.x + b1 * p1.y;
        const a2 = q2.y - q1.y;
        const b2 = q1.x - q2.x;
        const c2 = a2 * q1.x + b2 * q1.y;
        const determinant = a1 * b2 - a2 * b1;
        if (determinant === 0) {
            throw new Error('The lines are parallel or identical');
        }
        const x = (b2 * c1 - b1 * c2) / determinant;
        const y = (a1 * c2 - a2 * c1) / determinant;
        return { x, y };
    }
}

export {DrawLine}