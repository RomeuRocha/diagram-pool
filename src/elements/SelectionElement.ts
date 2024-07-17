import { DiagramElement } from "./DiagramElement";

export class SelectionElement {
    private rectElement: SVGRectElement | null = null;
    
    constructor() {
      this.rectElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      this.rectElement.setAttribute("fill", "none");
      this.rectElement.setAttribute("stroke", "rgb(0, 123, 255)");
      this.rectElement.setAttribute("stroke-width", "1");
      this.rectElement.setAttribute("stroke-dasharray", "4");
    }
  
    attach(parentNode: SVGElement): void {
      if (this.rectElement) {
        parentNode.appendChild(this.rectElement);
      }
    }
  
    update(x: number, y: number, width: number, height: number, type: string): void {
      console.log(type);
      
      if (this.rectElement) {
        if (type == 'circle' || type == 'diamond' ) {
          const newAnchorPoint = width/2;
          this.rectElement.setAttribute("x", `${x - newAnchorPoint}`);
          this.rectElement.setAttribute("y", `${y - newAnchorPoint}`);
        } else {
          this.rectElement.setAttribute("x", `${x}`);
          this.rectElement.setAttribute("y", `${y}`);
        }
        this.rectElement.setAttribute("width", `${width}`);
        this.rectElement.setAttribute("height", `${height}`);
      }
    }
  
    move(dx: number, dy: number): void {
      if (this.rectElement) {
        const x = parseFloat(this.rectElement.getAttribute("x") || "0");
        const y = parseFloat(this.rectElement.getAttribute("y") || "0");
        const newX = x + dx;
        const newY = y + dy;
        this.rectElement.setAttribute("x", `${newX}`);
        this.rectElement.setAttribute("y", `${newY}`);
      }
    }
  
    remove(): void {
      if (this.rectElement && this.rectElement.parentNode) {
        this.rectElement.parentNode.removeChild(this.rectElement);
      }
    }
  }
  