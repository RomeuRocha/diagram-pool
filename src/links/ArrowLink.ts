import { DiagramElement } from '../elements/DiagramElement';
import { LinkBase } from './LinkBase';

export class ArrowLink extends LinkBase {
  constructor(source: DiagramElement, target: DiagramElement) {
    super(source, target);
  }

  render(): SVGElement {
    const svgNS = 'http://www.w3.org/2000/svg';

    // Create a group to contain the line and arrowhead
    const group = document.createElementNS(svgNS, 'g');

    // Create the line
    const line = document.createElementNS(svgNS, 'line');
    /*const start = this.source.getIntersection(this.target.getCenterCoordinates().x, this.target.getCenterCoordinates().y);
    const end = this.target.getIntersection(this.source.getCenterCoordinates().x, this.source.getCenterCoordinates().y);
    */

    const start = this.source.getIntersection(this.target);
    const end = this.target.getIntersection(this.source);

    line.setAttribute('x1', `${start.x}`);
    line.setAttribute('y1', `${start.y}`);
    line.setAttribute('x2', `${end.x}`);
    line.setAttribute('y2', `${end.y}`);
    line.setAttribute('stroke', 'black');
    line.setAttribute('stroke-width', '2');

    // Create the arrowhead
    const arrowhead = document.createElementNS(svgNS, 'path');
    const arrowSize = 20; // Size of the arrowhead
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    const arrowPath = `
      M ${end.x} ${end.y}
      L ${end.x - arrowSize * Math.cos(angle - Math.PI / 6)} ${end.y - arrowSize * Math.sin(angle - Math.PI / 6)}
      L ${end.x - arrowSize * Math.cos(angle + Math.PI / 6)} ${end.y - arrowSize * Math.sin(angle + Math.PI / 6)}
      Z
    `;

    arrowhead.setAttribute('d', arrowPath);
    arrowhead.setAttribute('fill', 'black');

    // Append the line and arrowhead to the group
    group.appendChild(line);
    group.appendChild(arrowhead);

    this.svgElement = group;
    return group;
  }

  updatePosition(): void {
    if (this.svgElement) {
      const line = this.svgElement.querySelector('line');
      const arrowhead = this.svgElement.querySelector('path');
      if (line && arrowhead) {
        //const start = this.source.getIntersection(this.target.getCenterCoordinates().x, this.target.getCenterCoordinates().y);
        //const end = this.target.getIntersection(this.source.getCenterCoordinates().x, this.source.getCenterCoordinates().y);

        const start = this.source.getIntersection(this.target);
        const end = this.target.getIntersection(this.source);

        line.setAttribute('x1', `${start.x}`);
        line.setAttribute('y1', `${start.y}`);
        line.setAttribute('x2', `${end.x}`);
        line.setAttribute('y2', `${end.y}`);

        const arrowSize = 20; // Size of the arrowhead
        const angle = Math.atan2(end.y - start.y, end.x - start.x);
        const arrowPath = `
          M ${end.x} ${end.y}
          L ${end.x - arrowSize * Math.cos(angle - Math.PI / 6)} ${end.y - arrowSize * Math.sin(angle - Math.PI / 6)}
          L ${end.x - arrowSize * Math.cos(angle + Math.PI / 6)} ${end.y - arrowSize * Math.sin(angle + Math.PI / 6)}
          Z
        `;

        arrowhead.setAttribute('d', arrowPath);
      }
    }
  }
}
