import { fabric } from 'fabric';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = new fabric.Canvas('c', { selection: false });
  const grid = 25;
  const unitScale = 10;
  const canvasWidth = 1500;
  const canvasHeight = 75 * unitScale;
  const rectangleWidth = 125;
  const rectangleHeight = 75;

  canvas.setWidth(canvasWidth);
  canvas.setHeight(canvasHeight);

  // Create a grid that covers the entire canvas
  for (let i = 0; i < (canvasWidth / grid); i++) {
    canvas.add(new fabric.Line([i * grid, 0, i * grid, canvasHeight], {
      type: 'gridLine', stroke: '#ccc', selectable: false, hoverCursor: 'default',
    }));
    canvas.add(new fabric.Line([0, i * grid, canvasWidth, i * grid], {
      type: 'gridLine', stroke: '#ccc', selectable: false, hoverCursor: 'default',
    }));
  }

  // Set zoom and pan controls
  canvas.on('mouse:down', (opt) => {
    const evt = opt.e;
    if (evt.altKey === true) {
      window.isDragging = true;
      window.selection = false;
      window.lastPosX = evt.clientX;
      window.lastPosY = evt.clientY;
    }
  });

  canvas.on('mouse:move', (opt) => {
    if (window.isDragging) {
      const { e } = opt;
      const vpt = canvas.viewportTransform;
      vpt[4] += e.clientX - window.lastPosX;
      vpt[5] += e.clientY - window.lastPosY;
      canvas.requestRenderAll();
      window.lastPosX = e.clientX;
      window.lastPosY = e.clientY;
    }
  });

  canvas.on('mouse:up', () => {
    canvas.setViewportTransform(canvas.viewportTransform);
    window.isDragging = false;
    window.selection = true;
  });

  canvas.on('mouse:wheel', (opt) => {
    const delta = opt.e.deltaY;
    let zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  });

  // Create a new group consisting of a rectangle and text with its identifier
  function createRect(left, top, fill, id) {
    const rectangle = new fabric.Rect({
      left,
      top,
      width: rectangleWidth,
      height: rectangleHeight,
      rx: 15,
      ry: 15,
      fill,
      originX: 'left',
      originY: 'top',
    });
    const text = new fabric.Textbox(`${id}`, {
      left: left + rectangleWidth / 2,
      textAlign: 'center',
      splitByGrapheme: true,
      width: rectangleWidth - 10,
      originX: 'center',
      originY: 'center',
      top: top + rectangleHeight / 2,
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
    canvas.add(group);
  }

  function generateColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)}`;
  }

  createRect(100, 150, generateColor(), Math.random() * 10);
  createRect(100, 300, generateColor(), Math.random() * 10);
  createRect(100, 450, generateColor(), Math.random() * 10);
  createRect(100, 600, generateColor(), Math.random() * 10);
  createRect(100, 750, generateColor(), Math.random() * 10);
  createRect(300, 150, generateColor(), Math.random() * 10);
  createRect(300, 300, generateColor(), Math.random() * 10);
  createRect(300, 450, generateColor(), Math.random() * 10);
  createRect(300, 600, generateColor(), Math.random() * 10);
  createRect(500, 150, generateColor(), Math.random() * 10);
  createRect(500, 300, generateColor(), Math.random() * 10);
  createRect(500, 450, generateColor(), Math.random() * 10);
  createRect(500, 600, generateColor(), Math.random() * 10);

  function moveObject(options) {
    const activeObject = options.target;
    activeObject.left = Math.round(activeObject.left / grid) * grid;
    activeObject.top = Math.round(activeObject.top / grid) * grid;
    activeObject.setCoords();
  }

  canvas.on('object:moving', (options) => {
    moveObject(options);
    updateLines();
  });

  function checkCollision(target) {
    const objects = canvas.getObjects('group');
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

  function moveIntersectedObject(target, collider) {
    const originalCoordinates = { x: collider.left, y: collider.top };
    const directions = ['right', 'right-bottom', 'bottom', 'bottom-left', 'left', 'left-top', 'top', 'top-right'];
    let rectangleOffset = 1;
    let foundFlag = false;
    while (!foundFlag) {
      for (let i = 0; i < directions.length; i++) {
        const coordinates = { ...originalCoordinates };
        // eslint-disable-next-line default-case
        switch (directions[i]) {
          case 'right':
            coordinates.x += (rectangleWidth + grid) * rectangleOffset;
            break;
          case 'right-bottom':
            coordinates.x += (rectangleWidth + grid) * rectangleOffset;
            coordinates.y += (rectangleHeight + grid) * rectangleOffset;
            break;
          case 'bottom':
            coordinates.y += (rectangleHeight + grid) * rectangleOffset;
            break;
          case 'bottom-left':
            coordinates.x -= (rectangleWidth + grid) * rectangleOffset;
            coordinates.y += (rectangleHeight + grid) * rectangleOffset;
            break;
          case 'left':
            coordinates.x -= (rectangleWidth + grid) * rectangleOffset;
            break;
          case 'left-top':
            coordinates.x -= (rectangleWidth + grid) * rectangleOffset;
            coordinates.y -= (rectangleHeight + grid) * rectangleOffset;
            break;
          case 'top':
            coordinates.y -= (rectangleHeight + grid) * rectangleOffset;
            break;
          case 'top-right':
            coordinates.x += (rectangleWidth + grid) * rectangleOffset;
            coordinates.y -= (rectangleHeight + grid) * rectangleOffset;
            break;
        }

        target.left = coordinates.x;
        target.top = coordinates.y;
        target.setCoords();

        if (!checkCollision(target).collision) {
          foundFlag = true;
          break;
        }
      }
      rectangleOffset += 1;
    }
    // After moving objects, rerender lines
    updateLines();
  }

  canvas.on('object:moved', (options) => {
    const collisionObject = checkCollision(options.target);
    if (collisionObject.collision && options.target.type === 'group') {
      moveIntersectedObject(options.target, collisionObject.collider);
    }
  });

  function getRectConnection(rectangle) {
    return [rectangle.left + (rectangleWidth / 2), rectangle.top + (rectangleHeight / 2)];
  }

  function drawLines() {
    const rects = canvas.getObjects('group');
    const rect1 = rects[0];
    const rect2 = rects[1];
    console.log(getRectConnection(rect1));
    const line = new fabric.Line([getRectConnection(rect1), getRectConnection(rect2)].flat(), {
      type: 'connectionLine',
      stroke: 'red',
      source: rect1,
      target: rect2,
      hasControls: false,
      hasBorders: false,
      selectable: false,
      strokeWidth: 2,
      hoverCursor: 'default',
    });
    canvas.add(line);
    line.moveTo(2);
  }
  drawLines();

  function updateLines() {
    const objects = canvas.getObjects('connectionLine');
    for (let i = 0; i < objects.length; i++) {
      const line = objects[i];
      const linePoints = line.calcLinePoints();
      linePoints.x1 = line.source.left + (rectangleWidth / 2);
      linePoints.y1 = line.source.top + (rectangleHeight / 2);
      linePoints.x2 = line.target.left + (rectangleWidth / 2);
      linePoints.y2 = line.target.top + (rectangleHeight / 2);
      line.set(linePoints);
    }
  }

  let isAddingLine = false;
  let isAddingRect = false;
  let lineSource = null;
  let lineTarget = null;

  function selectObjectsForConnection(target) {
    if (isAddingLine && target && target.type === 'group') {
      if (lineSource === null) {
        lineSource = target;
        return;
      }
      if (lineTarget === null && lineSource !== null) {
        lineTarget = target;
        createLine();
        lineSource = null;
        lineTarget = null;
        isAddingLine = false;
      }
    }
  }

  canvas.on('mouse:up', (options) => {
    const { target } = options;
    selectObjectsForConnection(target);
  });

  // document.querySelector('#addLine').addEventListener('click', () => {
  //   isAddingLine = true;
  // });

  canvas.on('mouse:move', (options) => {
    if (isAddingRect) {
      movePlaceholderRect(options);
    }
  });

  function movePlaceholderRect(options) {
    const placeholder = canvas.getItem('placeholder');

    placeholder.left = Math.round((options.absolutePointer.x - placeholder.width / 2) / grid) * grid;
    placeholder.top = Math.round((options.absolutePointer.y - placeholder.height / 2) / grid) * grid;
    placeholder.setCoords();
    canvas.renderAll();
  }

  // document.querySelector('#addRect').addEventListener('click', () => {
  //   // Create a rectangle behind the border so it does not overlap the existing diagram
  //   createRect(9999, 9999, generateColor(), 'placeholder');
  //   isAddingRect = true;
  // });

  function createLine() {
    const line = new fabric.Line([getRectConnection(lineSource), getRectConnection(lineTarget)].flat(), {
      type: 'connectionLine',
      stroke: 'red',
      source: lineSource,
      target: lineTarget,
      hasControls: false,
      hasBorders: false,
      strokeWidth: 2,
      hoverCursor: 'default',
    });
    canvas.add(line);
    console.log(line);
    line.moveTo(2);
  }

  // Przesuwanie siatki
  // https://stackoverflow.com/a/66736764

  // Handle the placement of a new object on the grid
  canvas.on('mouse:down', () => {
    if (isAddingRect) {
      const placeholder = canvas.getItem('placeholder');

      // Change the properties and text of the object and force a new rendering
      placeholder.id = Math.random() * 10;
      // eslint-disable-next-line no-underscore-dangle
      placeholder._objects[1].set('text', `${Math.random() * 10}`);
      canvas.renderAll();

      // Check if the newly created object does not collide with other objects and move it if so
      const collisionObject = checkCollision(placeholder);
      if (collisionObject.collision && placeholder.type === 'group') {
        moveIntersectedObject(placeholder, collisionObject.collider);
      }
    }
    isAddingRect = false;
  });

  // When you create a selection for multiple objects, disable object group controls
  canvas.on('selection:created', (e) => {
    const activeSelection = e.target;
    console.log(activeSelection);
    activeSelection.set({
      hasControls: false,
    });
  });
});
