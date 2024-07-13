import { Diagram } from '../Diagram';

export abstract class DiagramElement {
  id: string;
  x: number;
  y: number;
  width:number;
  height:number;
  type: string;

  protected isDraggable: boolean = true; // Padrão é true
  protected dragStartX: number = 0;
  protected dragStartY: number = 0;
  protected svgElement!: SVGElement; // Assertion non-null

  public isSelected: boolean = false;
  protected isSelectable: boolean = true;


  constructor(id: string, x: number, y: number, width:number,height:number,type: string) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
  }

  abstract render(): SVGElement;

  // Método para configurar eventos de drag
  enableDrag(): void {
    if (this.isDraggable) {

      this.svgElement?.addEventListener('mousedown', (event: MouseEvent) => {
        event.preventDefault();
        this.dragStartX = event.clientX - this.x;
        this.dragStartY = event.clientY - this.y;

        const onMouseMove = (moveEvent: MouseEvent) => {
          this.x = moveEvent.clientX - this.dragStartX;
          this.y = moveEvent.clientY - this.dragStartY;

          this.updatePosition(); // Método para atualizar a posição do elemento
        };

        const onMouseUp = () => {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    }
  }

  //habilitar seleção do elemento
  enableSelection(): void {
    this.svgElement?.addEventListener('mousedown', (event: MouseEvent) => {
      event.preventDefault();
      if (this.svgElement?.parentNode) {
        this.svgElement.parentNode.appendChild(this.svgElement);
      }
      this.isSelected = !this.isSelected;
      this.showEffectSelect();
    });

    this.svgElement?.addEventListener('mouseup', (event: MouseEvent) => {
      event.preventDefault();
      this.isSelected = !this.isSelected;
      this.showEffectSelect();
    });
   
  }

  //método para aplicar efeito de seleção no elemento
  showEffectSelect(): void {
    
      this.svgElement.style.opacity = this.isSelected ? '0.6' : '1.0';
   
  }


  select(): void {
    this.isSelected = true;
    this.showEffectSelect()
  }

  deselect(): void {
    this.isSelected = false;
    this.showEffectSelect()
  }

  setSelectable(logic: boolean) {
    this.isSelectable = logic;
  }

  // Método para desabilitar o drag
  disableDrag(): void {
    this.isDraggable = false;
  }


  protected abstract updatePosition(): void; // Método abstrato para atualizar posição do elemento

}
