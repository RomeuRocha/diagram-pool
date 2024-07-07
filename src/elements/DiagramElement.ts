import { Diagram } from '../Diagram';

export abstract class DiagramElement {
  id: string;
  x: number;
  y: number;
  type: string;

  protected isDraggable: boolean = true; // Padrão é true
  protected dragStartX: number = 0;
  protected dragStartY: number = 0;
  protected svgElement!: SVGElement; // Assertion non-null

  constructor(id: string, x: number, y: number, type: string) {
    this.id = id;
    this.x = x;
    this.y = y;
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

  // Método para desabilitar o drag
  disableDrag(): void {
    this.isDraggable = false;
  }

  protected abstract updatePosition(): void; // Método abstrato para atualizar posição do elemento

}
