import Konva from 'konva';

const stage = new Konva.Stage({
  container: 'container',
  width: 400,
  height: 400
});

const layer = new Konva.Layer();
stage.add(layer);

let rubber;
class State {
  handleMouseClick(event) { }
  handleMouseMove(event) { }
}
class IdleState extends State {
  handleMouseClick(event) {
      createLine(event);
      currentState = States.DRAWING;
  }
}
class DrawingState extends State {
  handleMouseMove(event) {
      setLastPoint(event);
  }
  handleMouseClick(event) {
      saveLine();
      currentState = States.IDLE;
  }
}

// On énumère les états du statechart
const States = {
  IDLE: new IdleState(),
  DRAWING: new DrawingState()
}
// L'état courant
let currentState = States.IDLE;
// On délègue la gestion des événements
// à l'état courant
stage.on('click', (e) => {
  currentState.handleMouseClick(e);
});
stage.on('mousemove', (e) => {
  currentState.handleMouseMove(e);
});

// == Les actions en réponse aux événements ==
/**
* Enregistre le premier point de la ligne.
* @param {Event} event - The mouse event.
*/
function createLine(event) {
  const pos = stage.getPointerPosition();
  rubber = new Konva.Line({
      points: [pos.x, pos.y, pos.x, pos.y],
      stroke: 'red',
      strokeWidth: 2
  });
  layer.add(rubber);
}
/**
* Enregistre le second point de la ligne.
* @param {Event} event - The mouse event.
*/
function setLastPoint(event) {
  const pos = stage.getPointerPosition();
  rubber.points([rubber.points()[0], rubber.points()[1], pos.x, pos.y]);
  layer.batchDraw();
}

/**
* Enregistre la ligne provisoire dans le tableau des lignes.
*/
function saveLine() {
  // On clone la ligne provisoire et on l'ajoute au tableau
}