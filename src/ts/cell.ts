import P5 from "p5";

class Cell {
    public walls: [boolean, boolean, boolean, boolean] = [
        true,
        true,
        true,
        true
    ];
    constructor(public i: number, public j: number) {}

    public show(w: number, p: P5): void {
        const x = this.i * w;
        const y = this.j * w;
        p.stroke(200);
        const wallsEquations = [
            [x + 0, y + 0, x + w, y + 0],
            [x + w, y + 0, x + w, y + w],
            [x + w, y + w, x + 0, y + w],
            [x + 0, y + w, x + 0, y + 0]
        ];

        wallsEquations
            .filter((_, i) => this.walls[i])
            .forEach(args => p.line.apply(p, args));
    }
}

export { Cell };
