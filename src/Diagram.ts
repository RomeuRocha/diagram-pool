import { DiagramElement } from './elements/DiagramElement';

export interface DiagramConfig {
  container: HTMLElement;
}

export class Diagram {
  container: HTMLElement;
  elements: DiagramElement[] = [];


  private svg: SVGSVGElement;

  constructor(config: DiagramConfig) {
    this.container = config.container;
    this.svg = this.createSvgElement();
    this.container.appendChild(this.svg);
  }

  private createSvgElement(): SVGSVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    return svg;
}

  

  addElement(element: DiagramElement) {
   
    this.elements.push(element);

    this.svg.appendChild(element.render());

  }

 
}
