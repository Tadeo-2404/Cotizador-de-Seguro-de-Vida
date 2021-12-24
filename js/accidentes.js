const ImageHeader = document.querySelector('.img-header');
const ImageTest = document.querySelector('.benefit-img')
const lineHeader = document.querySelectorAll('.line-header')
const cuadro = document.querySelector('.shadow-header');
const cuadroTest = document.querySelector('.shadow');
const textoHeader = document.querySelector('.header-text');
const headerTitle = document.querySelector('.header-title')
const cards = document.querySelectorAll('.testigos-body')
const tl = new TimelineMax();

window.addEventListener('scroll', cardsAnimate);
window.addEventListener('scroll', imgAnimate);
window.addEventListener('scroll', checkBoxes);
window.addEventListener('scroll', shadowAnimate);

checkBoxes()
function checkBoxes() {
    const triggerBottom = window.innerHeight;
    lineHeader.forEach((line) => {
        const boxTop = line.getBoundingClientRect().top
        if(boxTop < triggerBottom) {
           line.classList.add('animation');
        } else {
            line.classList.remove('animation')
        }
    })
}


imgAnimate()
function imgAnimate() {
    const triggerBottom = window.innerHeight;
        const boxTop = ImageTest.getBoundingClientRect().top
        if(boxTop < triggerBottom) {
           ImageTest.classList.add('showIMG');
        } else {
            ImageTest.classList.remove('showIMG')
        }
   
}

cardsAnimate()
function cardsAnimate() {
    const triggerBottom = window.innerHeight;
    cards.forEach((card) => {
        const boxTop = card.getBoundingClientRect().top
        if(boxTop < triggerBottom) {
            card.classList.add('show')
        } else {
            card.classList.remove('show')
        }
    })
}

shadowAnimate()
function shadowAnimate() {
    const triggerBottom = window.innerHeight;
        const boxTop = cuadroTest.getBoundingClientRect().top
        if(boxTop < triggerBottom) {
            cuadroTest.classList.add('showShadow')
        } else {
            cuadroTest.classList.remove('showShadow')
        }
}


tl.fromTo(
    ImageHeader,
    0.8,
    { width: "0%" },
    { width: "60%" ,ease: Power2.easeInOut}

).fromTo(
    textoHeader,
    1,
    { opacity: "0" },
    { opacity: "1" , ease: Power2.easeInOut}, "-=0.5"
).fromTo(
    cuadro,
    0.3,
    { x: "200%",  },
    { x: "0",  ease: Power2.easeInOut }
)
