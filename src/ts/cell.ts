import P5 from "p5";

class Cell {
    // prettier-ignore
    public walls: [boolean, boolean, boolean, boolean] = [true, true, true, true];
    public visited: boolean = false;
    constructor(public x: number, public y: number) {}

    public show(w: number, p: P5): void {
        const x = this.x * w;
        const y = this.y * w;
        p.stroke(200);
        const wallsEquations = [
            [x + 0, y + 0, x + w, y + 0],
            [x + w, y + 0, x + w, y + w],
            [x + w, y + w, x + 0, y + w],
            [x + 0, y + w, x + 0, y + 0]
        ];

        wallsEquations
            .filter((_, idx) => this.walls[idx])
            .forEach(args => p.line.apply(p, args));

        if (this.visited) {
            p.fill(255, 0, 255, 100);
            p.rect(x, y, w, w);
        }
    }

    public checkNeighbors(grid: Cell[][], p: P5): Cell | undefined {
        const neighbors: Cell[] = [
            [this.x + 0, this.y - 1], // top
            [this.x + 1, this.y + 0], // right
            [this.x + 0, this.y + 1], // bottom
            [this.x - 1, this.y + 0] // left
        ]
            .map(([x, y]) => grid?.[y]?.[x])
            .filter(v => !!v)
            .filter(v => !v.visited);

        if (neighbors.length) {
            const idx = p.floor(p.random(0, neighbors.length));
            return neighbors[idx];
        }
    }
}

export { Cell };
