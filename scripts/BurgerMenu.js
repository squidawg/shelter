import {createElement} from "./createElement.js";

const navLink = document.querySelectorAll('.navigation_element');
const BODY = document.querySelector('body');
const LOGO = document.querySelector('.logo');
export const HEADER = document.querySelector('.header');



export function aside(elem, toggler,  classL){
    const overlay = createElement('div', 'aside_overlay');
    const wrapper = createElement('div', 'aside_wrapper');
    const burgerInner = createElement('div', 'aside_inner');
    const burgerLinks = createElement('ul', 'aside_list');
    let burgerLogo = LOGO.cloneNode(true);
    overlay.addEventListener('click', function (){
        burgerClose(elem, wrapper);
        overlay.classList.toggle('opacity-fadeIn')
        toggler.classList.toggle(classL);
        overlay.style.display = 'none';
        BODY.style.overflow = 'initial';
        LOGO.style.visibility = 'visible';
    })
    navLink.forEach((element)=>{
        let listElement = element.cloneNode(true);
        listElement.addEventListener('click', function (){
            burgerClose(elem, wrapper)
            overlay.classList.toggle('opacity-fadeIn')
            toggler.classList.toggle(classL);
            overlay.style.display = 'none';
            BODY.style.overflow = 'initial';
            LOGO.style.visibility = 'visible';
        });
        burgerLinks.append(listElement);
    });
    burgerInner.append(burgerLogo);
    wrapper.append(burgerInner, burgerLinks);
    BODY.insertBefore(wrapper,  BODY.children[0]);
    BODY.insertBefore(overlay,  BODY.children[0]);


}


const burgerOpen = (element, translate) => {
    window.scrollTo(0, 0);
    element.classList.toggle('burger_open');
    element.classList.remove('burger_closed');
    translate.classList.add('rotate_open');
    translate.classList.remove('rotate_close');
}

const burgerClose = (element, translate) => {
    element.classList.add('burger_closed');
    element.classList.remove('burger_open');
    translate.classList.add('rotate_close');
    translate.classList.remove('rotate_open');
}

export function burgerChecker(element){
    const overlay = document.querySelector('.aside_overlay');
    const wrapper = document.querySelector('.aside_wrapper');
    if(element.classList.contains('burger_closed')){
        burgerOpen(element, wrapper);

        overlay.classList.remove('opacity-fadeOut');
        overlay.classList.add('opacity-fadeIn');
        document.body.style.overflow = 'hidden';
        LOGO.style.visibility = 'hidden';

    }
    else {
        burgerClose(element, wrapper);
        overlay.classList.remove('opacity-fadeIn');
        //overlay.classList.add('opacity-fadeOut');
        overlay.style.display = 'none';
        document.body.style.overflow = 'initial';
        LOGO.style.visibility = 'visible';


    }
    wrapper.addEventListener('transitionend', function (animationEvent){
        if(overlay.classList.contains('opacity-fadeIn')) {
            overlay.style.display = 'flex';
        }
    })
}
