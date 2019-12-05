import P5 from "p5";

new P5((p: P5) => {
    p.setup = () => {
        console.log("set up");
        p.createCanvas(400, 400);
    };

    p.draw = () => {
        p.background(51);
    };
});
