let canvas = document.querySelector('#canvas'),
    context = canvas.getContext('2d'),
    W = canvas.width,
    H = canvas.height,
    dragging = false,
    imageData = null,
    mousedown = {},
    selectRec = {},
    bg = new Image();
bg.src = 'img/bg.jpg'
bg.onload = function () {
    drawImage()
}
let scale = document.querySelector('#scale'),
    resetButton = document.querySelector('#reset');
    //将图片绘制到canvas画布中
let drawImage = () => {
        context.clearRect(0, 0, W, H);
        if (scale.checked) {
            context.drawImage(bg, 0, 0, W, H);
        } else {
            context.drawImage(bg, 0, 0)
        }
    },
    
    windowToCanvas = (canvas, x, y) => {
        let canvasRectangle = canvas.getBoundingClientRect()
        return ({
            x: x - canvasRectangle.left,
            y: y - canvasRectangle.top
        })
    },
    //捕捉选取框的像素
    captureRubberbandPixels = () => {
        imageData = context.getImageData(
            selectRec.left,
            selectRec.top,
            selectRec.width,
            selectRec.height
        )
    },
    
    restoreRubberbandPixels = () => {
        context.putImageData(
            imageData,
            selectRec.left,
            selectRec.top
        )
    },
    //绘制选取框
    drawRubberband = () => {
        context.strokeRect(
            selectRec.left + context.lineWidth,
            selectRec.top + context.lineWidth,
            selectRec.width - 2 * context.lineWidth,
            selectRec.height - 2 * context.lineWidth
        )
    },
    updateRubberband = () => {
        captureRubberbandPixels();
        drawRubberband()
    },
    //按下鼠标开始选取
    rubberbandStart = (x, y) => {
        mousedown.x = x;
        mousedown.y = y;
        selectRec.left = mousedown.x;
        selectRec.top = mousedown.y;
        dragging = true
    },
    setRubberbandRectangle = (x, y) => {
        selectRec.left = Math.min(x, mousedown.x)
        selectRec.top = Math.min(y, mousedown.y)
        selectRec.width = Math.abs(x - mousedown.x)
        selectRec.height = Math.abs(y - mousedown.y)
    },
    rubberbandStretch = (x, y) => {
        if (
            selectRec.width > 2 * context.lineWidth &&
            selectRec.height > 2 * context.lineWidth
        ) {
            if (imageData !== null) {
                restoreRubberbandPixels()
            }
        }
        setRubberbandRectangle(x, y);
        if (
            selectRec.width > 2 * context.lineWidth &&
            selectRec.height > 2 * context.lineWidth
        ) {
            updateRubberband()
        }
    },
    rubberbandEnd = () => {
        context.drawImage(
            canvas,
            selectRec.left + context.lineWidth * 2,
            selectRec.top + context.lineWidth * 2,
            selectRec.width - 4 * context.lineWidth,
            selectRec.height - 4 * context.lineWidth,
            0, 0, W, H
        );
        dragging = false;
        imageData = null
    };
context.lineWidth = 1;
context.strokeStyle = '#fff';

console.log(context.getImageData(0,0,W,H))
console.log(context.getImageData(0,0,W,H).width)
console.log(context.getImageData(0,0,W,H).height)
console.log(context.getImageData(0,0,W,H).data)
console.log(context.getImageData(0,0,W,H).data.length)


canvas.addEventListener('mousedown', function (e) {
    let loc = windowToCanvas(canvas, e.clientX, e.clientY);
    e.preventDefault();
    rubberbandStart(loc.x, loc.y);
}, false);
canvas.addEventListener('mousemove', function (e) {
    let loc;
    if (dragging) {
        loc = windowToCanvas(canvas, e.clientX, e.clientY);
        rubberbandStretch(loc.x, loc.y);
    }
}, false);
canvas.addEventListener('mouseup', function (e) {
    rubberbandEnd()
}, false)
resetButton.addEventListener('click', function (e) {
    scale.checked = true
    drawImage()
}, false)
scale.addEventListener('change', function () {
    drawImage()
}, false);