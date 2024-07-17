import { DiagramElement } from './DiagramElement';

export class UMLElement extends DiagramElement {
  className: string;
  attributes: string[];
  methods: string[];


 
  constructor(x: number, y: number, className: string, attributes: string[], methods: string[]) {
    super(x, y,200,500, 'uml');
    this.className = className;
    this.attributes = attributes;
    this.methods = methods;

    this.svgElement = this.render();
    this.initialize()
  }

  render(): SVGElement {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', `${this.x}`);
    rect.setAttribute('y', `${this.y}`);
    rect.setAttribute('width', '200');
    rect.setAttribute('height', `${this.calculateHeight()}`);
    rect.setAttribute('fill', 'white');
    rect.setAttribute('stroke', 'black');
    rect.setAttribute('stroke-width', '2');

    const classNameText = this.createTextElement(this.className, this.x + 10, this.y + 20, 'bold');
    const attributesText = this.createTextBlock(this.attributes, this.x + 10, this.y + 40);
    const methodsText = this.createTextBlock(this.methods, this.x + 10, this.y + 60 + this.attributes.length * 20);

    group.appendChild(rect);
    group.appendChild(classNameText);
    attributesText.forEach(attr => group.appendChild(attr));
    methodsText.forEach(method => group.appendChild(method));

    this.svgElement = group;
    return group;
  }

  private calculateHeight(): number {
    return 80 + (this.attributes.length + this.methods.length) * 20;
  }

  private createTextElement(content: string, x: number, y: number, fontWeight: string = 'normal'): SVGTextElement {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', `${x}`);
    text.setAttribute('y', `${y}`);
    text.setAttribute('font-family', 'Arial, sans-serif');
    text.setAttribute('font-size', '14');
    text.setAttribute('font-weight', fontWeight);
    text.textContent = content;
    return text;
  }

  private createTextBlock(lines: string[], x: number, startY: number): SVGTextElement[] {
    return lines.map((line, index) => this.createTextElement(line, x, startY + index * 20));
  }

  updatePosition(): void {
    if (this.svgElement) {
      const rect = this.svgElement.querySelector('rect');
      if (rect) {
        rect.setAttribute('x', `${this.x}`);
        rect.setAttribute('y', `${this.y}`);
      }

      const texts = this.svgElement.querySelectorAll('text');
      if (texts.length > 0) {
        texts[0].setAttribute('x', `${this.x + 10}`);
        texts[0].setAttribute('y', `${this.y + 20}`);

        const attributesStartY = this.y + 40;
        const methodsStartY = this.y + 60 + this.attributes.length * 20;

        for (let i = 0; i < this.attributes.length; i++) {
          texts[i + 1].setAttribute('x', `${this.x + 10}`);
          texts[i + 1].setAttribute('y', `${attributesStartY + i * 20}`);
        }

        for (let i = 0; i < this.methods.length; i++) {
          texts[this.attributes.length + 1 + i].setAttribute('x', `${this.x + 10}`);
          texts[this.attributes.length + 1 + i].setAttribute('y', `${methodsStartY + i * 20}`);
        }
      }
    }
  }


}
