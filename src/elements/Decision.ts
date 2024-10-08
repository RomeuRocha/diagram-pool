import { DiagramElement } from './DiagramElement';

export class Decision extends DiagramElement {

  fillColor: string;
  borderColor: string;

  constructor(x: number, y: number, width: number, height: number, fillColor: string, borderColor: string) {
    super(x, y, width, height, 'decision');
    this.width = width;
    this.height = height;
    this.fillColor = fillColor;
    this.borderColor = borderColor;

    this.svgElement = this.render();
    this.initialize();
  }

  render(): SVGGraphicsElement {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect') as SVGGraphicsElement;
    rect.setAttribute('x', this.x.toString());
    rect.setAttribute('y', this.y.toString());
    rect.setAttribute('width', this.width.toString());
    rect.setAttribute('height', this.height.toString());
    rect.setAttribute('fill', this.fillColor);
    rect.setAttribute('stroke', this.borderColor);

     //aplique a rotação aqui

    return rect;
  }

  protected updatePosition(): void {
    this.svgElement.setAttribute('x', `${this.x}`);
    this.svgElement.setAttribute('y', `${this.y}`);
  }

 

}
