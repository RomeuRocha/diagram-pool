import { DiagramElement } from './DiagramElement';

export class Circle extends DiagramElement {
  radius: number;
  fillColor: string;
  borderColor: string;

  constructor(id: string, x: number, y: number, radius: number, fillColor: string, borderColor: string) {
    let largura = radius/2

    super(id, x, y,largura,largura, 'circle');
    this.radius = radius;
    this.fillColor = fillColor;
    this.borderColor = borderColor;
  }

  render(): SVGElement {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', this.x.toString());
    circle.setAttribute('cy', this.y.toString());
    circle.setAttribute('r', this.radius.toString());
    circle.setAttribute('fill', this.fillColor);
    circle.setAttribute('stroke', this.borderColor);

    this.svgElement = circle;
    this.enableDrag();
    this.enableSelection();

    return circle;
  }

  protected updatePosition(): void {
    this.svgElement.setAttribute('cx', `${this.x}`);
    this.svgElement.setAttribute('cy', `${this.y}`);
  }
}
