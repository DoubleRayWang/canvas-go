let canvas = document.querySelector('#canvas'),
    context = canvas.getContext('2d'),
    W = canvas.width,
    H = canvas.height,
    bg = new Image();
bg.src = 'img/bg.jpg'
bg.onload = function () {
    context.drawImage(bg, 0, 0, W, H);
}
let scale = document.querySelector('#scale')
let drawImage = () => {
    context.clearRect(0, 0, W, H);
    if (scale.checked) {
        context.drawImage(bg, 0, 0, W, H);
    } else {
        context.drawImage(bg, 0, 0)
    }
}
scale.addEventListener('change',function () {
    drawImage()
},false);