import { DiagramElement } from './DiagramElement';

export class Circle extends DiagramElement {
  radius: number;
  fillColor: string;
  borderColor: string;

  constructor(x: number, y: number, radius: number, fillColor: string, borderColor: string) {
    let largura = radius * 2;

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

  // Ajustado para receber o target como parâmetro
  getIntersection(target: DiagramElement) {
    const cx = this.x;
    const cy = this.y;
    const radius = this.radius;

    // Coordenadas do centro do "target" (pode ser um círculo ou outro retângulo)
    const targetCenter = target.getCenterCoordinates()
    const targetCenterX = targetCenter.x
    const targetCenterY = targetCenter.y

    const dx = targetCenterX - cx;
    const dy = targetCenterY - cy;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Calcula o ponto de interseção no círculo
    const x = cx + (dx / distance) * radius;
    const y = cy + (dy / distance) * radius;

    return { x, y };
  }

  
}
