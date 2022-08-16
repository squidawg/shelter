import {createElement} from "./createElement.js";

const NAVIGATION_LINK = document.querySelectorAll('.navigation_element');
const LOGO = document.querySelector('.logo');
const OVERFLOW_WRAPPER = document.getElementById('overflow-wrapper');
export const HEADER = document.querySelector('.header');

export const burgerPositionSwitch = (animationEvent, aside_wrapper) => {
    if(animationEvent.animationName === 'transition-open'){

        aside_wrapper.style.right = '0'
    }
    else {

        aside_wrapper.style.right = '-320px'
        HEADER.classList.remove('header_pets-inactive');
    }
}

export function burgerGenerator(elem, toggler, classLName){
    const overlay = createElement('div', 'aside_overlay');
    const wrapper = createElement('div', 'aside_wrapper');
    const burgerInner = createElement('div', 'aside_inner');
    const burgerLinks = createElement('ul', 'aside_list');
    let burgerLogo = LOGO.cloneNode(true);
    overlay.addEventListener('click', function (){
        burgerClose(elem, wrapper);
        overlay.classList.toggle('opacity-fadeIn');
        toggler.classList.toggle(classLName);
        overlay.style.display = 'none';
        OVERFLOW_WRAPPER.style.overflowY = 'initial';
        LOGO.style.visibility = 'visible';
    })
    NAVIGATION_LINK.forEach((element)=>{
        let listElement = element.cloneNode(true);
        listElement.addEventListener('click', function (){
            burgerClose(elem, wrapper)
            overlay.classList.toggle('opacity-fadeIn');
            toggler.classList.toggle(classLName);
            overlay.style.display = 'none';
            OVERFLOW_WRAPPER.style.overflowY = 'initial';
            LOGO.style.visibility = 'visible';
        });
        burgerLinks.append(listElement);
    });
    burgerInner.append(burgerLogo);
    wrapper.append(burgerInner, burgerLinks);
    OVERFLOW_WRAPPER.insertBefore(wrapper,  OVERFLOW_WRAPPER.children[0]);
    OVERFLOW_WRAPPER.insertBefore(overlay,  OVERFLOW_WRAPPER.children[0]);


}

const burgerOpen = (element, translate) => {
    OVERFLOW_WRAPPER.scrollTop = 0;
    element.classList.add('burger_open');
    element.classList.remove('burger_closed');
    translate.classList.add('transition-open-animation');
    translate.classList.remove('transition-close-animation');
}

const burgerClose = (element, translate) => {
    element.classList.add('burger_closed');
    element.classList.remove('burger_open');
    translate.classList.add('transition-close-animation');
    translate.classList.remove('transition-open-animation');
}

export function burgerController(element){
    const overlay = document.querySelector('.aside_overlay');
    const wrapper = document.querySelector('.aside_wrapper');
    if(element.classList.contains('burger_closed')){
        burgerOpen(element, wrapper);
        overlay.style.display = 'flex';
        overlay.classList.add('opacity-fadeIn');
        OVERFLOW_WRAPPER.style.overflowY = 'hidden';
        LOGO.style.visibility = 'hidden';
    }
    else {
        burgerClose(element, wrapper);
        overlay.classList.remove('opacity-fadeIn');
        overlay.style.display = 'none';
        OVERFLOW_WRAPPER.style.overflowY = 'initial';
        LOGO.style.visibility = 'visible';
    }

    wrapper.addEventListener('transitionend', function (){
        if(overlay.classList.contains('opacity-fadeIn')){
            overlay.style.display = 'flex';
        }

    })
}
