import { DiagramElement } from '../elements/DiagramElement';

export class LinkBase {
  source: DiagramElement;
  target: DiagramElement;
  public svgElement!: SVGElement;

  constructor(source: DiagramElement, target: DiagramElement) {
    this.source = source;
    this.target = target;
    this.svgElement = this.render();
  }

  render(): SVGElement {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', `${this.source.getCenterCoordinates().x}`);
    line.setAttribute('y1', `${this.source.getCenterCoordinates().y}`);
    line.setAttribute('x2', `${this.target.getCenterCoordinates().x}`);
    line.setAttribute('y2', `${this.target.getCenterCoordinates().y}`);
    line.setAttribute('stroke', 'black');
    line.setAttribute('stroke-width', '2');

    this.svgElement = line;
    return line;
  }

  updatePosition(): void {
    if (this.svgElement) {
        
      this.svgElement.setAttribute('x1', `${this.source.getCenterCoordinates().x}`);
      this.svgElement.setAttribute('y1', `${this.source.getCenterCoordinates().y}`);
      this.svgElement.setAttribute('x2', `${this.target.getCenterCoordinates().x}`);
      this.svgElement.setAttribute('y2', `${this.target.getCenterCoordinates().y}`);
    }
  }

  
}
