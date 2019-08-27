let canvas, ctx;
const xAmount = 5,
    yAmount = 5,
    space = 100,
    radius = 10,
    captureRange = 110,
    lineWidth = 2;
const screenWidth = 600, screenHeight = 600;

load = () => {
    canvas = document.getElementById('canvas');
    canvas.setAttribute('height', screenHeight);
    canvas.setAttribute('width', screenWidth);
    ctx = canvas.getContext('2d');
    drawGrid(xAmount, yAmount, space, radius);
}

drawCircle = (x, y, radius) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fill();
}

drawGrid = (xAmount, yAmount, space, radius) => {
    for (let y = 1; y <= yAmount; y++) {
        for (let x = 1; x <= xAmount; x++) {
            drawCircle(x * space, y * space, radius);
        }
    }
    ctx.fill();
}

drawLineInBetween = (mouse, pointArray) => {
    for (let point of pointArray) {
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
    }
}

mouseMove = (event) => {
    removeLines();
    let rect = canvas.getBoundingClientRect();
    let pos = {
        x: (event.clientX - rect.left),
        y: (event.clientY - rect.top)
    };
    calcPoints(pos);
    drawLineInBetween(pos, calcPoints(pos))
}

calcPoints = (pos) => {
    let xMin = pos.x - pos.x % space;
    let xMax = xMin + space;
    let yMin = pos.y - pos.y % space;
    let yMax = yMin + space;

    return [
        { x: xMin, y: yMin },
        { x: xMin, y: yMax },
        { x: xMax, y: yMin },
        { x: xMax, y: yMax }
    ].filter((values) => 
    (values.x >= space && values.x <= (xAmount * space)) 
    && (values.y >= space && values.y <= (yAmount * space)));
}

removeLines = () => {
    ctx.clearRect(0, 0, screenWidth, screenHeight);
    drawGrid(xAmount, yAmount, space, radius);
}