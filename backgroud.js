const background = document.getElementById('background');
const bg_context = background.getContext('2d');

var bg_window_height = window.innerHeight;
var bg_window_width = window.innerWidth;

background.style.zIndex = "-1";
background.style.position = "fixed";

background.style.top = '25%';
background.style.left = '25%';
background.style.width = '70%';
background.style.height = '70%';
background.width = window.innerWidth;
background.height = window.innerHeight;

background.style.backgroundRepeat = 'no-repeat';

background.style.backgroundSize = 'contain';

background.style.backgroundPosition = 'right center';
background.style.opacity = '0';
background.style.transition = 'opacity 0.2s ease-in-out';



const projectileButton = document.getElementById('ProjButton');
projectileButton.addEventListener('mouseover', () => {
    background.style.backgroundImage = "url('ProjImage.png')";
    background.style.opacity = '1';
});

projectileButton.addEventListener('mouseout', () => {
    background.style.opacity = '0';
});

const Accel = document.getElementById('Button_accel');
Accel.addEventListener('mouseover', () => {
    background.style.backgroundImage = "url('accelerationImage.png')";
    background.style.opacity = '1';
});

Accel.addEventListener('mouseout', () => {
    background.style.opacity = '0';
});

const slopeHtml = document.getElementById('Slopes');
slopeHtml.addEventListener('mouseover', () => {
    background.style.backgroundImage = "url('slopePic.png')";
    background.style.opacity = '1';
});

slopeHtml.addEventListener('mouseout', () => {
    background.style.opacity = '0';
});