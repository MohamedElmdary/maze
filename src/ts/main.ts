import P5 from "p5";
import { Cell } from "./cell";

let cols: number, rows: number;
const w = 40;
const grid: Cell[] = [];

new P5((p: P5) => {
    p.setup = () => {
        console.log("set up...");
        p.createCanvas(400, 400);
        cols = p.floor(p.width / w);
        rows = p.floor(p.height / w);

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const cell = new Cell(x, y);
                grid.push(cell);
            }
        }
    };

    p.draw = () => {
        p.background(51);
        for (const cell of grid) {
            cell.show(w, p);
            // p.stroke(200);
            // p.noFill();
            // p.rect(x, y, w, w);
        }
    };
});
