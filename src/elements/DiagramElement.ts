import { Diagram } from "../Diagram";

export abstract class DiagramElement {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;


  protected isDraggable: boolean = true; // Padrão é true
  protected dragStartX: number = 0;
  protected dragStartY: number = 0;
  public svgElement!: SVGElement; // Assertion non-null
  protected diagram!: Diagram; // Assertion non-null

  public isSelected: boolean = false;
  protected isSelectable: boolean = true;

  constructor(
    id: string,
    x: number,
    y: number,
    width: number,
    height: number,
    type: string
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
  }

  abstract render(): SVGElement;

  initialize(): void {
    if (this.isDraggable) {
      this.svgElement?.addEventListener("mousedown", (event: MouseEvent) => {
        event.preventDefault();
  
        // Move elemento para o topo "visibilidade"
        if (this.svgElement?.parentNode) {
          this.svgElement.parentNode.appendChild(this.svgElement);
        }
  
        // Limpa a seleção quando o diagrama não for não nulo
        if (this.diagram != null) {
          if (!event.shiftKey) {
            this.diagram.clearSelection();
          }
        }
  
        this.select();
  
        // Movimentação do elemento
        let lastX = event.clientX;
        let lastY = event.clientY;
  
        const onMouseMove = (moveEvent: MouseEvent) => {
          const deltaX = moveEvent.clientX - lastX;
          const deltaY = moveEvent.clientY - lastY;
  
          this.moveBy(deltaX, deltaY);
          this.relayMouseMoveToSelectedElements(deltaX, deltaY);
  
          // Atualizar a posição inicial para o próximo movimento
          lastX = moveEvent.clientX;
          lastY = moveEvent.clientY;
        };
  
        const onMouseUp = () => {
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
        };
  
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      });
    }
  }
  

moveBy(deltaX: number, deltaY: number): void {
  this.x += deltaX;
  this.y += deltaY;
  this.updatePosition();
}

relayMouseMoveToSelectedElements(deltaX: number, deltaY: number): void {
  const selectedElements = this.diagram.getSelectedElements();

  selectedElements.forEach(element => {
    if (element !== this) {
      element.moveBy(deltaX, deltaY);
    }
  });
}


  
  //método para aplicar efeito de seleção no elemento
  showEffectSelect(): void {
    this.svgElement.style.opacity = this.isSelected ? "0.6" : "1.0";
    // Quando o elemento for selecionado adiciona box shadown
    if (this.isSelected) {
      this.svgElement.setAttribute("filter", "url(#drop-shadow)")
    } else {
      this.svgElement.removeAttribute("filter")
    }
  }




  select(): void {
    this.isSelected = true;
    this.showEffectSelect();
  }

  deselect(): void {
    this.isSelected = false;
    this.showEffectSelect();
  }

  setSelectable(logic: boolean) {
    this.isSelectable = logic;
  }

  // Método para desabilitar o drag
  disableDrag(): void {
    this.isDraggable = false;
  }

  protected abstract updatePosition(): void; // Método abstrato para atualizar posição do elemento

  setDiagram(diagram: Diagram): void {
    this.diagram = diagram;
  }
}
