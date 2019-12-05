import P5 from "p5";
import { Cell } from "./cell";

let cols: number, rows: number;
const w = 50;
const grid: Cell[][] = [];
let current: Cell;
const stack: Cell[] = [];

new P5((p: P5) => {
    p.setup = () => {
        console.log("set up...");
        // p.frameRate(1);
        p.createCanvas(500, 500);
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
        current.highlight(w, p);
        let next = current.checkNeighbors(grid, p);

        for (const cell of stack) {
            cell.highlight(w, p, 56, 150);
        }

        if (next) {
            next.visited = true;
            stack.push(current);
            removeWalls(current, next);
            current = next;
        } else if (stack.length) {
            current = stack.pop();
        }
    };
});

function removeWalls(current: Cell, next: Cell) {
    const x = current.x - next.x;
    if (x === 1) {
        current.walls[3] = next.walls[1] = false;
    }
    if (x === -1) {
        current.walls[1] = next.walls[3] = false;
    }

    const y = current.y - next.y;
    if (y === 1) {
        current.walls[0] = next.walls[2] = false;
    }
    if (y === -1) {
        current.walls[2] = next.walls[0] = false;
    }
}
