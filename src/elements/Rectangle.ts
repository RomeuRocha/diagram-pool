import { DiagramElement } from './DiagramElement';

export class Rectangle extends DiagramElement {

  fillColor: string;
  borderColor: string;

  constructor(x: number, y: number, width: number, height: number, fillColor: string, borderColor: string) {
    super(x, y, width, height, 'rectangle');
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
    return rect;
  }

  protected updatePosition(): void {
    this.svgElement.setAttribute('x', `${this.x}`);
    this.svgElement.setAttribute('y', `${this.y}`);
  }

  /*

  getIntersection(targetX: number, targetY: number) {
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;

    const dx = targetX - centerX;
    const dy = targetY - centerY;

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    let intersectX, intersectY;

    if (absDx > absDy) {
      // Intersects with left or right edge
      intersectX = dx > 0 ? this.x + this.width : this.x;
      // Proporção da altura para o movimento vertical
      intersectY = centerY + (dy / absDx) * (this.height / 2);
    } else {
      // Intersects with top or bottom edge
      intersectY = dy > 0 ? this.y + this.height : this.y;
      // Proporção da largura para o movimento horizontal
      intersectX = centerX + (dx / absDy) * (this.width / 2);
    }

    // Limitar o ponto de interseção aos limites do retângulo
    intersectX = Math.min(Math.max(intersectX, this.x), this.x + this.width);
    intersectY = Math.min(Math.max(intersectY, this.y), this.y + this.height);

    return { x: intersectX, y: intersectY };
  }
 */

  getIntersection(target: DiagramElement) {
    // Coordenadas do centro do "source" (retângulo)
    const sourceCenter = this.getCenterCoordinates()
    const sourceCenterX = sourceCenter.x
    const sourceCenterY = sourceCenter.y

    // Coordenadas do centro do "target" (pode ser um círculo ou outro retângulo)
    const targetCenter = target.getCenterCoordinates()
    const targetCenterX = targetCenter.x
    const targetCenterY = targetCenter.y

    // Vetores de direção (delta)
    const dx = targetCenterX - sourceCenterX;
    const dy = targetCenterY - sourceCenterY;

    // Calcular a inclinação (slope) e a inclinação absoluta
    const slope = dy / dx;
    const absSlope = Math.abs(slope);

    let intersectX, intersectY;

    // Se a inclinação é maior, então intersecciona no topo ou embaixo
    if (absSlope > (this.height / this.width)) {
      // Interseção com borda superior ou inferior
      if (dy > 0) {
        intersectY = this.y + this.height; // parte inferior
      } else {
        intersectY = this.y; // parte superior
      }
      // Calcula a coordenada X de interseção com base na inclinação
      intersectX = sourceCenterX + (intersectY - sourceCenterY) / slope;

      // Garantir que o ponto de interseção está dentro da largura do retângulo
      intersectX = Math.max(this.x, Math.min(intersectX, this.x + this.width));

    } else {
      // Interseção com borda esquerda ou direita
      if (dx > 0) {
        intersectX = this.x + this.width; // lado direito
      } else {
        intersectX = this.x; // lado esquerdo
      }
      // Calcula a coordenada Y de interseção com base na inclinação
      intersectY = sourceCenterY + slope * (intersectX - sourceCenterX);

      // Garantir que o ponto de interseção está dentro da altura do retângulo
      intersectY = Math.max(this.y, Math.min(intersectY, this.y + this.height));
    }

    return { x: intersectX, y: intersectY };
  }


}
