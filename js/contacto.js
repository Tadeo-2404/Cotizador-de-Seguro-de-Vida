const ImageHeader = document.querySelector('.img-header');
const lineHeader = document.querySelectorAll('.line-header')
const cuadro = document.querySelector('.square');
const textoHeader = document.querySelector('.header-text');

const tl = new TimelineMax();

window.addEventListener('scroll', checkBoxes);


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
    1,
    { opacity: "0" },
    { opacity: "1" , ease: Power2.easeInOut}, "-=0.5"
)