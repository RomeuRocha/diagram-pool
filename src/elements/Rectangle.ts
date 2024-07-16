import { DiagramElement } from './DiagramElement';

export class Rectangle extends DiagramElement {

  fillColor: string;
  borderColor: string;

  constructor(id: string, x: number, y: number, width: number, height: number, fillColor: string, borderColor: string) {
    super(id, x, y,width,height, 'rectangle');
    this.width = width;
    this.height = height;
    this.fillColor = fillColor;
    this.borderColor = borderColor;

    this.svgElement = this.render();

    this.initialize()

  }

  render(): SVGElement {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', this.x.toString());
    rect.setAttribute('y', this.y.toString());
    rect.setAttribute('width', this.width.toString());
    rect.setAttribute('height', this.height.toString());
    rect.setAttribute('fill', this.fillColor);
    rect.setAttribute('stroke', this.borderColor);
    return rect;
  }

  protected updatePosition(): void {
    this.svgElement.setAttribute('x', `${this.x}`);
    this.svgElement.setAttribute('y', `${this.y}`);
  }

 
}
