import P5 from "p5";
import { Cell } from "./cell";

let cols: number, rows: number;
const w = 40;
const grid: Cell[][] = [];
let current: Cell;

new P5((p: P5) => {
    p.setup = () => {
        console.log("set up...");
        p.frameRate(5);
        p.createCanvas(400, 400);
        cols = p.floor(p.width / w);
        rows = p.floor(p.height / w);

        for (let y = 0; y < rows; y++) {
            const row: Cell[] = [];
            for (let x = 0; x < cols; x++) {
                const cell = new Cell(x, y);
                row.push(cell);
            }
            grid.push(row);
        }
        current = grid[0][0];
    };

    p.draw = () => {
        p.background(51);
        for (const row of grid) {
            for (const cell of row) {
                cell.show(w, p);
            }
        }
        current.visited = true;
        let next = current.checkNeighbors(grid, p);
        if (next) {
            next.visited = true;
            current = next;
        }
    };
});
