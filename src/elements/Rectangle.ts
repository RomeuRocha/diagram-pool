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

  getRectangleIntersection(targetX: number, targetY: number) {
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
      intersectY = centerY + dy * (this.width / 2) / absDx;
    } else {
      // Intersects with top or bottom edge
      intersectY = dy > 0 ? this.y + this.height : this.y;
      intersectX = centerX + dx * (this.height / 2) / absDy;
    }

    // Clamp the intersection point to the edges of the rectangle
    intersectX = Math.min(Math.max(intersectX, this.x), this.x + this.width);
    intersectY = Math.min(Math.max(intersectY, this.y), this.y + this.height);

    return { x: intersectX, y: intersectY };
  }
  
}
