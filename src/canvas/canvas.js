import { fabric } from 'fabric';

class Canvas {
  constructor() {
    this.grid = 25;
    this.unitScale = 10;
    this.canvasWidth = 150 * this.unitScale;
    this.canvasHeight = 75 * this.unitScale;
    this.rectangleWidth = 125;
    this.rectangleHeight = 75;

    this.isAddingRect = false;
    this.isAddingLine = false;

    this.lineSource = null;
    this.lineTarget = null;

    this.selectedNode = null;
  }

  init() {
    this.canvas = new fabric.Canvas('c', {
      backgroundColor: '#C4C4C4',
      selection: false,
    });

    this.canvas.setWidth(this.canvasWidth);
    this.canvas.setHeight(this.canvasHeight);

    this.createGrid();
    this.registerMouseControls();
    this.registerCanvasEvents();
  }

  // Create a grid that covers the entire canvas
  createGrid() {
    for (let i = 0; i < (this.canvasWidth / this.grid); i++) {
      this.canvas.add(new fabric.Line([i * this.grid, 0, i * this.grid, this.canvasHeight], {
        type: 'gridLine',
        stroke: '#b5b5b5',
        selectable: false,
        hoverCursor: 'default',
      }));
      this.canvas.add(new fabric.Line([0, i * this.grid, this.canvasWidth, i * this.grid], {
        type: 'gridLine',
        stroke: '#b5b5b5',
        selectable: false,
        hoverCursor: 'default',
      }));
    }
  }

  // Set zoom and pan controls
  registerMouseControls() {
    this.canvas.on('mouse:down', (opt) => {
      const evt = opt.e;
      if (evt.altKey === true) {
        this.isDragging = true;
        this.canvas.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      }
    });

    this.canvas.on('mouse:move', (opt) => {
      if (this.isDragging) {
        const { e } = opt;
        const vpt = this.canvas.viewportTransform;
        vpt[4] += e.clientX - this.lastPosX;
        vpt[5] += e.clientY - this.lastPosY;
        this.canvas.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
      }
    });

    this.canvas.on('mouse:up', () => {
      this.canvas.setViewportTransform(this.canvas.viewportTransform);
      this.isDragging = false;
      this.canvas.selection = true;
    });

    this.canvas.on('mouse:wheel', (opt) => {
      const delta = opt.e.deltaY;
      let zoom = this.canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      this.canvas.zoomToPoint({
        x: opt.e.offsetX,
        y: opt.e.offsetY,
      }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });
  }

  registerCanvasEvents() {
    this.canvas.on('mouse:move', (options) => {
      this.movePlaceholderRect(options);
    });

    this.canvas.on('mouse:down', () => {
      this.placeObjectOnGrid();
    });

    this.canvas.on('selection:created', (options) => {
      this.disableSelectionControls(options);
    });

    this.canvas.on('object:moved', (options) => {
      this.moveIfColliding(options);
    });

    this.canvas.on('object:moving', (options) => {
      this.moveObject(options);
      this.updateLines();
    });

    this.canvas.on('mouse:dblclick', (options) => {
      console.log(options.target);
      this.selectedNode = options.target;
    });

    this.canvas.on('mouse:up', (options) => {
      this.selectObjectsForConnection(options.target);
    });
  }

  moveObject(options) {
    const activeObject = options.target;
    activeObject.left = Math.round(activeObject.left / this.grid) * this.grid;
    activeObject.top = Math.round(activeObject.top / this.grid) * this.grid;
    activeObject.setCoords();
  }

  // Search for a canvas object by its identifier
  getItem(type, id) {
    let object = null;
    const objects = this.canvas.getObjects(type);
    for (let i = 0, len = this.canvas.size(); i < len; i++) {
      if (objects[i].id && objects[i].id === id) {
        object = objects[i];
        break;
      }
    }
    return object;
  }

  // After moving object, check if it needs to be moved
  moveIfColliding(options) {
    const collisionObject = this.checkCollision(options.target);
    if (collisionObject.collision && options.target.type === 'group') {
      this.moveIntersectedObject(options.target, collisionObject.collider);
    }
  }

  movePlaceholderRect(options) {
    if (this.isAddingRect) {
      const placeholder = this.getItem('group', 'placeholder');
      placeholder.left = Math.round((options.absolutePointer.x - placeholder.width / 2) / this.grid) * this.grid;
      placeholder.top = Math.round((options.absolutePointer.y - placeholder.height / 2) / this.grid) * this.grid;
      placeholder.setCoords();
      this.canvas.renderAll();
    }
  }

  // When you create a selection for multiple objects, disable object group controls
  disableSelectionControls = (options) => {
    options.target.set({
      hasControls: false,
    });
  }

  // Handle the placement of a new object on the grid
  placeObjectOnGrid() {
    if (this.isAddingRect) {
      const placeholder = this.getItem('group', 'placeholder');

      // Change the properties and text of the object and force a new rendering
      const nodeCount = Array.from(this.canvas.getObjects('group')).length;
      placeholder.id = `node-${nodeCount}`;
      console.log(placeholder);
      placeholder.getObjects()[1].set('text', `node-${nodeCount}`);
      this.canvas.renderAll();

      // Check if the newly created object does not collide with other objects and move it if so
      const collisionObject = this.checkCollision(placeholder);
      if (collisionObject.collision && placeholder.type === 'group') {
        this.moveIntersectedObject(placeholder, collisionObject.collider);
      }
    }
    this.isAddingRect = false;
  }

  // Create a new group consisting of a rectangle and text with its identifier
  createRect(left, top, fill, id) {
    const rectangle = new fabric.Rect({
      left,
      top,
      width: this.rectangleWidth,
      height: this.rectangleHeight,
      rx: 15,
      ry: 15,
      fill,
      originX: 'left',
      originY: 'top',
    });
    const text = new fabric.Textbox(`${id}`, {
      left: left + this.rectangleWidth / 2,
      textAlign: 'center',
      splitByGrapheme: true,
      width: this.rectangleWidth - 10,
      originX: 'center',
      originY: 'center',
      top: top + this.rectangleHeight / 2,
      fontSize: 15,
      fontFamily: 'Calibri',
      fill: '#000',
    });
    const group = new fabric.Group([rectangle, text], {
      left,
      top,
      id,
      hasControls: false,
      hasBorders: false,
    });
    this.canvas.add(group);
  }

  moveIntersectedObject(target, collider) {
    const originalCoordinates = { x: collider.left, y: collider.top };
    const directions = ['right', 'right-bottom', 'bottom', 'bottom-left', 'left', 'left-top', 'top', 'top-right'];
    let rectangleOffset = 1;
    let foundFlag = false;
    while (!foundFlag) {
      for (let i = 0; i < directions.length; i++) {
        const coordinates = { ...originalCoordinates };
        switch (directions[i]) {
          case 'right':
            coordinates.x += (this.rectangleWidth + this.grid) * rectangleOffset;
            break;
          case 'right-bottom':
            coordinates.x += (this.rectangleWidth + this.grid) * rectangleOffset;
            coordinates.y += (this.rectangleHeight + this.grid) * rectangleOffset;
            break;
          case 'bottom':
            coordinates.y += (this.rectangleHeight + this.grid) * rectangleOffset;
            break;
          case 'bottom-left':
            coordinates.x -= (this.rectangleWidth + this.grid) * rectangleOffset;
            coordinates.y += (this.rectangleHeight + this.grid) * rectangleOffset;
            break;
          case 'left':
            coordinates.x -= (this.rectangleWidth + this.grid) * rectangleOffset;
            break;
          case 'left-top':
            coordinates.x -= (this.rectangleWidth + this.grid) * rectangleOffset;
            coordinates.y -= (this.rectangleHeight + this.grid) * rectangleOffset;
            break;
          case 'top':
            coordinates.y -= (this.rectangleHeight + this.grid) * rectangleOffset;
            break;
          case 'top-right':
            coordinates.x += (this.rectangleWidth + this.grid) * rectangleOffset;
            coordinates.y -= (this.rectangleHeight + this.grid) * rectangleOffset;
            break;
          default:
            break;
        }

        target.left = coordinates.x;
        target.top = coordinates.y;
        target.setCoords();

        if (!this.checkCollision(target).collision) {
          foundFlag = true;
          break;
        }
      }
      rectangleOffset += 1;
    }
    // After moving objects, rerender lines
    this.updateLines();
  }

  checkCollision(target) {
    const objects = this.canvas.getObjects('group');
    let collision = {
      collision: false,
      collider: null,
    };
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].id === target.id) continue;
      if (target.intersectsWithObject(objects[i])) {
        collision = {
          collision: target.intersectsWithObject(objects[i]),
          collider: objects[i],
        };
        break;
      }
    }
    return collision;
  }

  resetZoom() {
    this.canvas.zoomToPoint({
      x: 0,
      y: 0,
    }, 1);
  }

  updateLines() {
    const objects = this.canvas.getObjects('connectionLine');
    for (let i = 0; i < objects.length; i++) {
      const line = objects[i];
      const linePoints = line.calcLinePoints();
      linePoints.x1 = line.source.left + (this.rectangleWidth / 2);
      linePoints.y1 = line.source.top + (this.rectangleHeight / 2);
      linePoints.x2 = line.target.left + (this.rectangleWidth / 2);
      linePoints.y2 = line.target.top + (this.rectangleHeight / 2);
      line.set(linePoints);
    }
  }

  getRectConnection(rectangle) {
    return [
      rectangle.left + (this.rectangleWidth / 2),
      rectangle.top + (this.rectangleHeight / 2),
    ];
  }

  createLine() {
    const line = new fabric.Line([
      this.getRectConnection(this.lineSource),
      this.getRectConnection(this.lineTarget),
    ].flat(), {
      type: 'connectionLine',
      stroke: 'red',
      source: this.lineSource,
      target: this.lineTarget,
      hasControls: false,
      hasBorders: false,
      strokeWidth: 2,
      hoverCursor: 'default',
    });
    this.canvas.add(line);
    console.log(line);
    line.moveTo(2);
  }

  selectObjectsForConnection(target) {
    if (this.isAddingLine && target && target.type === 'group') {
      if (this.lineSource === null) {
        this.lineSource = target;
        return;
      }
      if (this.lineTarget === null && this.lineSource !== null) {
        this.lineTarget = target;
        this.createLine();
        this.lineSource = null;
        this.lineTarget = null;
        this.isAddingLine = false;
      }
    }
  }
}

export default Canvas;

// Można przesuwać siatkę razem z ekranem
// https://stackoverflow.com/questions/53310138/creating-a-draggable-and-scaleable-grid-in-html5
