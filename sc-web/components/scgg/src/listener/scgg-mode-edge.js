SCggEdgeListener = function (scene) {
    this.scene = scene;
};

SCggEdgeListener.prototype = {

    constructor: SCggEdgeListener,

    onMouseMove: function (x, y) {
        this.scene.mouse_pos.x = x;
        this.scene.mouse_pos.y = y;
        this.scene.render.updateDragLine();
        return true;
    },

    onMouseDown: function (x, y) {
        if (!this.scene.pointed_object) {
            if (this.scene.edge_data.source) {
                this.scene.drag_line_points.push({x: x, y: y, idx: this.scene.drag_line_points.length});
                return true;
            }
        }
        return false;
    },

    onMouseDoubleClick: function (x, y) {
        return false;
    },

    onMouseDownObject: function (obj) {
        if(obj instanceof SCgg.ModelEdge)
            return false;
        var scene = this.scene;
        if (!scene.edge_data.source) {
            scene.edge_data.source = obj;
            scene.drag_line_points.push({
                x: scene.mouse_pos.x,
                y: scene.mouse_pos.y,
                idx: scene.drag_line_points.length
            });
            return true;
        } else {
            scene.commandManager.execute(new SCggCommandCreateEdge(
                scene.edge_data.source,
                obj,
                this.scene));
        }
        return false;
    },

    onMouseUpObject: function(obj) {
        return true;
    },

    onKeyDown: function (event) {
        if (event.which == KeyCode.Escape) {
            this.scene.revertDragPoint(0);
            return true;
        }
        return false;
    },

    onKeyUp: function(event) {
        return false;
    }

};
