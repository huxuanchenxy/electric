
import Konva from 'konva'
class DrawPolygon {
    #stage;
    #layerArea;
    points = [];
    #layer
    #dashLine
    #polyline
    constructor(stage, layer) {
        this.#stage = stage
        this.#layerArea = layer

        this.#layer = new Konva.Layer();
        stage.add(this.#layer);
        stage.on('click', this.onClick);
        stage.on('mousemove', this.onMouseMove);
        // stage.on('dblclick', this.onDbClick);
    }

    onClick = (e) => {
        console.log("click")
        
        const stage = this.#stage;
        const point = stage.getPointerPosition()
        if (!this.drawing) {
            this.drawing = true;
            this.points = []
        }
        
        if (this.points.length > 0) {
            // 剔除距离接近的点
            const lastPoint = this.points[this.points.length - 1]
            const x_pow2 = Math.pow(lastPoint.x - point.x, 2)
            const y_pow2 = Math.pow(lastPoint.y - point.y, 2)
            let distance = Math.sqrt(x_pow2 + y_pow2)
            if (distance < 5) return;
        }

        this.points.push(point)
        if (this.points.length < 2) return
        // 右键
        if (e.evt.button == 2) {
            this.cancel()
            return;
        }
        this.drawPolygon(this.points, false)
        
    }

    onMouseMove = (e) => {
        if (this.points.length == 0) return;

        const stage = this.#stage;
        const point = stage.getPointerPosition()
        const start = this.points[0]
        const end = this.points[this.points.length - 1]
        const points = [start.x, start.y, point.x, point.y, end.x, end.y]
        if (!this.#dashLine) {
            const line = new Konva.Line({
                points: points,
                stroke: 'red',
                strokeWidth: 2,
                dash: [5]
            });
            this.#layer.add(line)
            this.#dashLine = line
        } else {
            this.#dashLine.points(points)
        }
    }

    onDbClick = (e) => {
        console.log("dbclick")
        this.cancel()
    }

    cancel() {
        this.drawPolygon(this.points, true)
        this.#dashLine.destroy()
        this.#dashLine = undefined;
        // this.#layer.removeChildren()
        this.drawing = false;
        this.points = []
    }

    drawPolygon(points, close) {
        this.#layerArea.removeChildren()
        let points_poly = []
        for (let p of points) {
            points_poly.push(p.x)
            points_poly.push(p.y)
        }
        var poly = new Konva.Line({
            points: points_poly,
            // fill: '#00D2FF',
            // opacity: 0.5,
            stroke: 'red',
            strokeWidth: 2,
            closed: close
        });
        this.#layerArea.add(poly)
    }
}

export {DrawPolygon}