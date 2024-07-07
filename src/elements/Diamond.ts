import { DiagramElement } from './DiagramElement';

export class Diamond extends DiagramElement {
    private size: number;
    private fillColor: string;
    private borderColor: string;

    constructor(id: string, x: number, y: number, size: number, fillColor: string, borderColor: string) {
        super(id, x, y, 'diamond');
        this.size = size;
        this.fillColor = fillColor;
        this.borderColor = borderColor;
        this.render();
    }

    render(): SVGElement {
        const halfSize = this.size / 2;

        const diamond = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        diamond.setAttribute('points', `${this.x},${this.y - halfSize} ${this.x + halfSize},${this.y} ${this.x},${this.y + halfSize} ${this.x - halfSize},${this.y}`);
        diamond.setAttribute('fill', this.fillColor);
        diamond.setAttribute('stroke', this.borderColor);
        diamond.setAttribute('stroke-width', '2');

        this.svgElement = diamond;

        this.enableDrag();

        return diamond;
    }

    protected updatePosition(): void {
        // Calcula os novos pontos do losango
        const halfSize = this.size / 2;
        const points = `${this.x},${this.y - halfSize} ${this.x + halfSize},${this.y} ${this.x},${this.y + halfSize} ${this.x - halfSize},${this.y}`;

        // Atualiza os pontos do elemento SVG
        if (this.svgElement) {
            this.svgElement.setAttribute('points', points);
        }
    }

}
