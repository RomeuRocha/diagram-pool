import { DiagramElement } from './DiagramElement';

export class Circle extends DiagramElement {
  radius: number;
  fillColor: string;
  borderColor: string;

  constructor(x: number, y: number, radius: number, fillColor: string, borderColor: string) {
    let largura = radius * 2

    super(x, y, largura, largura, 'circle');
    this.radius = radius;
    this.fillColor = fillColor;
    this.borderColor = borderColor;
    this.svgElement = this.render();
    this.initialize();
  }

  render(): SVGGraphicsElement {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle') as SVGGraphicsElement;
    circle.setAttribute('cx', this.x.toString());
    circle.setAttribute('cy', this.y.toString());
    circle.setAttribute('r', this.radius.toString());
    circle.setAttribute('fill', this.fillColor);
    circle.setAttribute('stroke', this.borderColor);
    return circle;
  }

  protected updatePosition(): void {
    this.svgElement.setAttribute('cx', `${this.x}`);
    this.svgElement.setAttribute('cy', `${this.y}`);
  }

  getCenterCoordinates(): { x: number; y: number } {
    return {
      x: this.x,
      y: this.y,
    };
  }

  getCircleIntersection( targetX: number, targetY: number) {
    const cx = this.x;
    const cy = this.y;
    const radius = this.radius;
  
    const dx = targetX - cx;
    const dy = targetY - cy;
    const distance = Math.sqrt(dx * dx + dy * dy);
  
    const x = cx + (dx / distance) * radius;
    const y = cy + (dy / distance) * radius;
  
    return { x, y };
  }
  
}
