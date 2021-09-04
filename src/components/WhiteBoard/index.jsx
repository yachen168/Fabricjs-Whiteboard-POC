import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fabric } from 'fabric';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import PdfReader from '../PdfReader';
import { saveAs } from 'file-saver';
import { ReactComponent as SelectIcon } from './images/select.svg';
import { ReactComponent as EraserIcon } from './images/eraser.svg';
import { ReactComponent as TextIcon } from './images/text.svg';
import { ReactComponent as RectangleIcon } from './images/rectangle.svg';
import { ReactComponent as LineIcon } from './images/line.svg';
import { ReactComponent as EllipseIcon } from './images/ellipse.svg';
import { ReactComponent as TriangleIcon } from './images/triangle.svg';
import { ReactComponent as PencilIcon } from './images/pencil.svg';
import { ReactComponent as SweepingIcon } from './images/sweeping.svg';

import './eraserBrush';

import styles from './index.module.scss';

const chooseOptions = {
  icon: 'pi pi-upload',
  iconOnly: false,
};

let drawInstance = null;
let origX;
let origY;
let mouseDown = false;

const options = {
  currentMode: '',
  currentColor: '#000000',
  currentWidth: 5,
  fill: false,
  group: {},
};

const modes = {
  RECTANGLE: 'RECTANGLE',
  TRIANGLE: 'TRIANGLE',
  ELLIPSE: 'ELLIPSE',
  LINE: 'LINE',
  PENCIL: 'PENCIL',
  ERASER: 'ERASER',
};

const initCanvas = () =>
  new fabric.Canvas('canvas', {
    height: 600,
    width: 800,
  });

/*  ==== line  ==== */
const createLine = (canvas) => {
  if (modes.currentMode !== modes.LINE) {
    options.currentMode = modes.LINE;

    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');

    canvas.on('mouse:down', startAddLine(canvas));
    canvas.on('mouse:move', startDrawingLine(canvas));
    canvas.on('mouse:up', stopDrawingLine);

    canvas.selection = false;
    canvas.hoverCursor = 'auto';
    canvas.isDrawingMode = false;
    canvas.getObjects().map((item) => item.set({ selectable: false }));
    canvas.discardActiveObject().requestRenderAll();
  }
};

const startAddLine = (canvas) => {
  return ({ e }) => {
    mouseDown = true;

    let pointer = canvas.getPointer(e);
    drawInstance = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
      strokeWidth: options.currentWidth,
      stroke: options.currentColor,
      selectable: false,
    });

    canvas.add(drawInstance);
    canvas.requestRenderAll();
  };
};

const startDrawingLine = (canvas) => {
  return ({ e }) => {
    if (mouseDown) {
      const pointer = canvas.getPointer(e);
      drawInstance.set({
        x2: pointer.x,
        y2: pointer.y,
      });
      drawInstance.setCoords();
      canvas.requestRenderAll();
    }
  };
};
const stopDrawingLine = () => {
  mouseDown = false;
};

/* ==== rectangle ==== */
const createRect = (canvas) => {
  if (options.currentMode !== modes.RECTANGLE) {
    options.currentMode = modes.RECTANGLE;

    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');

    canvas.on('mouse:down', startAddRect(canvas));
    canvas.on('mouse:move', startDrawingRect(canvas));
    canvas.on('mouse:up', stopDrawingRect);

    canvas.selection = false;
    canvas.hoverCursor = 'auto';
    canvas.isDrawingMode = false;
    canvas.getObjects().map((item) => item.set({ selectable: false }));
    canvas.discardActiveObject().requestRenderAll();
  }
};

const startAddRect = (canvas) => {
  return ({ e }) => {
    mouseDown = true;

    const pointer = canvas.getPointer(e);
    origX = pointer.x;
    origY = pointer.y;

    drawInstance = new fabric.Rect({
      stroke: options.currentColor,
      strokeWidth: options.currentWidth,
      fill: options.fill ? options.currentColor : 'transparent',
      left: origX,
      top: origY,
      width: 0,
      height: 0,
      selectionBackgroundColor: 'rgba(245, 245, 220, 0.5)',
      selectable: false,
    });

    canvas.add(drawInstance);

    drawInstance.on('mousedown', (e) => {
      if (options.currentMode === modes.ERASER) {
        console.log('刪除', e);
        canvas.remove(e.target);
      }
    });
  };
};

const startDrawingRect = (canvas) => {
  return ({ e }) => {
    if (mouseDown) {
      const pointer = canvas.getPointer(e);

      if (pointer.x < origX) {
        drawInstance.set('left', pointer.x);
      }
      if (pointer.y < origY) {
        drawInstance.set('top', pointer.y);
      }
      drawInstance.set({
        width: Math.abs(pointer.x - origX),
        height: Math.abs(pointer.y - origY),
      });
      drawInstance.setCoords();
      canvas.renderAll();
    }
  };
};

const stopDrawingRect = () => {
  mouseDown = false;
};

/* ==== Ellipse ==== */
const createEllipse = (canvas) => {
  if (options.currentMode !== modes.ELLIPSE) {
    options.currentMode = modes.ELLIPSE;

    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');

    canvas.on('mouse:down', startAddEllipse(canvas));
    canvas.on('mouse:move', startDrawingEllipse(canvas));
    canvas.on('mouse:up', stopDrawingEllipse);

    canvas.selection = false;
    canvas.hoverCursor = 'auto';
    canvas.isDrawingMode = false;
    canvas.getObjects().map((item) => item.set({ selectable: false }));
    canvas.discardActiveObject().requestRenderAll();
  }
};

const startAddEllipse = (canvas) => {
  return ({ e }) => {
    mouseDown = true;

    const pointer = canvas.getPointer(e);
    origX = pointer.x;
    origY = pointer.y;
    drawInstance = new fabric.Ellipse({
      stroke: options.currentColor,
      strokeWidth: options.currentWidth,
      fill: options.fill ? options.currentColor : 'transparent',
      left: origX,
      top: origY,
      cornerSize: 7,
      objectCaching: false,
      selectionBackgroundColor: 'rgba(245, 245, 220, 0.5)',
      selectable: false,
    });

    canvas.add(drawInstance);
  };
};

const startDrawingEllipse = (canvas) => {
  return ({ e }) => {
    if (mouseDown) {
      const pointer = canvas.getPointer(e);
      if (pointer.x < origX) {
        drawInstance.set('left', pointer.x);
      }
      if (pointer.y < origY) {
        drawInstance.set('top', pointer.y);
      }
      drawInstance.set({
        rx: Math.abs(pointer.x - origX) / 2,
        ry: Math.abs(pointer.y - origY) / 2,
      });
      drawInstance.setCoords();
      canvas.renderAll();
    }
  };
};

const stopDrawingEllipse = () => {
  mouseDown = false;
};

/* === triangle === */
const createTriangle = (canvas) => {
  canvas.off('mouse:down');
  canvas.off('mouse:move');
  canvas.off('mouse:up');

  canvas.on('mouse:down', startAddTriangle(canvas));
  canvas.on('mouse:move', startDrawingTriangle(canvas));
  canvas.on('mouse:up', stopDrawingTriangle);

  canvas.selection = false;
  canvas.hoverCursor = 'auto';
  canvas.isDrawingMode = false;
  canvas.getObjects().map((item) => item.set({ selectable: false }));
  canvas.discardActiveObject().requestRenderAll();
};

const startAddTriangle = (canvas) => {
  return ({ e }) => {
    mouseDown = true;
    options.currentMode = modes.TRIANGLE;

    const pointer = canvas.getPointer(e);
    origX = pointer.x;
    origY = pointer.y;
    drawInstance = new fabric.Triangle({
      stroke: options.currentColor,
      strokeWidth: options.currentWidth,
      fill: options.fill ? options.currentColor : 'transparent',
      left: origX,
      top: origY,
      width: 0,
      height: 0,
      selectionBackgroundColor: 'rgba(245, 245, 220, 0.5)',
      selectable: false,
    });

    canvas.add(drawInstance);
  };
};

const startDrawingTriangle = (canvas) => {
  return ({ e }) => {
    if (mouseDown) {
      const pointer = canvas.getPointer(e);
      if (pointer.x < origX) {
        drawInstance.set('left', pointer.x);
      }
      if (pointer.y < origY) {
        drawInstance.set('top', pointer.y);
      }
      drawInstance.set({
        width: Math.abs(pointer.x - origX),
        height: Math.abs(pointer.y - origY),
      });
      drawInstance.setCoords();
      canvas.renderAll();
    }
  };
};

const stopDrawingTriangle = () => {
  mouseDown = false;
};

const createText = (canvas) => {
  canvas.off('mouse:down');
  canvas.off('mouse:move');
  canvas.off('mouse:up');
  canvas.isDrawingMode = false;

  const text = new fabric.Textbox('text', {
    left: 100,
    top: 100,
    fill: options.currentColor,
    editable: true,
  });

  canvas.add(text);
  canvas.renderAll();
};

const changeToErasingMode = (canvas) => {
  if (options.currentMode !== modes.ERASER) {
    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');

    options.currentMode = modes.ERASER;
    canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
    canvas.freeDrawingBrush.width = options.currentWidth;
    canvas.isDrawingMode = true;
  }
};

const onSelectMode = (canvas) => {
  options.currentMode = '';
  canvas.isDrawingMode = false;

  canvas.off('mouse:down');
  canvas.off('mouse:move');
  canvas.off('mouse:up');

  canvas.getObjects().map((item) => item.set({ selectable: true }));
  canvas.hoverCursor = 'all-scroll';
};

const clearCanvas = (canvas) => {
  canvas.getObjects().forEach((item) => {
    if (item !== canvas.backgroundImage) {
      canvas.remove(item);
    }
  });
};

const canvasToJson = (canvas) => {
  alert(JSON.stringify(canvas.toJSON()));
};

const draw = (canvas) => {
  if (options.currentMode !== modes.PENCIL) {
    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');

    options.currentMode = modes.PENCIL;
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = parseInt(options.currentWidth, 10) || 1;
    canvas.isDrawingMode = true;
  }
};

const Whiteboard = () => {
  const { fileReader } = useSelector((state) => state);
  const [canvas, setCanvas] = useState(null);
  const [canvasJSON, setCanvasJSON] = useState(null);
  const [brushWidth, setBrushWidth] = useState(5);
  const [isFill, setIsFill] = useState(false);
  const fileUploadRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    setCanvas(() => initCanvas());
  }, []);

  useEffect(() => {
    if (canvas) {
      const center = canvas.getCenter();
      fabric.Image.fromURL(fileReader.currentPage, (img) => {
        const imgWidth = img.getBoundingRect().width;
        const imgHeight = img.getBoundingRect().height;

        // 判斷 pdf 橫直向
        if (imgWidth > imgHeight) {
          img.scaleToWidth(canvas.width);
        }

        if (imgWidth < imgHeight) {
          img.scaleToHeight(canvas.height);
        }

        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          top: center.top,
          left: center.left,
          originX: 'center',
          originY: 'center',
        });

        canvas.renderAll();
      });
    }
  }, [fileReader.currentPage]);

  useEffect(() => {
    if (canvas) {
      addCanvasEventListeners(canvas);
      canvas.loadFromJSON(canvasJSON);
      canvas.renderAll();
    }
  }, [canvas]);

  const addCanvasEventListeners = (canvas) => {
    canvas.on('mouse:up', (event) => {
      const data = JSON.stringify(canvas.toJSON());
    });
  };

  const uploadImage = (e) => {
    const reader = new FileReader();
    const file = e.files[0];

    reader.addEventListener('load', () => {
      fabric.Image.fromURL(reader.result, (img) => {
        canvas.add(img);
      });
    });

    reader.readAsDataURL(file);
  };

  const changeCurrentWidth = (e) => {
    const intValue = parseInt(e.target.value);
    options.currentWidth = intValue;
    canvas.freeDrawingBrush.width = intValue;
    setBrushWidth(() => intValue);
  };

  const changeCurrentColor = (e) => {
    options.currentColor = e.target.value;
    canvas.freeDrawingBrush.color = e.target.value;
  };

  const changeFill = (e) => {
    options.fill = e.checked;
    setIsFill(() => e.checked);
  };

  const onSaveCanvasAsImage = () => {
    canvasRef.current.toBlob(function (blob) {
      saveAs(blob, 'image.png');
    });
  };

  return (
    <div className={styles.whiteboard}>
      <div className={styles.toolbar}>
        <button className="p-button-info" onClick={() => createLine(canvas)}>
          <LineIcon />
        </button>
        <button className="p-button-info" onClick={() => createRect(canvas)}>
          <RectangleIcon />
        </button>
        <button className="p-button-info" onClick={() => createEllipse(canvas)}>
          <EllipseIcon />
        </button>
        <button className="p-button-info" onClick={() => createTriangle(canvas, options)}>
          <TriangleIcon />
        </button>
        <button icon="pi pi-pencil" className="p-button-info" onClick={() => draw(canvas)}>
          <PencilIcon />
        </button>
        <button className="p-button-info" onClick={() => changeToErasingMode(canvas)}>
          <EraserIcon />
        </button>
        <button className="p-button-secondary" onClick={() => createText(canvas)}>
          <TextIcon />
        </button>
        <button className="p-button-secondary" onClick={() => onSelectMode(canvas)}>
          <SelectIcon />
        </button>
        <input
          className="p-button-info p-button-rounded"
          type="color"
          onChange={changeCurrentColor}
        />
        <input
          type="range"
          min={1}
          max={20}
          step={1}
          value={brushWidth}
          onChange={changeCurrentWidth}
        />
        <Checkbox id="fill" checked={isFill} onChange={changeFill} />
        <label htmlFor="fill">fill</label>
        <button className="p-button-info p-button-rounded" onClick={() => clearCanvas(canvas)}>
          <SweepingIcon />
        </button>
        <button className="p-button-info p-button-rounded" onClick={() => canvasToJson(canvas)}>
          To Json
        </button>
        <FileUpload
          ref={fileUploadRef}
          multiple={false}
          name="demo[]"
          url="https://primefaces.org/primereact/showcase/upload.php"
          onUpload={uploadImage}
          accept="image/*"
          chooseOptions={chooseOptions}
          mode="basic"
          auto
          chooseLabel="Image"
        />

        <button
          icon="pi pi-download"
          className="p-button-info p-button-rounded"
          onClick={onSaveCanvasAsImage}
        >
          save as image
        </button>
      </div>
      <canvas ref={canvasRef} id="canvas" />
      <PdfReader />
    </div>
  );
};

export default Whiteboard;
