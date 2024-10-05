import { Diagram } from "../Diagram";
import { UUID } from "../util/UUID";
import { SelectionElement } from "./SelectionElement"; // Certifique-se de importar corretamente

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
  public svgElement!: SVGGraphicsElement; // Assertion non-null
  protected diagram!: Diagram; // Assertion non-null
  protected selectionElement?: SelectionElement; // Instância de SelectionElement

  public isSelected: boolean = false;
  protected isSelectable: boolean = true;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    type: string
  ) {
    this.id = UUID.GenerateGUID();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
  }

  abstract render(): SVGElement;

  initialize(): void {
    // Adiciona sombra a todos os elementos
    this.svgElement.setAttribute('filter', 'url(#drop-shadow)');

    if (this.isDraggable) {
      this.svgElement?.addEventListener("mousedown", (event: MouseEvent) => {
        event.preventDefault();

        // Move elemento para o topo "visibilidade"
        if (this.svgElement?.parentNode) {
          this.svgElement.parentNode.appendChild(this.svgElement);
        }

        // Limpa a seleção quando o diagrama não for nulo
        if (this.diagram != null) {
          if (event.shiftKey) {
            if (this.isSelected) {
              this.deselect();
            } else {
              this.select();
            }
          } else {
            if (!this.isSelected) {
              this.diagram.clearSelection();
              this.select();
            }
          }
        }

        // Movimentação do elemento
        let lastX = event.clientX;
        let lastY = event.clientY;

        const onMouseMove = (moveEvent: MouseEvent) => {
          const deltaX = moveEvent.clientX - lastX;
          const deltaY = moveEvent.clientY - lastY;

          if (this.isSelected) {
            this.moveBy(deltaX, deltaY);
            this.relayMouseMoveToSelectedElements(deltaX, deltaY);
          }

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

    let links = this.diagram.getLinks();

    links.map(link => {
      if (link.source == this || link.target == this)
        link.updatePosition();
    });

    this.updatePosition();

    // Atualiza a posição do retângulo de seleção, se estiver selecionado
    if (this.isSelected && this.selectionElement) {
      this.selectionElement.move(deltaX, deltaY);
    }
  }

  relayMouseMoveToSelectedElements(deltaX: number, deltaY: number): void {
    const selectedElements = this.diagram.getSelectedElements();

    selectedElements.forEach(element => {
      if (element !== this) {
        element.moveBy(deltaX, deltaY);
      }
    })
  }

  // Método para aplicar efeito de seleção no elemento
  showEffectSelect(): void {
    // Quando o elemento for selecionado, adiciona o retângulo de seleção
    if (this.isSelected) {
      this.svgElement.style.opacity = "0.8";
      // Cria o retângulo de seleção se ainda não existir
      if (!this.selectionElement) {
        this.selectionElement = new SelectionElement();
        this.selectionElement.update(this.x, this.y, this.width, this.height, this.type);
        this.selectionElement.attach(this.svgElement.parentNode as SVGElement);
      } else {
        this.selectionElement.update(this.x, this.y, this.width, this.height, this.type);
      }
    } else {
      this.svgElement.style.opacity = "1.0";
      // Remove o retângulo de seleção se existir
      if (this.selectionElement) {
        this.selectionElement.remove();
        this.selectionElement = undefined;
      }
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

  getCenterCoordinates(): { x: number; y: number } {
    // Obtém as coordenadas do bounding box
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2,
    };
  }

  /*
  getIntersection(targetX: number, targetY: number) {
    return this.getCenterCoordinates();
  }*/

    getIntersection(target: DiagramElement) {
      return this.getCenterCoordinates();
    }


}
