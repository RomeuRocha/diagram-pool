import { DiagramElement } from './elements/DiagramElement';

export interface DiagramConfig {
  container: HTMLElement;
}

export class Diagram {
  container: HTMLElement;
  elements: DiagramElement[] = [];


  private svg: SVGSVGElement;


  private selectionRect: SVGRectElement | null = null;

  constructor(config: DiagramConfig) {
    this.container = config.container;
    this.svg = this.createSvgElement();
    this.container.appendChild(this.svg);

    this.initSelectionRectangle();
  }

  private createSvgElement(): SVGSVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    

    // Adiciona filtro para aplicação de sombra nos elementos
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', 'drop-shadow');
    filter.innerHTML = `
      <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
      <feOffset in="blur" dx="2" dy="2" result="offsetBlur" />
      <feMerge>
        <feMergeNode in="offsetBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    `;
  svg.appendChild(filter);

    return svg;
  }



  addElement(element: DiagramElement) {

    element.setDiagram(this)
    this.elements.push(element);

    this.svg.appendChild(element.render());

  }

  clearSelection(): void{
    this.elements.forEach((element) => {
      element.deselect();
    });
  }

  refresh() {
    // Limpar todos os elementos do SVG
    while (this.svg.firstChild) {
      this.svg.removeChild(this.svg.firstChild);
    }

    // Renderizar novamente todos os elementos
    this.elements.forEach(element => {
      this.svg.appendChild(element.render());
    });
  }

  getSelectedElements(): DiagramElement[] {
    return this.elements.filter(element => element.isSelected);
  }



  // Método para inicializar o retângulo de seleção
  private initSelectionRectangle(): void {
    this.svg.addEventListener('mousedown', (event: MouseEvent) => {
      if (event.target !== this.svg) return;

      this.selectionRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      this.selectionRect.setAttribute('fill', 'rgba(0, 0, 0, 0.2)');
      this.selectionRect.setAttribute('rx', '4'); // adiciona um raio de 10 pixels para as quinas do retângulo
      this.svg.appendChild(this.selectionRect);

      const startX = event.offsetX;
      const startY = event.offsetY;

      this.selectionRect.setAttribute('x', `${startX}`);
      this.selectionRect.setAttribute('y', `${startY}`);

      const onMouseMove = (moveEvent: MouseEvent) => {
        const currentX = moveEvent.offsetX;
        const currentY = moveEvent.offsetY;
        const width = currentX - startX;
        const height = currentY - startY;
        if (this.selectionRect) {
          this.selectionRect.setAttribute('width', `${Math.abs(width)}`);
          this.selectionRect.setAttribute('height', `${Math.abs(height)}`);

          if (width < 0) {
            this.selectionRect.setAttribute('x', `${currentX}`);
          }
          if (height < 0) {
            this.selectionRect.setAttribute('y', `${currentY}`);
          }
        }

      };

      const onMouseUp = () => {
        this.svg.removeEventListener('mousemove', onMouseMove);
        this.svg.removeEventListener('mouseup', onMouseUp);

        // Aqui você pode adicionar a lógica para verificar quais elementos estão dentro do retângulo de seleção

        if (this.selectionRect) {
          const selectionBox = this.selectionRect.getBBox();

          this.elements.forEach(element => {
            if (this.checkIfElementIsSelected(element, selectionBox)) {
              element.select();
            } else {
              element.deselect();
            }
          });

          this.svg.removeChild(this.selectionRect);
          this.selectionRect = null;

        }
      };

      this.svg.addEventListener('mousemove', onMouseMove);
      this.svg.addEventListener('mouseup', onMouseUp);
    });
  }


  private checkIfElementIsSelected(element: DiagramElement, selectionBox: DOMRect): boolean {
    

    return (
      element.x >= selectionBox.x &&
      element.y >= selectionBox.y &&
      (element.x + element.width) <= (selectionBox.x + selectionBox.width) &&
      (element.y + element.height) <= (selectionBox.y + selectionBox.height)
    );
  }
  


}
