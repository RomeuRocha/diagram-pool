import { DiagramElement } from './DiagramElement';

export class Diamond extends DiagramElement {
    private size: number;
    private fillColor: string;
    private borderColor: string;

    constructor(x: number, y: number, size: number, fillColor: string, borderColor: string) {

        super(x, y, size, size, 'diamond');
        this.size = size;
        this.fillColor = fillColor;
        this.borderColor = borderColor;
        this.svgElement = this.render();
        this.initialize();
    }

    render(): SVGGraphicsElement {
        const halfSize = this.size / 2;
        const diamond = document.createElementNS('http://www.w3.org/2000/svg', 'polygon') as SVGGraphicsElement;
        diamond.setAttribute('points', `${this.x},${this.y - halfSize} ${this.x + halfSize},${this.y} ${this.x},${this.y + halfSize} ${this.x - halfSize},${this.y}`);
        diamond.setAttribute('fill', this.fillColor);
        diamond.setAttribute('stroke', this.borderColor);
        diamond.setAttribute('stroke-width', '2');
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

    getCenterCoordinates(): { x: number; y: number } {
        return {
            x: this.x,
            y: this.y,
        };
    }

    getIntersection(target: DiagramElement) {
        const centerX = this.x;
        const centerY = this.y;
    
        const targetCenter = target.getCenterCoordinates();
        const targetX = targetCenter.x;
        const targetY = targetCenter.y;
    
        // Definindo os vértices do losango
        const halfSize = this.size / 2;
        const topY = centerY - halfSize;
        const bottomY = centerY + halfSize;
        const leftX = centerX - halfSize;
        const rightX = centerX + halfSize;
    
        const vertices = [
            { x: centerX, y: topY }, // Vértice superior
            { x: rightX, y: centerY }, // Vértice direito
            { x: centerX, y: bottomY }, // Vértice inferior
            { x: leftX, y: centerY } // Vértice esquerdo
        ];
    
        // Interseções com cada lado do losango
        const intersections = vertices.map((vertex, index) => {
            const nextVertex = vertices[(index + 1) % vertices.length];
            return this.lineIntersect(centerX, centerY, targetX, targetY, vertex.x, vertex.y, nextVertex.x, nextVertex.y);
        });
    
        // Retornar o primeiro ponto de interseção encontrado
        for (const intersection of intersections) {
            if (intersection) {
                return intersection;
            }
        }
    
        // Se não houver interseção, retornar o centro
        return { x: centerX, y: centerY };
    }
    
    lineIntersect(x1:number, y1:number, x2:number, y2:number, x3:number, y3:number, x4:number, y4:number) {
        const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
        if (denominator === 0) return null; // As linhas são paralelas
    
        const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
        const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;
    
        // Verifica se a interseção está dentro dos segmentos
        if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
            const intersectX = x1 + ua * (x2 - x1);
            const intersectY = y1 + ua * (y2 - y1);
            return { x: intersectX, y: intersectY };
        }
    
        return null; // Sem interseção
    }
    
    
    


}



