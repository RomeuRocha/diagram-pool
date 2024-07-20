import { DiagramElement } from '../elements/DiagramElement';
import { LinkBase } from './LinkBase';

export class BezierLink extends LinkBase {
  constructor(source: DiagramElement, target: DiagramElement) {
    super(source, target);
  }

  createSVGPath(): string {
    const startCoords = this.source.getCenterCoordinates();
    const endCoords = this.target.getCenterCoordinates();

    // Calcular pontos de controle
    const controlPoint1 = { x: startCoords.x, y: startCoords.y + (endCoords.y - startCoords.y) / 2 };
    const controlPoint2 = { x: endCoords.x, y: startCoords.y + (endCoords.y - startCoords.y) / 2 };

    // Criar o caminho SVG para a curva de Bézier
    return `M ${startCoords.x} ${startCoords.y} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${endCoords.x} ${endCoords.y}`;
  }

  render(): SVGPathElement {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', this.createSVGPath());
    path.setAttribute('stroke', 'black');
    path.setAttribute('fill', 'none');
    return path;
  }

  updatePosition(): void {
    const path = this.svgElement as SVGPathElement;
    path.setAttribute('d', this.createSVGPath());
  }
}
