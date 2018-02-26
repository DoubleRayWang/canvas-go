'use strict';

var clock = document.querySelector('#clock'),
    width = clock.width,
    //300
height = clock.height,
    //300
img = new Image(),
    ctx = clock.getContext('2d'),
    Margin = 35,
    timer = 0,
    FontHeght = 16,
    HandTruncation = width / 25,
    //12
HourHandTruncation = width / 10,
    //30
numberSpacing = 20,
    Radius = width / 2 - Margin,
    //115
HandRadius = Radius + numberSpacing; //135
//画圆
var drawCircle = function drawCircle() {
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, width / 2 - Margin, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.strokeRect(0, 0, width, height);
},
    drawNumerals = function drawNumerals() {
    var numetrals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        angle = 0,
        numeralWidth = 0;
    numetrals.forEach(function (numeral) {
        angle = Math.PI / 6 * (numeral - 3);
        numeralWidth = ctx.measureText(numeral).width;
        ctx.fillText(numeral, width / 2 + Math.cos(angle) * HandRadius - numeralWidth / 2, height / 2 + Math.sin(angle) * HandRadius + FontHeght / 2);
    });
},
    drawCenter = function drawCenter() {
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 5, 0, Math.PI * 2, true);
    ctx.fill();
},
    drawHand = function drawHand(loc, isHour) {
    var angle = Math.PI * 2 * (loc / 60) - Math.PI / 2,
        handRadius = isHour ? Radius - HandTruncation - HourHandTruncation : Radius - HandTruncation;
    ctx.moveTo(width / 2, height / 2);
    ctx.lineTo(width / 2 + Math.cos(angle) * handRadius, height / 2 + Math.sin(angle) * handRadius);
    ctx.stroke();
},
    drawHands = function drawHands() {
    var date = new Date(),
        hour = date.getHours();
    hour = hour > 12 ? hour - 12 : hour;
    drawHand(hour * 5 + date.getMinutes() / 60 * 5, true);
    drawHand(date.getMinutes(), false);
    drawHand(date.getSeconds(), false);
},
    drawClock = function drawClock() {
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    drawCircle();
    drawCenter();
    drawHands();
    drawNumerals();
    /*img.src = clock.toDataURL();
    if (!document.querySelector('#img')) {
        document.body.insertBefore(img, clock)
    }*/
};
ctx.font = FontHeght + 'px Arial';
img.id = 'img';
timer = setInterval(drawClock, 1000);
//# sourceMappingURL=clock.js.map
