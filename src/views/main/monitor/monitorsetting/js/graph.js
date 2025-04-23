
import Konva from 'konva'
// import { DrawLine } from './draw_line';
import { DrawPolygon } from './draw_polygon';

class StageGraph {
    #stage;
    #layerArea

    #drawLine;
    #drawPolygon;
    constructor(container) {
        var stage = new Konva.Stage({
            container: container,
            width: 640,
            height: 480
        });
        var layer = new Konva.Layer();
        stage.add(layer);
        this.#stage = stage;
        this.#layerArea = layer;

        // this.#drawLine = new DrawLine(stage)
        this.#drawPolygon = new DrawPolygon(stage, layer)
    }

    getData() {
        const polygons = this.#layerArea.getChildren()
        let areas = []
        for (let polygon of polygons) {
            areas.push(polygon.points())
        }
        let json = JSON.stringify(areas)
        return json
    }

    setData(json) {
        const data = JSON.parse(json)
        for (let item of data) {
            var poly = new Konva.Line({
                points: item,
                // fill: '#00D2FF',
                // opacity: 0.5,
                stroke: 'red',
                strokeWidth: 2,
                closed: close
            });
            this.#layerArea.add(poly)
        }
    }

    clearData() {
        this.#layerArea.removeChildren()
    }
}

export {StageGraph}