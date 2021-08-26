import { fabric } from 'fabric';

class Node {
  constructor(left, top, width, height, fill, id) {
    return this.createNode(left, top, width, height, fill, id);
  }

  createNode(left, top, width, height, fill, id) {
    const rectangle = new fabric.Rect({
      left,
      top,
      width,
      height,
      rx: 15,
      ry: 15,
      fill,
      originX: 'left',
      originY: 'top',
    });
    const text = new fabric.Textbox(`${id}`, {
      left: left + width / 2,
      textAlign: 'center',
      splitByGrapheme: true,
      width: width - 10,
      originX: 'center',
      originY: 'center',
      top: top + height / 2,
      fontSize: 15,
      fontFamily: 'Calibri',
      fill: '#000',
    });
    const group = new fabric.Group([rectangle, text], {
      left,
      top,
      id,
      internal_id: id,
      hasControls: false,
      hasBorders: false,
      moveCursor: 'move',
      hoverCursor: 'pointer',
    });

    return group;
  }

  static setID(node, id) {
    // Change group id
    node.id = id;
    // Change
    node.getObjects()[1].set('text', node.id);
  }
}

export default Node;
