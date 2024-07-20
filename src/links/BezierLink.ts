import { Rectangle } from '../elements/Rectangle';
import { DiagramElement } from '../elements/DiagramElement';
import { LinkBase } from './LinkBase';

export class BezierLink extends LinkBase {
  constructor(source: DiagramElement, target: DiagramElement) {
    super(source, target);
  }

  createSVGPath(): string {
    const startCoords = this.getIntersectionCoordinates(this.source, this.target);
    const endCoords = this.getIntersectionCoordinates(this.target, this.source);

    // Calcular pontos de controle
    const controlPoint1 = { x: startCoords.x, y: startCoords.y + (endCoords.y - startCoords.y) / 2 };
    const controlPoint2 = { x: endCoords.x, y: startCoords.y + (endCoords.y - startCoords.y) / 2 };

    // Criar o caminho SVG para a curva de Bézier
    return `M ${startCoords.x} ${startCoords.y} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${endCoords.x} ${endCoords.y}`;
  }

  getIntersectionCoordinates(fromElement: DiagramElement, toElement: DiagramElement) {
    const targetX = toElement.x + toElement.width / 2;
    const targetY = toElement.y + toElement.height / 2;

    if (fromElement instanceof Rectangle) {
      return fromElement.getRectangleIntersection(targetX, targetY);
    } else {
      // Fallback: use center coordinates if shape is unknown
      return { x: fromElement.x + fromElement.width / 2, y: fromElement.y + fromElement.height / 2 };
    }
  }

  render(): SVGPathElement {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', this.createSVGPath());
    path.setAttribute('stroke', 'black');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-width', '2'); // Define a espessura da linha
    this.svgElement = path; // Save reference for future updates
    return path;
  }
  

  updatePosition(): void {
    const path = this.svgElement as SVGPathElement;
    path.setAttribute('d', this.createSVGPath());
  }
}
